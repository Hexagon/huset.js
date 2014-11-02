var currentGraph=[];

function timeFormat (l) {
	return Grapho.helpers.math.isNumber(l) ? new Date(l*1000).toLocaleTimeString().substring(0,5) : l;
}

// Function to generate charts
function gen_chart_json(curGrapho,dest,d1,title,color,prop1,prop2,series,axis) {
	var data = [],i;

	if (prop1 !== undefined) {
		for(i = 0; i<d1.length; i++) {
			var di=Date.parse(d1[i][prop1]);
			if ( !isNaN(di) ) {
				data.push([di/1000,d1[i][prop2]]);
			} else {
				data.push([d1[i][prop1],d1[i][prop2]]);
			}
		}
	} else {
		data = d1;
	}

	// Remove previous data set
	if (currentGraph !== undefined && currentGraph[dest]) {
		curGrapho.removeDataset(currentGraph[dest]);
		currentGraph[dest] = undefined;
	}

	// Prepare gradient
	var fillGradient=curGrapho.ctx.createLinearGradient(0,0,0,200);
	fillGradient.addColorStop(0,"rgba(96,255,96,0.0)");
	fillGradient.addColorStop(0.1,"rgba(96,255,96,0.0)");
	fillGradient.addColorStop(0.2,"rgba(255,255,96,0.1)");
	fillGradient.addColorStop(0.5,"rgba(255,128,96,0.2)");

	// Prepare gradient
	var strokeGradient=curGrapho.ctx.createLinearGradient(0,0,0,200);
	strokeGradient.addColorStop(0,"rgba(96,255,96,0.4)");
	strokeGradient.addColorStop(0.1,"rgba(96,255,96,0.4)");
	strokeGradient.addColorStop(0.2,"rgba(255,255,96,0.5)");
	strokeGradient.addColorStop(0.5,"rgba(255,128,96,0.6)");

	// Add new data set
	currentGraph[dest] = curGrapho.addDataSet({
			type: (dest === 'eliq_chart_dataday') ? 'area' : 'line',
			strokeStyle: (dest === 'eliq_chart_dataday') ? strokeGradient : color ,
			fillStyle: fillGradient,
			name: series,
			y: { 
				axis: axis,
				scaleStyle: color,
				gridStyle: '#121212',
				labelStyle: '#555555',
				labelFont: '10px Droid Sans',
				showGridLines: (axis===1) ? true : false,
				extra: 2,
				name: title,
				min: (dest === 'eliq_chart_dataday') ? 250 : 'auto',
				labels: true
			},
			x: { 
				labels: true,
				labelFormat: timeFormat,
				labelRotation: 0,
				showScale: true,
				scaleStyle: '#343536',
				labelFont: '10px Droid Sans',
				labelStyle: '#555555'
			},
			data: data
	});

}