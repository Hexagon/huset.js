function controls() {};
controls.prototype.name = "Controls";
controls.prototype.run = function() {

  // Prepare DOM-elements
  var container_temp = $('<div class="container container-300" id="devices">');
  $("body").append(container_temp);

};

// Activate this plugin
huset.plugins.push(new controls());