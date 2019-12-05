import * as d3 from 'd3';

let data = { Spent: 18570, Saved: 31430 };

const width = 150, height = 150, margin = 0;
const radius = Math.min(width, height) / 2 - margin;

export default class MoneyDonut {
  constructor(e, moneyData) {
    data = moneyData;

    const svg = d3.select(e)
      .append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    const color = d3.scaleOrdinal()
      .domain(data)
      .range(["#edecfe", "#a3a1fb"]);
    
    const pie = d3.pie()
      .value(function(d) {return d.value; });

    const data_ready = pie(d3.entries(data));

    svg
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(65)         // This is the size of the donut hole
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) });
    
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3rem')
      .text('48%');
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5rem')
      .text('Saved');
  }
};