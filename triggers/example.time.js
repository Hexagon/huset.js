var telldus = require('telldus');

var triggers = {
  
  cache: null,
  block: null,

  // Example for a time trigger, get called every config.triggers.time_tick_ms
  notifyTimeTick: function() {

    var d = new Date();
      var to_match = d.getHours() + ':' + d.getMinutes();
      var one_per = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '-' + to_match;

      // Called 06:15:00
      // The blocker is used to prevent the function from being run multiple times on each matching minute
      if ( (to_match == '6:15' || to_match == '16:30') && !this.isBlocked(one_per) ) {
        // Do stuff ...
      }

      // Called 01:45:00
      if ( (to_match == '1:45') && !this.isBlocked(one_per) ) {
        // Do other stuff
      }

  },

  // Blocking function, as we only want to run this once
  isBlocked: function(one_per) {

    if ( one_per == this.block ) {
      return true;
    } else {
      this.block = one_per;
      return false;
    }

  }
};

module.exports = triggers;