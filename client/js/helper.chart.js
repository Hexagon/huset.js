  var parseDateT = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;
  var currentGraph = []; 

  // Function to generate charts
  function gen_chart_json(dest,d1,title,axis) {
    console.log(d1);
    grapho.removeDataset(currentGraph[dest]);
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
        data: d1
    });

  }

