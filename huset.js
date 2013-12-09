	// Include node.js modules
var fs = require('fs')
	, socketio = require('socket.io')
	, telldus = require('telldus-core-js')
	, path = require('path')

	// Include huset.nu modules
	, server = require('./server.js')
	, datasource = require('./datasource.js')
	, sms = require('./sms.js')
	, eliq = require('./eliq.js')
	, elspot = require('./elspot.js')
	, triggers = require('./triggers.js')

	// Include configuration
	, config = require('./config.json');

console.log('Initiating datasource ...');
datasource.Init();

console.log('Creating cache ...');
var cache = { telldus_devices: {}, telldus_sensors: {}, eliq_datanow: null, eliq_dataday: null, elspot_now: null, devicegroups: null };

console.log('Initiating triggers:');
triggers.Init(cache);

if( config.tellstick.enable === 1 ) {

	console.log('Connecting tellstick events ...');

	console.log('\tTellstick sensor values ...');
	var sql = "SELECT \
				dest.* \
			FROM \
					(SELECT \
						out.id, \
						out.type, \
						max(out.ts) as ots \
					 FROM  \
						telldus_sensor_history as out \
					 GROUP BY \
						out.id, \
						out.type) as source \
			LEFT OUTER JOIN \
				telldus_sensor_history as dest ON (source.id = dest.id AND source.type=dest.type AND source.ots = dest.ts)";
	datasource.db.each(
		sql,
		// For each row
		function(err,row) {
			if( !err ) {

				// Prepare
				var idx = 's_'+row.id+''+row.type

				// Insert value_diff
				row.value_diff = 0;

				cache.telldus_sensors[idx] = row;

				// Get min/max
				var ts = Math.round((new Date()).getTime() / 1000)-3600*24;
				var statement_inner = datasource.db.prepare("SELECT min(value) as val_min, max(value) as val_max FROM telldus_sensor_history WHERE id=? AND type=? AND ts>"+ts);
				statement_inner.each(
					[row.id,row.type],
					function(err_inner,row_inner) {
						if( !err ) {
							cache.telldus_sensors[idx].min = row_inner.val_min;
							cache.telldus_sensors[idx].max = row_inner.val_max;
						}
					}
				); statement_inner.finalize();
			} else {
				console.log(err);
			}
		},
		// When finished
		function(err) {

		}
	);

	console.log('\tTellstick devices ...');
	var devices = telldus.getDevices();
	devices.forEach(function(item) { 
		cache.telldus_devices['d_'+item.id] = {
			id: item.id,
			name: item.name,
			status: item.status.status
		};
	});

	console.log('\tDevice groups ...');
	cache.devicegroups = config.tellstick.devicegroups;

}

console.log('Initiating websockets ...');
if( config.server.live_stream === 1 ) {

	// Start listening, disable on screen logging
	var io = socketio.listen(server).set('log level', 0);

	// On connection callback
	io.on('connection', function (socket) {

		// Send initial values
		console.log('Transmitting initial cache ...');
		io.sockets.emit('message', { msg: 'initial_data' , data: cache });

		// On incoming message callback (has currently no use)
		 socket.on('message', function (data) {
			
			// Incoming!!
			if( data.msg == 'telldus_device_on' ) {
				telldus.turnOn(parseInt(data.id));
			} else if ( data.msg == 'telldus_device_off' ) {
				telldus.turnOff(parseInt(data.id));
			}

		 });

	});

}

