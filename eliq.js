var config = require('./config.json')
  , https = require('https');

var eliq_realtime_url = "https://my.eliq.se/api/datanow?accesstoken="+config.eliq.accesstoken;

/* Extend the Date object with a slightly modified toISOString shim 
   from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString */
if ( !Date.prototype.toLocalString ) {
  ( function() {
  
  function pad(number) {
    if ( number < 10 ) {
    return '0' + number;
    }
    return number;
  }
 
  Date.prototype.toLocalString = function() {
    return this.getFullYear() +
    '-' + pad( this.getMonth() + 1 ) +
    '-' + pad( this.getDate() ) +
    'T' + pad( this.getHours() ) +
    ':' + pad( this.getMinutes() ) +
    ':' + pad( this.getSeconds() );
  };
  
  }() );
}

module.exports = {
  onDatanowUpdate: function(data) { console.log('onDatanowUpdate: No consumer attached',data)},
  onDatadayUpdate: function(data) { console.log('onDatadayUpdate: No consumer attached',data)},
  fetchDatanow: function() {

    // Start real time (datanow) update
    req = https.get(eliq_realtime_url, function(res) {

      res.on("data", function(chunk) {
        try {
          this.onDatanowUpdate(JSON.parse(chunk));
        } catch ( e ) {
          console.log ('eliq request failed: Invalid data');
        }
      }.bind(this));

      res.on("error", function(e) {
        console.log('eliq request failed: ' + e.message);
      });

    }.bind(this));

    req.on('error', function(e) {
      console.log('Eliq request failed: ' + e.message);
    });

    // Schedule next update
    setTimeout(function() { this.fetchDatanow() }.bind(this), config.eliq.realtime_delay_ms);

  },
  fetchDataday: function () {

    // Recalculate URL
    var d = new Date();
    dt_to = d.toLocalString();
    dt_from = new Date(d.getTime()-24*3600000-1000).toLocalString();
    var eliq_dataday_url = "https://my.eliq.se/api/data?accesstoken="+config.eliq.accesstoken+"&startdate="+dt_from+"&enddate="+dt_to+"&intervaltype=hour";
    
    // Start daily history (dataday) update
    req = https.get(eliq_dataday_url, function(res) {

      res.on("data", function(chunk) {
        try {
          this.onDatadayUpdate(JSON.parse(chunk));
        } catch ( e ) {
          console.log ('eliq request failed: Invalid data');
        }
      }.bind(this));

      res.on('error', function(e) {
        console.log('Eliq request failed: ' + e.message);
      });

    }.bind(this));

    req.on('error', function(e) {
      console.log('Eliq request failed: ' + e.message);
    });
     

    // Schedule next update
    setTimeout(function() { this.fetchDataday() }.bind(this), config.eliq.daily_delay_ms);

  },
  Start: function () {
    this.fetchDatanow();
    this.fetchDataday();
  }
}
