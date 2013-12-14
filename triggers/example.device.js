var telldus = require('telldus');

var triggers = {
  
  cache: null,

  // Example of how to catch device events
  notifyDeviceUpdate: function(id) {
    //console.log('notifyDeviceUpdate',id,this.cache.telldus_devices['d_'+id].status);
  }

};

module.exports = triggers;