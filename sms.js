var config = require('./config.json')
	, http = require('http');

module.exports = {
	send_sms: function (msg) {
		var msg = encodeURIComponent(msg);
		var nr = config.sms.number;
		var user = config.sms.user;
		var pass = config.sms.password;
		var originator = config.sms.originator;
		var url = 'https://se-1.cellsynt.net/sms.php?username='+user+'&password='+pass+'&type=text&destination='+nr+'&originatortype=alpha&originator='+originator+'&text='+msg;

		http.get(url, function(res) {}).on('error', function(e) {
			console.log('Sms send failed: ' + e.message);
		});;
	}
};