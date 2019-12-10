import * as d3 from 'd3';

let data = { Groceries: 4260, Bills: 3970, Food: 3454, Other: 2390 };

const width = 320, height = 180, margin = 0;
const radius = Math.min(width, height) / 2 - margin;

export default class ExpenseDonut {
  constructor(e, expenses) {
    data = expenses;
    const dataArray = Object.values(data);
    const total = dataArray.length? dataArray.reduce((total, num) => total + num) : 0;

    const svg = d3.select(e)
      .append("svg")
        .attr("width", width)
        .attr("height", height + 23);
    
    const color = d3.scaleOrdinal()
      .domain(data)
      .range(["#55d8fe", "#ff8373", "#ffda83", "#a3a0fb"]);
    
    const pie = d3.pie()
      .value(function(d) {return d.value; });

    const data_ready = pie(d3.entries(data));

    const meow = svg.append("g")
      .attr("transform", "translate(" + (width / 2 - 70) + "," + (height / 2) + ")");
    
    meow.selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(55)         // This is the size of the donut hole
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) });
    
    meow.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3rem')
      .text(`$${total}`);
    meow.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5rem')
      .text('Spent');

    const legendGroup = svg.append("g")
      .attr("transform", `translate(${width / 2 - 50 + radius + 20}, 15)`)
    
    const legendScale = d3.scaleBand()
      .range([0, height-20])
      .padding(0.1)
      .domain(Object.keys(data));
    
    const legend = legendGroup.selectAll(".expense-legend")
      .data(color.domain())
      .enter()
        .append("g")
        .attr("class", "chart-legend")
        .attr("transform", (d,i) => `translate(0, ${legendScale(d)})`);

    legend.append("circle")
    .attr("cy", 9)
    .attr("r", 7.5)
    .style("fill", "transparent")
    .style("stroke", color)
    .style("stroke-width", 3);
    
    legend.append("text")
        .attr("x", 20)
        .attr("y", 14)
        .text(d => d);
  }
};