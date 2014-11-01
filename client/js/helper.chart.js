  var parseDateT = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;
  var currentGraph = []; 

  // Function to generate charts
  function gen_chart_json(dest,d1,title,prop1,prop2,axis) {
    var data = [],i;
    if (prop1 !== undefined) {
      for(i = 0; i<d1.length; i++) {
        data.push([d1[prop1],d1[prop_2]]);
      }
    } else {
      data = d1;
    }
    if (currentGraph !== undefined && currentGraph[dest]) {
      grapho.removeDataset(currentGraph[dest]);
      currentGraph[dest] = undefined;
    }
    currentGraph[dest] = grapho.addDataSet({
        type:'line',
        strokeStyle: '#F0F066',
        y: { 
            axis: axis,
            scaleStyle: '#F0F066',
            showGridLines: true,
            name: title,
            labelFont: '11px Droid Sans',
            nameFont: '20px Droid Sans',
            labelStyle: '#FF0000',
            labels: true
        },
        x: { 
            labels: true,
            labelFormat: Grapho.formats.time
        },
        data: data
    });

  }

