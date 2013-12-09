function weather() {};
weather.prototype.name = "Weather";
weather.prototype.run = function() {

  // The stuff
  var container_temp = $('<div class="container container-300">');
  var box_weather_0 = $('<div class="box box-w-300 box-h-100 bg-dark" id="weather_0">');
  var box_weather_1 = $('<div class="box box-w-300 box-h-100 bg-dark" id="weather_1">');
  var box_weather_2 = $('<div class="box box-w-300 box-h-100 bg-dark" id="weather_2">');
  var box_weather_3 = $('<div class="box box-w-300 box-h-100 bg-dark" id="weather_3">');
  var box_weather_4 = $('<div class="box box-w-300 box-h-100 bg-dark" id="weather_4">');

  container_temp.append('<h2>Vädret kommande dygn</h2>');
  container_temp.append(box_weather_0);
  container_temp.append(box_weather_1);
  container_temp.append(box_weather_2);
  container_temp.append(box_weather_3);
  container_temp.append(box_weather_4);

  $("body").append(container_temp);

  $.getJSON('proxy/json/weather', function(data) {
    for(var i = 0; i < 5; i++ ){
      var w = data.weather[i];
      var wind = (w.wind[0] >= 2) ? "- "+w.wind[0]+"m/s "+w.wind_dir[0] : "";
      var html = "<img src=\"themes/default/img/symbols/"+w.symbol[0]+".png\" style=\"float:left;width:80ox;height:80px;margin:10px;\">";
        html += "<h4><strong>"+w.period+"</strong> - "+w.text+"</h4>";
        html += "<h3><strong>"+w.temperature[0]+"&deg;C</strong>"+wind+"</h3>";
      $("#weather_"+i).html(html);
    }
  });

};

// Activate this plugin
huset.plugins.push(new weather());