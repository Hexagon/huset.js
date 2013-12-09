/* base.js inkluderas först, eftersom den skapar arrayen huset.plugins som alla plugins lägger in sig själva i */

// Define huset...!
function Huset() {};
Huset.prototype.plugins = [];
Huset.prototype.run = function() {
	// Starta alla plugins
	for (var i = 0; i < this.plugins.length ; i++) {
		console.log('Starting plugin "'+this.plugins[i].name+'"');
		this.plugins[i].run();
	}
};
var huset = new Huset();

// Starta igång skiten när dokumentet är redo!
$(document).ready(function() {
	huset.run();
});