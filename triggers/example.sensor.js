var telldus = require('telldus');

var triggers = {
  
  cache: null,

  // Example of how to catch sensor events
  notifySensorUpdate: function(id,type) {
    //console.log('notifySensorUpdate',id,type,this.cache.telldus_sensors['s_'+id+''+type].value);
  }

};

module.exports = triggers;