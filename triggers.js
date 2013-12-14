var config = require('./config.json')
  , fs = require("fs");

var triggers = {
  all: [],
  Init: function (cache) {

    // Read all triggers
    var result = fs.readdirSync("./triggers");
    for( var i=0 ; i<result.length ; i++ ) {
      try {
        file = result[i];

        // Do not include example triggers
        if( file.substring(0,8) !== "example.") {

          // Read trigger
          var fresh_trigger = require("./triggers/" + file);

          // Assign cache
          fresh_trigger.cache = cache;

          // Push to array
            this.all.push(fresh_trigger);

          console.log('\tTrigger loaded:',file);

        }
      } catch (err) {
        console.error('\tFailed to load plugin: ' + file, err);
      }
    };

    // Start time tick notifier
    this.notifyTimeTick();
  },
  notifyDeviceUpdate: function(id) {
    // Notify all triggers of event
    for( var i=0 ; i<this.all.length ; i++ ) if(this.all[i].notifyDeviceUpdate != undefined) this.all[i].notifyDeviceUpdate(id);
  },
  notifySensorUpdate: function(id,type) {
    // Notify all triggers of event
    for( var i=0 ; i<this.all.length ; i++ ) if(this.all[i].notifySensorUpdate != undefined) this.all[i].notifySensorUpdate(id, type);
  },
  notifyTimeTick: function() {
    // Notify all triggers of time tick
    var d = new Date();
    for( var i=0 ; i<this.all.length ; i++ ) if(this.all[i].notifyTimeTick != undefined) this.all[i].notifyTimeTick(d);

    // Recurse to infinity ( or at least until the power goes out! )
    setTimeout(function() { this.notifyTimeTick() }.bind(this), config.triggers.time_tick_ms );
  },
  notifyEliqDatanow: function() {
    // Notify all triggers of power consumption update
    for( var i=0 ; i<all.length ; i++ ) this.all[i].notifyTimeTick(cache);
  },
  notifyRawDeviceUpdate: function(data) {
    // Notify all triggers of event
    for( var i=0 ; i<this.all.length ; i++ ) if(this.all[i].notifyRawDeviceUpdate != undefined) this.all[i].notifyRawDeviceUpdate(data);
  }

};

module.exports = triggers;