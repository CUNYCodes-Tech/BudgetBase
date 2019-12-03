import * as d3 from 'd3';

let data = { Groceries: 4260, Bills: 3970, Food: 3454, Other: 2390 };

const width = 200, height = 200, margin = 0;
const radius = Math.min(width, height) / 2 - margin;

export default class ExpenseDonut {
  constructor(e, expenses) {
    data = expenses;
    const dataArray = Object.values(data);
    const total = dataArray.length? dataArray.reduce((total, num) => total + num) : 0;

    const svg = d3.select(e)
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    const color = d3.scaleOrdinal()
      .domain(data)
      .range(["#55d8fe", "#ff8373", "#ffda83", "#a3a0fb"]);
    
    const pie = d3.pie()
      .value(function(d) {return d.value; });

    const data_ready = pie(d3.entries(data));

    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(55)         // This is the size of the donut hole
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) });
    
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3rem')
      .text(`$${total}`);
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5rem')
      .text('Spent');
  }
};