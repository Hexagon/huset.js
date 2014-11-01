  var currentGraph;

  // Function to generate charts
  function gen_chart_json(dest,d1,title,prop1,prop2,series,axis) {
    if ( currentGraph == undefined ) currentGraph = [];
    var data = [],i,currentGraph;
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
      grapho.removeDataset(currentGraph[dest]);
      currentGraph[dest] = undefined;
    }
console.log(data);
    currentGraph[dest] = grapho.addDataSet({
        type:'line',
        strokeStyle: '#F0F066',
	lineSmooth: false,
	name: series,
        y: { 
            axis: axis,
            scaleStyle: '#F0F066',
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

