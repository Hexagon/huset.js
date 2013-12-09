function temperature() {};
temperature.prototype.name = "Temperature";
temperature.prototype.run = function() {

	// Prepare DOM-elements
	var container_temp = $('<div class="container container-600">')

	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="house_overview"><div class="content box-w-120 box-h-100"><div id="indicator_1381" class="icon-temp-indicator">&nbsp;</div><h4>Inne</h4><h1 class="fg-light"><span id="1381"></span>&deg;C</h1></div><div class="content box-w-80 box-h-100 right"><h5 class="fg-light-red"><span id="max_1381"></span>&deg;C</h5><h5 class="fg-light-blue"><span id="min_1381"></span>&deg;C</h5><h5 class="fg-light"><span id="1382"></span>%RH</h5></div></div></div>');
	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="outside_overview"><div class="content box-w-120 box-h-100"><div id="indicator_411" class="icon-temp-indicator">&nbsp;</div><h4>Ute</h4><h1 class="fg-light"><span id="411"></span>&deg;C</h1></div><div class="content box-w-80 box-h-100 right"><h5 class="fg-light-red"><span id="max_411"></span>&deg;C</h5><h5 class="fg-light-blue"><span id="min_411"></span>&deg;C</h5><h5 class="fg-light"><span id="412"></span>%RH</h5></div></div></div>');
	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="garage_overview"><div class="content box-w-120 box-h-100"><div id="indicator_211" class="icon-temp-indicator">&nbsp;</div><h4>Garage</h4><h1 class="fg-light"><span id="211"></span>&deg;C</h1></div><div class="content box-w-80 box-h-100 right"><h5 class="fg-light-red"><span id="max_211"></span>&deg;C</h5><h5 class="fg-light-blue"><span id="min_211"></span>&deg;C</h5><h5 class="fg-light"><span id="212"></span>%RH</h5></div></div></div>');
	
	container_temp.append('<div class="box box-w-400 box-h-200 bg-dark" id="eliq_chart_dataday">');

	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="basement_overview"><div class="content box-w-120 box-h-100"><div id="indicator_231" class="icon-temp-indicator">&nbsp;</div><h4>Källare</h4><h1 class="fg-light"><span id="231"></span>&deg;C</h1></div><div class="content box-w-80 box-h-100 right"><h5 class="fg-light-red"><span id="max_231"></span>&deg;C</h5><h5 class="fg-light-blue"><span id="min_231"></span>&deg;C</h5><h5 class="fg-light"><span id="232"></span>%RH</h5></div></div></div>');
	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="ground_overview"><div class="content box-w-120 box-h-100"><div id="indicator_141" class="icon-temp-indicator">&nbsp;</div><h4>Grund</h4><h1 class="fg-light"><span id="141"></span>&deg;C</h1></div><div class="content box-w-80 box-h-100 right"><h5 class="fg-light-red"><span id="max_141"></span>&deg;C</h5><h5 class="fg-light-blue"><span id="min_141"></span>&deg;C</h5><h5 class="fg-light"><span id="142"></span>%RH</h5></div></div></div>');
	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="spot_1">');
	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="eliq_datanow">');
	container_temp.append('<div class="box box-w-200 box-h-100 bg-dark" id="eliq_dataday">');

	// .. and put them in the document
	$("body").append(container_temp);
	
};

// Aktivera det här pluginnet
huset.plugins.push(new temperature());
