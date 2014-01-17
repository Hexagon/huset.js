var config = require('./config.json')
  , http = require('http');

var elspot_realtime_url = "http://datafeed.expektra.se/datafeed.svc/spotprice?bidding_area=SE2";

// Fetch spot price
module.exports = {
  onNowUpdate: function(data) { console.log('onDatanowUpdate: No consumer attached',data)},
  fetchDatanow: function() {
    // Start real time (datanow) update
    http.get(elspot_realtime_url, function(res) {

      res.on("data", function(chunk) {
        try {
          var data = JSON.parse(chunk),
            spot_price = Math.round(data.data[0].value/10)/100,
            full_price = Math.round((spot_price*100+config.elspot.price_premium+config.elspot.price_tax)*(1+(config.elspot.price_vat_percentage/100))*10)/10;
          this.onNowUpdate({'spot_price':spot_price,'full_price':full_price});
        } catch ( e ) {
          console.log ('elspot request failed: Invalid data');
        }
      }.bind(this));

      res.on('error',function(err) {
          console.log ('elspot request failed: ' + err.message);       
      });

    }.bind(this));

    setTimeout(function() { this.fetchDatanow() }.bind(this), config.elspot.realtime_delay_ms);

  },
  Start: function () {
    this.fetchDatanow();
  }
}
