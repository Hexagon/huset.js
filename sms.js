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
    req = https.get(url, function(res) {
      res.on('error', function(e) {
        console.log('SMS Respnse failed: ' + e.message);
      });
    }).on('error',function(err) {
      console.log('SMS Request failed, error: ' + err.message);
    });
    req.end();
  }
};
