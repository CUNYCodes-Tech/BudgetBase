import * as d3 from 'd3';

let data = { Spent: 18570, Saved: 31430 };

const width = 150, height = 150, margin = 0;
const radius = Math.min(width, height) / 2 - margin;

export default class MoneyDonut {
  constructor(e, moneyData) {
    data = moneyData;

    const svg = d3.select(e)
      .append("svg")
        .attr("width", width + 150)
        .attr("height", height + 30);

    const meow = svg.append("g")
        .attr("transform", "translate(" + width + "," + height / 2 + ")");
    
    const color = d3.scaleOrdinal()
      .domain(data)
      .range(["#edecfe", "#a3a1fb"]);
    
    const pie = d3.pie()
      .value(function(d) {return d.value; });

    const data_ready = pie(d3.entries(data));

    meow
      .selectAll('whatever')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(65)         // This is the size of the donut hole
        .outerRadius(radius)
      )
      .attr('fill', function(d){ return(color(d.data.key)) });
    
    meow.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.3rem')
      .text(`${(data.Saved / (data.Saved + data.Spent) * 100).toFixed(2)}%`);
    meow.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5rem')
      .text('Saved');

    const legendGroup = svg.append("g")
      .attr("transform", `translate(0, ${radius*2 + 20})`);
    
    const legendScale = d3.scaleBand()
      .range([0, width + 200])
      .padding(0.1)
      .domain(Object.keys(data));
    
    const legend = legendGroup.selectAll(".money-legend")
      .data(color.domain())
      .enter()
        .append("g")
        .attr("class", "chart-legend")
        .attr("transform", (d,i) => `translate(${legendScale(d)}, 0)`);

    legend.append("circle")
      .attr("r", 7.5)
      .style("fill", color);

    legend.append("text")
      .attr("x", 15)
      .attr("y", 5)
      .text(d => "Total " + d);
  }
};