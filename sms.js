var config = require('./config.json')
  , https = require('https');

module.exports = {
  send: function (msg) {
    var msg = encodeURIComponent(msg);
    var nr = config.sms.number;
    var user = config.sms.user;
    var pass = config.sms.password;
    var originator = config.sms.originator;
    var url = 'https://se-1.cellsynt.net/sms.php?username='+user+'&password='+pass+'&type=text&destination='+nr+'&originatortype=alpha&originator='+originator+'&text='+msg;
    https.get(url, function(res) {
      res.on('error', function(e) {
        console.log('Sms send failed: ' + e.message);
      });
    });
  }
};
