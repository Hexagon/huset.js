var grapho;

function temperature() {};
temperature.prototype.name = "Temperature";
temperature.prototype.run = function() {

  // Prepare DOM-elements
  var container_temp = $('<div class="container container-600" id="sensor_container">')
  container_temp.append('<div class="box box-w-600 box-h-200 bg-dark" id="eliq_chart_dataday">');
  container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="spot_1">');
  container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="eliq_datanow">');
  container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="eliq_dataday">');

  // .. and put them in the document
  $("body").append(container_temp);

};

// Activate this plugin
huset.plugins.push(new temperature());
