var telldus = require('telldus');

var triggers = {
  
  cache: null,

  // Example of how to catch and handle raw events
  notifyRawDeviceUpdate: function(data) {
    /*var info = data.split(';');
    // Only catches archtech devices
    if(info.length == 8) {
    	// Turns on and off device 1 on remote control press with house 5915939 and unit 3
    	// You'll have to listen to the raw events, or console.log the data argument to
    	// work out which house and unit you're interested in
	    if ( info[3] == 'house:5915939' && info[4] == 'unit:3') {
	    	if( info[6]== 'method:turnoff') {
	    		telldus.turnOff(1,function(){
	    			telldus.turnOff(1,function(){});
	    		});
	    	} else {
	    		telldus.turnOn(1,function(){
	    			telldus.turnOn(1,function(){});
	    		});
	    	}
	    }
	}*/
  }

};

module.exports = triggers;