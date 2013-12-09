  var parseDateT = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;

  // Function to generate charts
  function gen_chart_json(dest,d1,d1_2,title,time_member,value_member) {

    // Generate chart
    var margin = {top: 14, right: 30, bottom: 30, left: 40},
      width = 400 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;
    
    var x = d3.time.scale()
      .range([0, width]);

    var y0 = d3.scale.linear()
      .range([height, 0]);

    var y1 = d3.scale.linear()
      .range([height, 0]);

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format("%H:%M"));

    var yAxis0 = d3.svg.axis()
      .scale(y0)
      .orient("left");

    var yAxis1 = d3.svg.axis()
      .scale(y1)
      .orient("right");

    var line0 = d3.svg.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y0(d.close); });

    var svg = d3.select('#'+dest).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Make sure the data is in the correct format
    for(i in d1) {
      d1[i].date = parseDateT(d1[i][time_member]);
      d1[i].close = +d1[i][value_member];
    }

    x.domain(d3.extent(d1, function(d) { return d.date; }));

    // Y axis min and max
    y0.domain([0,parseFloat(d3.max(d1, function(d) { return d.close; })*1.1)]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis0)
    
    .append("text")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("fill", "steelblue")
      .attr("transform", "translate(5,-5)")
      .text(title);

    svg.append("path")
      .datum(d1)
      .attr("class", "line0")
      .attr("d", line0);

  }