if( config.tellstick.enable === 1 ) {
	console.log('Initiating tellstick module:');
	console.log('\tStarting sensor event listener ...');
	telldus.addSensorEventListener(function(id,protocol,model,type,value,ts) {

		// Filter out crap
		if( protocol == "temperaturehumidity" && ( model == "fineoffset" || model == "mandolyn") && Number(value) != NaN && Number(type) != NaN && Number(id) !=  NaN && Number(value) == value ) {

			// Check if value has changed, to prevent excessive emits
			var value_changed = ( cache.telldus_sensors['s_'+id+''+type] == undefined || value != cache.telldus_sensors['s_'+id+''+type].value ) ? true : false;
			var value_diff = (cache.telldus_sensors['s_'+id+''+type] == undefined) ? 0 : value-cache.telldus_sensors['s_'+id+''+type].value;
			var value_min = (cache.telldus_sensors['s_'+id+''+type] == undefined ) ? value : cache.telldus_sensors['s_'+id+''+type].min;
			var value_max = (cache.telldus_sensors['s_'+id+''+type] == undefined ) ? value : cache.telldus_sensors['s_'+id+''+type].max;
			value_min = ( value < value_min ) ? value : value_min;
			value_max = ( value > value_max ) ? value : value_max;
			
			// Update cache
			cache.telldus_sensors['s_'+id+''+type] = {
				id: id,
				type: type,
				ts: ts,
				message: model,
				protocol: protocol,
				value: value,
				value_diff: value_diff,
				min: value_min,
				max: value_max
			};

			// Notify triggers
			if( value_changed )
				triggers.notifySensorUpdate(id,type);

			// Insert in database
			if( config.tellstick.sensor_history === 1 && value_changed ) 
				try {
					datasource.db.prepare("INSERT INTO telldus_sensor_history (id,message,protocol,type,value,ts) VALUES(?,?,?,?,?,?)").run(id,model,protocol,type,value,ts).finalize();
				} catch (err) {
					console.log('DB insert failed: ', err);
				}

			// Broadcast sensor value to all clients
			if( config.tellstick.sensor_emit === 1 && config.server.live_stream === 1 && value_changed ) 
				io.sockets.emit('message', { msg: "tellstick_sensor_update", data: cache.telldus_sensors['s_'+id+''+type] });

		} else {
			console.info('Invalid sensor data received');
		}

	});
	console.log('\tStarting device event listener ...');
	telldus.addDeviceEventListener(function (device, status) {

		// Update cache (preserve name)
		var name = cache.telldus_devices['d_'+device].name;
		cache.telldus_devices['d_'+device] = {
			id: device,
			name: name,
			status: status.status
		};

		// Notify triggers
		triggers.notifyDeviceUpdate(device);

		// Broadcast device event to all clients
		if( config.tellstick.device_emit === 1 && config.server.live_stream === 1 )
			io.sockets.emit('message', { msg: "tellstick_device_update", data: cache.telldus_devices['d_'+device] });

		// Add device event to database, add ts manually
		if( config.tellstick.device_history === 1 ) {

			// Prepare data
			var l_status_num = (status.status === 'ON') ? 1 : 0;
			var ts = Date.now() / 1000;
			
			// Execute statement

			try {
				datasource.db.prepare("INSERT INTO telldus_device_history (id,status,ts) VALUES(?,?,?)").run(device,l_status_num,ts).finalize();
			} catch (err) {
				console.log('DB insert failed: ', err);
			}
		}
	});
}

if(config.eliq.enable === 1 ) {
	console.log('Initiating Eliq module:');
	console.log('\tStarting live power consumption listener ...');
	eliq.onDatanowUpdate = function(data) {

		// Check if value has changed
		var value_changed = (cache.eliq_datanow == null || cache.eliq_datanow.power != data.power) ? true : false;

		// Save to cache
		cache.eliq_datanow = data;

		// Emit update
		if( config.server.live_stream === 1 && value_changed )
			io.sockets.emit('message', { msg: "eliq_datanow", data: data });

	};
	console.log('\tStarting daily power consumption listener ...');
	eliq.onDatadayUpdate = function(data) {

		// Save to cache
		cache.eliq_dataday = data;

		// Emit update
		if( config.server.live_stream === 1 )
			io.sockets.emit('message', { msg: "eliq_dataday", data: data });

	}
	eliq.Start();
}

if(config.elspot.enable === 1 ) {
	console.log('Initiating Electricity price module:');
	console.log('\tStarting live electricity price listener ...');
	elspot.onNowUpdate = function(data) {

		// Check if value has changed
		var value_changed = (cache.elspot_now == null || cache.elspot_now.full_price != data.full_price) ? true : false;

		// Save to cache
		cache.elspot_now = data;

		// Emit update
		if( config.server.live_stream === 1 && value_changed )
			io.sockets.emit('message', { msg: "elspot_now", data: data });

	};
	elspot.Start();
}