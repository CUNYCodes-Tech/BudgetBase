import * as d3 from 'd3';

var n = 10, // number of samples (columns)
    m = 5; // number of series (layers)

var data = d3.range(n).map(function() { 
  return d3.range(m).map(Math.random); 
});

export default class StackedBars {
  constructor(e) {
    var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 300 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;
    
    var y = d3.scaleLinear()
      .rangeRound([height, 0])
      .nice();
    
    var x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);
    
    var z = d3.scaleOrdinal(/*d3.schemeSet3*/)
      .range(["#5fe3a1", "#56d9fe", "#a3a1fb"]);
    
    var parseTime  = d3.timeParse("%b %Y");
    
    // Import Data here.
    var raw = [
      {
        symbol: "Saved",
        date: "Week 1",
        price: 20.56
      },
      {
        symbol: "Earned",
        date: "Week 1",
        price: 90
      },
      {
        symbol: "Spent",
        date: "Week 1",
        price: 35
      },
      {
        symbol: "Saved",
        date: "Week 2",
        price: 18.26
      },
      {
        symbol: "Earned",
        date: "Week 2",
        price: 170
      },
      {
        symbol: "Spent",
        date: "Week 2",
        price: 66
      },
      {
        symbol: "Saved",
        date: "Week 3",
        price: 77
      },
      {
        symbol: "Earned",
        date: "Week 3",
        price: 25
      },
      {
        symbol: "Spent",
        date: "Week 3",
        price: 45
      },
      {
        symbol: "Saved",
        date: "Week 4",
        price: 96
      },
      {
        symbol: "Earned",
        date: "Week 4",
        price: 25
      },
      {
        symbol: "Spent",
        date: "Week 4",
        price: 46
      }
    ];
    var symbols = [];
    var data = [];

    raw.forEach(function(d, i) {
      if(symbols.indexOf(d.symbol) < 0) {
        symbols.push(d.symbol)
        data[symbols.indexOf(d.symbol)] = [];
      }
      // String to INT
      d.value = +d.price;     
 
      // Parsing time
      d.date = /*parseTime(*/d.date/*)*/
      data[symbols.indexOf(d.symbol)].push(d);
    });

    var data_nest = d3.nest()
    	.key(function(d) { return d.date/*.getFullYear()*/; })
    	.key(function(d) { return d.symbol; })
    	.rollup(function(v) { return d3.sum(v, function(d) { return d.price; }); })
      .entries(raw);
      
    var years = data_nest.map(function(d) { return d.key; });

    var data_stack = []

    data_nest.forEach(function(d, i) {
      d.values = d.values.map(function(e) { return e.value; })
      var t ={}
      symbols.forEach(function(e, i) {
        t[e] = d.values[i]
      })
      t.year = d.key;
      data_stack.push(t)
    });

    var layers = d3.stack().keys(symbols)(data_stack);

    var max = d3.max(layers[layers.length-1], function(d) { return d[1]; });
    
    y.domain([0, max]);
    x.domain(years);

    var svg = d3.select(e).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g").selectAll("g")
          .data(layers)
      .enter().append("g")
        .style("fill", function(d) { return z(d.key); })	
        .selectAll("rect")
      .data(function(d) {  return d; })
        .enter().append("rect")
          .attr("x", function(d, i) { return x(d.data.year); })
          .attr("y", function(d) { return y(d[1]); })
          .attr("height", function(d) { return y(d[0]) - y(d[1]); })
          .attr("width", x.bandwidth());

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
      
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + (0) + ", 0)")
      .call(d3.axisLeft().scale(y).ticks(5));
    
  }
};