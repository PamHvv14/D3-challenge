// Step 1: Set up our chart
//= ================================
var svgWidth = 960;
var svgHeight = 620;

var margin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var chart = d3.select("#scatter");

//append an svg element to the chart with appropriate height and width
var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

d3.csv("assets/data/data.csv").then(function(data) {
    // Step 4: Parse the data
    console.log(data);
  // Add X axis
  var x = d3.scaleLinear()
    .domain([8, 22])
    .range([0, width]);
  chartGroup.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0,26])
    .range([height, 0]);
  chartGroup.append("g")
    .call(d3.axisLeft(y));

  chartGroup.append("g").append("text")
    .attr("x", height)
    .attr("y", 28)
    .attr("value", "poverty") // value to grab for event listener
    .text("In Poverty (%)")
    .classed("active", true);

  chartGroup.append("g").append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -(height / 2))
    .attr("y", -40)
    .attr("value", "healthcare") // value to grab for event listener
    .text("Lacks Healthcare (%)")
    .classed("active", true);

  // Add dots
  chartGroup.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.poverty); } )
      .attr("cy", function (d) { return y(d.healthcare); } )
      .attr("r", 15)
      .style("fill", "#69b3a2")
      .attr("stroke-width", "1")
      .classed("stateCircle", true)
      .attr("opacity", 0.75);
    
  chartGroup.append("g")
    .selectAll('text')
    .data(data)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x", function (d) { return x(d.poverty); } )
    .attr("y", function (d) { return y(d.healthcare); } )
    .classed(".stateText", true)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle")
    .attr("fill", "black")
    .attr("font-size", "10px")
    .style("font-weight", "bold")
    .attr("alignment-baseline", "central");


})