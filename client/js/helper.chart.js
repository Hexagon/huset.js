var currentGraph=[];

// Function to generate charts
function gen_chart_json(curGrapho,dest,d1,title,color,prop1,prop2,series,axis) {
	var data = [],i;

	if ( currentGraph == undefined ) currentGraph = [];

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

	if (currentGraph !== undefined && currentGraph[dest]) {
		curGrapho.removeDataset(currentGraph[dest]);
		currentGraph[dest] = undefined;
	}

	currentGraph[dest] = curGrapho.addDataSet({
			type:'line',
			strokeStyle: color,
			lineSmooth: false,
			name: series,
			y: { 
				axis: axis,
				scaleStyle: color,
				showGridLines: (axis===1) ? true : false,
				name: title,
				labels: true
			},
			x: { 
				labels: true,
				labelFormat: Grapho.formats.time,
				labelRotation: 30
			},
			data: data
	});

}