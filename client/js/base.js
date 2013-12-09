// base.js is included first, then each plugin is automagically included 

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

// Start everything when the document is ready
$(document).ready(function() {
  huset.run();
});