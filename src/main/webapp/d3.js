function run() {

  d3.json("./salesData.json").then(function (data_json) {
    console.log("in js file")
    console.log(x_JsArray)
    console.log(y_JsArray)

    aggregate(data_json, { x_JsArray, y_JsArray, Func, chartType });

  })
}


function aggregate(jsonObj, Arguments) {

  var argg = []

  console.log(Arguments.x_JsArray)
  console.log(Arguments.y_JsArray)

  Arguments.x_JsArray.forEach((e, i) => {

    console.log(e, i)
    var a = e;

    if (a.localeCompare('Order Date') == 0) {
      argg.push(d => d[a].substring(d[a].length - 4, d[a].length)) // -7 for mnt
    } else if (a.localeCompare('Order Date-M') == 0) {
      argg.push(d => d['Order Date'].substring(d['Order Date'].length - 7, d['Order Date'].length - 5)) // -7 for mnt   // TODO - only do months 
    } else {
      argg.push(d => d[a]) // -7 for mnt
    }

  })

  var total = 0;

  console.log(Arguments)
  if (Arguments.Func.localeCompare('count') == 0) {

    var result = d3.flatRollup(jsonObj, v => {

      let options = [...new Set(v.map(d => d[Arguments.y_JsArray]))];
      console.log(options)
      return options.length
    }, ...argg)
  }
  else {
    console.log("check")

    var checkvar = parseInt(jsonObj[0][Arguments.y_JsArray])
    console.log(checkvar)
    console.log(!Number.isNaN(checkvar))
    if (Number.isNaN(checkvar)) {
      createError(Arguments.Func);
      return;
    }

    var result = d3.flatRollup(jsonObj, v => {
      return d3[Arguments.Func](v, x => {
        return x[Arguments.y_JsArray];;
      })
    }, ...argg)
  }


  console.log(result)

  var arrMulti = []
  var chartType = Arguments.chartType
  if (chartType.localeCompare('pie') == 0) {

    result.forEach((e, i) => {
      var temp = {
        name: "", val: ""
      }
      temp.name = e.slice(0, e.length - 1).toString()
      temp.val = e[e.length - 1]
      arrMulti.push(temp)

    })

    // console.log(arrMulti);
    createPieChart(arrMulti)

  } else {

    result.forEach((e, i) => {
      var temp = []
      temp.push(e.slice(0, e.length - 1).toString())
      temp.push(e[e.length - 1])
      arrMulti.push(temp)
    })
    //console.log(arrMulti);

    arrMulti.sort(function (a, b) {
      a[0] = a[0].split('/').reverse().join('');
      b[0] = b[0].split('/').reverse().join('');
      return a[0].localeCompare(b[0]);
    });

    console.log(arrMulti);

    var arr1 = []
    var arr2 = []
    arrMulti.forEach((e, i) => {
      arr1.push(e[0])
      arr2.push(e[1])
    })
    createChart(arr1, arr2)
  }
}

// bar Chart Code
function createChart(arr1, arr2) {

  // bar chart

  var myData = arr2
  var myData2 = arr1
  console.log(Math.max(...myData));
  var maxHeight = 400;
  var commWid = 1200;
  // to add axis
  var extent = d3.extent(myData2);

  var linearScale = d3.scaleBand()
    .domain(myData2)
    .range([0, commWid])


  var margin = 150;
  var axisMargin = 50

  var vertiScale = d3.scaleLinear()
    .domain([0, d3.max(myData)])
    .range([maxHeight, 0])
    .nice()

  d3.select('#chartArea')
    .append('svg')
    .attr('id', 'barChart')
    .attr("style", "background-color:skyblue;  height:200px;")
    .style("width", commWid + margin)
    .style("height", maxHeight + margin)
    .append('g')
    .attr('transform', 'translate(100,0)')

    .selectAll('rect')
    .data(myData)
    .enter()
    .append('rect')
    .attr("style", "fill:green;stroke-width:1;stroke:rgb(0,0,0)")

    .style("width", linearScale.bandwidth() - (linearScale.bandwidth() * 0.1))// -20
    .attr('height', function (data) { return (maxHeight - vertiScale(data)) })
    .attr('x', function (data, i) { return i * linearScale.bandwidth() }) // +10
    .attr('y', function (data, i) { return vertiScale(data) + axisMargin })  //(maxHeight)- ( maxHeight-
    .on("mouseover", function (event, d) {
      divv.transition()
        .duration(500)
        .style("opacity", 1);
      divv.html(d + "<br/>")
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 40) + "px");
    })
    .on("mouseout", function (d) {
      divv.transition()
        .duration(500)
        .style("opacity", 0);
    })
    .append("text")
    .text(function (d) {
      return "sfcdcv";
    })
    .attr("x", function (d, i) {
      return i * linearScale.bandwidth();
    })
    .attr("y", function (d) {
      return vertiScale(d) + axisMargin;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "14px")
    .attr("fill", "black")
    .attr("text-anchor", "middle")
    .attr("z-index", 10);

  var xAxis = d3.axisBottom(linearScale);
  var mak = d3.select('#barChart')
    .append('g')
    .call(xAxis)
    .attr('transform', `translate(100,${maxHeight + axisMargin})`)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", function (d) {
      return "rotate(-40)";
    });

  var yAxis = d3.axisLeft(vertiScale);
  d3.select('#barChart')
    .append('g')
    .call(yAxis)
    .attr('transform', `translate(100,${axisMargin})`)

  var divv = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
}



// pie chart Code
function createPieChart(data) {


  d3.select('#chartArea')
    .append('svg')
    .attr('height', 500)
    .attr('width', 1200)
    .attr('id', 'pieChart')
    .style("background-color", "skyblue");

  var svg = d3.select("#pieChart"),
    width = svg.attr("width"),
    height = svg.attr("height"),
    radius = 250;



  // center point
  var g = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


  var pieScale = d3.scaleOrdinal()
    .domain(data)
    .range(['blue', 'green', 'red', 'yellow', 'purple', 'grey', 'pink']);

  var pie = d3.pie().value(function (d) {
    return d.val;
  });
  var circlePath = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);

  var arc = g.selectAll("arc")
    .data(pie(data))
    .enter();

  arc.append("path")
    .attr("d", circlePath)
    .attr("fill", function (d) { return pieScale(d.data.name); })
    .on("mouseover", function (event, d) {
      divvv.transition()
        .duration(500)
        .style("opacity", 1);
      divvv.html(d.data.val + "<br/>")
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY - 40) + "px");
    })
    .on("mouseout", function (d) {
      divvv.transition()
        .duration(500)
        .style("opacity", 0);
    });


  var labelPath = d3.arc()
    .outerRadius(0)
    .innerRadius(radius);

  arc.append("text")
    .attr("transform", function (d) {
      return "translate(" + labelPath.centroid(d) + ")";
    })
    .attr('dy', '.35em')
    .text(function (d) { return d.data.name; })
    .style("font-size", 10)
    .style("font-weight", "bold");



  var divvv = d3.select("body").append("div")
    .attr("class", "tooltip")
    .text('dsd')
    .style("opacity", 0)

}

// Invalid Req msg Code
function createError(val) {
  var maxHeight = 400;
  var commWid = 1200;

  var margin = 150;

  d3.select('#chartArea')
    .append('div')
    .attr('id', 'barChart')
    .attr("style", " height:200px;")
    .style("width", commWid + margin)
    .style("height", maxHeight + margin)
    .append('div')

    .text("Invalid Request, can't perform " + val + " of Categorical value.")
    .attr("font-size", "14px")
    .style('color', 'white')

}
