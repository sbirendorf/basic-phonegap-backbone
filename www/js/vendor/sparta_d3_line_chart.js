// ¬© 2012 Sparta Software Corporation 165A Constitution Drive, Menlo Park, CA 94025 Phone: 650 833 9384
/**
 * Have to setup the menu items for the URL call backs for the forms
 */

/* 
 * Function to create the axis and scales for how to draw the chart
 * @parameter vis is the svg d3 select 
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter HEIGHT is the height of graph in pixels
 * @parameter WIDTH is the height of graph in pixels
 * @parameter min is the min int the yaxis should show
 * @parameter max is the  max int the yaxis should show
 * @parameter minDate is the min date  the xaxis should show
 * @parameter maxDate is the min date  the xaxis should show
 * @parameter TICKS is an object with TICKS.X AND TICKS.Y for the lines in grid coming from xaxis and yaxis
 * @returns object  scales which has scale.xScale and scale.yScale
 */
//$("#datepicker_from").datepicker().datepicker('setDate', '-100');
//$("#datepicker_to").datepicker().datepicker('setDate', new Date());
function create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,minDate,maxDate,TICKS){

    yScale = d3.scale.linear().range([HEIGHT-MARGINS.bottom , MARGINS.top]).domain([min,max ]),
    xScale = d3.time.scale().rangeRound([MARGINS.left, WIDTH - MARGINS.right])
        .domain([new Date(minDate), d3.time.day.offset(new Date(maxDate), 1)]);
                
//Create the xaxis TICKS.X is the number of vertical lines to draw on graph and TICKS.Y is horizontal lines to draw on graph  
    xAxis = d3.svg.axis()
        .scale(xScale)
        .tickPadding(10)
        .ticks(TICKS.X);
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(TICKS.Y);
    function make_x_axis() {        
        return d3.svg.axis()
            .scale(xScale)
            .ticks(TICKS.X)
            .orient("bottom");
    };
    function make_y_axis() {        
            return d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(TICKS.Y);
    };
//add grid to the graph
    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + (HEIGHT-MARGINS.bottom) + ")")
            .call(make_x_axis()
                    .tickSize(-(HEIGHT-MARGINS.top-MARGINS.bottom), 0, 0)
                    .tickFormat("")
            );

    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(" + MARGINS.left + ",0)")
            .call(make_y_axis()
                    .tickSize(-(WIDTH-MARGINS.right-MARGINS.left), 0, 0)
                    .tickFormat("")
            );
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis)
        .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em");
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);


    scales = {xScale:xScale,yScale:yScale};
    return scales;
}

/* 
 * Function to draw a line on the chart
 * @parameter graphSVG is SVG element to draw the lines on
 * @parameter xScale is the scale for the x axis
 * @parameter yScale is the scale for the y axis
 * @parameter data is data formatted [{date:date, fact_value:value},{date:date, fact_value:value}]
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter name is what you would like the name to be for the tooltip and how it is referenced in the data array
 * @parameter date_time is what you would like the name to be for the tooltip and how it is referenced in the data array
 * @parameter color is a string of what color the line should be
 
 * @parameter line1 is the id of the svg element in the html
 */
function drawline(graphSVG,xScale,yScale,data,MARGINS,name,date_time,color,line1,TOOLTIP,linetype,click){
        click = typeof click !== 'undefined' ? click : function(i){return i;}; 
    linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
    var lineGen = d3.svg.line()
        .x(function(d) {
            return xScale(d[date_time])-MARGINS.left;
        })
        .y(function(d) {
            return yScale(d[name])-MARGINS.top;
        })
        .interpolate(linetype);

    graphSVG.append('svg:path')
        .attr('d', lineGen(data))
        .attr('stroke', color)
        .attr('stroke-width', 2.5)
        .attr('fill', 'none')
        .attr("class", "line")
        .attr("id", ""+line1+"");
    line=this[line1];
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
            return TOOLTIP(d,name,date_time);
      })
    graphSVG.call(tip); 
    graphSVG.selectAll("circle2")
            .data(data)
            .enter()
            .append("circle")
            .attr("id", "circle"+line1+"")
            .attr("class","tipcircle"+line1)
            .attr("cx",function(d,i){return xScale(d[date_time])-MARGINS.left})
            .attr("cy",function(d,i){return yScale(d[name])-MARGINS.top})
            .attr("r",5)
            .style('opacity',1)
            .style('fill',color)
            .on('mouseover',tip.show)
            .on('mouseout', tip.hide)
            .on('click',click); 
}
function drawbars(WIDTH,HEIGHT,graphSVG,xScale,yScale,data,MARGINS,name,date_time,color,line1,TOOLTIP){
//console.log(data);
    var x=xScale.domain();
    var width = (WIDTH-MARGINS.left-MARGINS.right)/((x[1]-x[0])/(WIDTH * 3600 * 24));
    var height = HEIGHT-MARGINS.top-MARGINS.bottom;
    var width = width*.90;
    var tip = d3.tip()
            .attr('class','chart-region')      
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
            return TOOLTIP(d,name,date_time);
      })
    graphSVG.call(tip); 
    graphSVG.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("id", "rect")
            .attr("class","bars")
            .attr("width", width)
            .attr("height", height)
            .attr("x",function(d,i){return xScale(d[date_time])-MARGINS.left-(20)})
            .attr("y",function(d,i){
                                    if(yScale(d[name])-MARGINS.top>0)
                                    {
                                        return yScale(d[name])-MARGINS.top;
                                    }
                                    else{
                                        return 0;
                                    }
                                })
            .style('opacity',1)
            .style('fill',color)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
}
/* 
 * Function to draw a lines and the legends on the chart
 * @parameter vis is vis element to draw the lines on
 * @parameter graphSVG is SVG element to draw the lines on
 * @parameter xScale is the scale for the x axis
 * @parameter yScale is the scale for the y axis
 * @parameter data is data formatted [{date:date, fact_value:value},{date:date, fact_value:value}]
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter COLOR_ONE is a string of what color the box in the legend should be
 * @parameter name is what you would like the name to be for the tooltip and how it is referenced in the data array
 * @parameter date_time is what you would like the name to be for the tooltip and how it is referenced in the data array
 * @parameter legend_y is pixel amount of where to draw the legend
 * @parameter LEGEND_LABEL_ONE is a string of what the label for the legend should be
 * @parameter line1 is the id of the svg element in the html
 */
function drawline_legend(vis,graphSVG,xScale,yScale,data,HEIGHT,WIDTH,COLOR_ONE, name,date_time,legend_y,LEGEND_LABEL_ONE,line1,MARGINS,TOOLTIP,linetype,click){
    linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
    if(data!=null){
        drawline(graphSVG,xScale,yScale,data,MARGINS,name,date_time,COLOR_ONE,line1,TOOLTIP,linetype,click);
    }
    var legend = vis.append("g")
              .attr("class", "legend")
              .attr("x", WIDTH - MARGINS.right+15)
              .attr("y", MARGINS.top);

        legend.append("rect")
         .attr("x", WIDTH - MARGINS.right+60)
         .attr("y", MARGINS.top+legend_y)
         .attr("width", 10)
         .attr("height", 10)
         .on("click", function(){
                            // Determine if current line is visible
                            var active   = line.active ? false : true,
                                    newOpacity = active ? 0.05 : 1;
                            var active   = line.active ? false : true,
                                    classRep = active ? "circle.tipcircle"+line1 : "circle.nohover";
                            // Hide or show the elements
                            d3.selectAll("circle.tipcircle"+line1).style("opacity", newOpacity);
                            d3.select("#"+line1+"").style("opacity", newOpacity);
                            d3.select("#circle"+line1+"").style("opacity", newOpacity);
                            // Update whether or not the elements are active
                            line.active = active;
                    })
                    .style("fill", COLOR_ONE);

    legend.append("text")
      .attr("x", WIDTH - MARGINS.right+75)
      .attr("y", MARGINS.top+10+legend_y)
      .on("click", function(){
                    // Determine if current line is visible
                    var active   = line.active ? false : true,
                            newOpacity = active ? 0.05 : 1;
                    // Hide or show the elements
                    d3.selectAll("circle.tipcircle"+line1).style("opacity", newOpacity);
                    d3.select("#"+line1+"").style("opacity", newOpacity);
                    // Update whether or not the elements are active
                    line.active = active;
            })
            .text(LEGEND_LABEL_ONE);	   
      
}
function add_movement_signature_to_graph(vis,graphSVG,scan_data,xScale,WIDTH,HEIGHT,MARGINS,draw_second_axis){
    if(scan_data.date.length>=1){
        m=3; // number of bars
        width=WIDTH;
        height=HEIGHT-MARGINS.bottom;
        var y = d3.scale.linear()
            .domain([0, 100])
            .range([HEIGHT-MARGINS.bottom , MARGINS.top]);

        var x0 = d3.scale.ordinal()
            .domain(d3.range(m))//data.date.length))
            .rangeBands([0, width], .9);

        var x1 = d3.scale.ordinal()
            .domain(d3.range(m))
            .rangeBands([0, x0.rangeBand()]);

        var z = d3.scale.category10();

        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("right");

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        var trans = width-MARGINS.right;
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("right");
       if(draw_second_axis==true){
           vis.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate("+trans+",0)")
               .call(yAxis);
       }
       function add_scan_bars(scan_data,name,xScale, x1,y,MARGINS,bar_position,color){
            var tool_name = name.toLowerCase().replace( /\b\w/g, function (m) {return m.toUpperCase()});
            var scan_tip = d3.tip()
                   .attr('class', 'd3-tip')
                   .offset([-10, 0])
                   .html(function(d,i) {var scan_date = '</span><br><span>'+ scan_data.date[i].getFullYear() + '-' +(scan_data.date[i].getMonth()+1) +'-'+scan_data.date[i].getDate() +'</span>';
                         return tool_name+"<br>"+scan_date+"<br>"+d;
                   })
             graphSVG.call(scan_tip); 
             graphSVG.append("g").selectAll("rect")
                 .data(scan_data[name])
               .enter().append("rect")
                 .style("fill", color)
                 .attr("class","scan")
                 .attr("transform", "translate(" + x1(bar_position) + ",0)")
                 .attr("width", x1.rangeBand())
                     .attr("height", HEIGHT)
                 .attr("x", function(d, i) { return xScale(scan_data.date[i])-MARGINS.left; })
                 .attr("y", function(d) { return  y(d)-MARGINS.top; })
                 .on('mouseover', scan_tip.show)
                 .on('mouseout', scan_tip.hide);
       }
       add_scan_bars(scan_data,"load",xScale, x1,y,MARGINS,0,"#9C9291");
       add_scan_bars(scan_data,"explode",xScale, x1,y,MARGINS,1,"#000");
       add_scan_bars(scan_data,"drive",xScale, x1,y,MARGINS,2,"#b83359");
    }  
 }
function navigation(vis,graphSVG,datatot,navHeight,WIDTH,HEIGHT,MARGINS,minDate,maxDate,xscale,yscale,name,date_time,colors,TOOLTIP,redrawChart){
       console.log(MARGINS);
     navChart = d3.select('#navigation')
                .attr('width', WIDTH)
                .attr('height', navHeight + MARGINS.top + MARGINS.bottom)
                .append('g');

            navXScale = d3.time.scale()
                                .rangeRound([MARGINS.left, WIDTH - MARGINS.right])
                                .domain([new Date(minDate), d3.time.day.offset(new Date(maxDate), 1)]);

            var navXAxis = d3.svg.axis()
                    .scale(navXScale)
                    .orient('bottom');

                navChart.append('g')
                    .attr('class', 'x axis')
                    .attr("transform", "translate(0,50)")
                    .call(navXAxis);
            viewport = d3.svg.brush()
                .x(navXScale)
                .on("brush", function () {
                    redrawChart();
                });         
            //Add selected rect on the navigation
            navChart.append("g")
                .attr("class", "viewport")
                .call(viewport)
                .selectAll("rect")
                .attr("height", navHeight);
            navChart.append('text')
            .attr("class","")
            .attr("x",(WIDTH-MARGINS.right)/2)
            .attr("text-anchor", "middle")
            .attr("y",navHeight/2)
            .attr("font-size","12")
            .text("Click and drag here to zoom and scroll");

}


//function for randomly generating colors
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/* 
 * Function to initialize the chart
 * @parameter WIDTH is the width of graph in pixels
 * @parameter HEIGHT is the height of graph in pixels
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter TITLE is string of what the title should say.  Can use HTML to style and format
 * @parameter TOOLTIP is function to display the data for hovering over the lines
 * @parameter arr_legend_labels array of strings for the labels to the colors in the legend
 * @parameter datatot array of data.  Should be in the following format: 
 *                  datatot = [[{fact_date:sqlformatdatetime,fact_value:Value_here}],[{fact_date:sqlformatdatetime,fact_value:Value_here}]]
 * @parameter colors is an array of colors if no color is specified the line will be randomly assigned some color.
 * @parameter name_or_data string of 'athlete' or 'data'  to determine the legend labels.
 */
function InitChart(WIDTH,HEIGHT,MARGINS,TITLE,data,colors,name_or_data,linetype) {
    linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
    //This is to set the json object names dynamic
    if(typeof colors=='undefined' || colors=='' || colors==null){
            colors = ['blue','red','#00FF00','orange','gray'];
    }
    var TICKS = {
        X: 5,
        Y: 5
    };
    var TOOLTIP = function(d,name,date_time){
        if(typeof(d.tooltip)=='undefined'){
            d.tooltip = ' ';
        }
        return '<strong>'+name+':</strong> <span style=\'color:white\'>' + d[name]+ '</span><br><span>'+ d[date_time].getFullYear() + '-' +(d[date_time].getMonth()+1) +'-'+d[date_time].getDate() +'</span><br>'+d.tooltip;}
    var datatot = [];
    var arr_legend_labels = [];
    for( i=0; i<data.length;i++){
        var data_name = Object.keys(data[i]);
        datatot[i]=data[i][data_name[1]];
        if(name_or_data=='name'){
            arr_legend_labels.push(data[i].name);
        }
        else{
            arr_legend_labels.push(data_name[1]);
        }
        if(typeof colors[i]=='undefined'){
            colors[i]=getRandomColor();
        }
    }
    if(typeof(dataIndex)!=='undefined'){
       delete dataIndex;
    }
    //sets the index to use the first array that has 
    for(i=0; i<datatot.length;i++){
        if(datatot[i]!==null){
            if(typeof(dataIndex)=='undefined'){
                var dataIndex=i;
            }
        }
    }
    var keys = Object.keys(datatot[dataIndex][0]);
    var name = keys[1];
    var date_time = keys[0];
    //parseDate is function for dealing with datetimes from the Database do not need to change them from SQL statement
    var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;    
    //set min and max for y axis set high value for min and low value for max so that it will be overwritten
    var min = 1000000;
    var max = -100000;
    var minDate = parseDate(datatot[dataIndex][0][date_time]);
    var maxDate = parseDate(datatot[dataIndex][0][date_time]);
//Set min and max for xaxis and yaxis
    for( i=0; i<datatot.length;i++){
        if(datatot[i]!=null){
            var keys = Object.keys(datatot[i][0]);
            var name = keys[1];
            var date_time = keys[0];
            for (j = 0; j < datatot[i].length; j++) {

                datatot[i][j][name] = parseFloat(datatot[i][j][name]).toFixed(3);
                if(parseFloat(datatot[i][j][name])<min){
                    min = parseFloat(datatot[i][j][name]);
                }
                if(parseFloat(datatot[i][j][name])>max){
                    max = parseFloat(datatot[i][j][name]);
                }
                datatot[i][j][date_time] = parseDate(datatot[i][j][date_time]);
                if(minDate>datatot[i][j][date_time]){
                    minDate = datatot[i][j][date_time];
                }
                if(maxDate<datatot[i][j][date_time]){
                    maxDate = datatot[i][j][date_time];
                }

            }
        }
    }
//Give padding to the yaxis 
    var range = (parseFloat(max)-parseFloat(min))*.05;
    if(range==0){
        max=max+1;
        min=min-1;
    }
    else{
        max = parseFloat(max)+range;
        min = parseFloat(min)-range;
    }
    minDate = minDate.setDate(minDate.getDate() - 70);
    maxDate = maxDate.setDate(maxDate.getDate() + 7);
//select the dom element named visualisation
    var vis = d3.select("#visualisation");
    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,minDate,maxDate,TICKS);
    xScale = scales.xScale;
    yScale = scales.yScale;
//This svg element goes on top of vis to keep the navigation contained inside the axises
    var graphSVG = vis
        .append("svg:svg")
        .attr('width', WIDTH-MARGINS.right-MARGINS.left)
        .attr('height',HEIGHT-MARGINS.top-MARGINS.bottom)
        .attr('x',MARGINS.left)
        .attr('y',MARGINS.top)
        .attr('class','graphSVG');
//ADD TITLE
    vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text(TITLE);
    

//      Adding the navigation at the bottom
    redrawChart=function() {

                    xScale.domain(viewport.empty() ? navXScale.domain() : viewport.extent());
                for( i=0; i<datatot.length;i++){
                    if(datatot[i]!=null){
                        var keys = Object.keys(datatot[i][0]);
                        var name = keys[1];
                        var date_time = keys[0];
                        d3.selectAll("circle.tipcircle"+"line"+i).remove();
                        d3.select("#line"+i).remove();
                        drawline(graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[i],"line"+i,TOOLTIP,linetype);
                    }
                }
      
                vis.select('.x.axis').call(xAxis);
            }
    navHeight = 50 ;

    navigation(vis,graphSVG,datatot,navHeight,WIDTH,HEIGHT,MARGINS,minDate,maxDate,xScale,yScale,name,date_time,colors,TOOLTIP,redrawChart);
    for( i=0; i<datatot.length;i++){
        if(datatot[i]!=null){
            var keys = Object.keys(datatot[i][0]);
            var name = keys[1];
            var date_time = keys[0];
        }
        drawline_legend(vis,graphSVG,xScale,yScale,datatot[i],HEIGHT,WIDTH,colors[i],name,date_time,0+i*20,arr_legend_labels[i],"line"+i,MARGINS,TOOLTIP,linetype);
    }
        change_date = function(){
            var today = new Date(maxDate);
            var date1 = new Date(maxDate).setDate(today.getDate()+1);
            var date2 =  new Date(maxDate).setDate(today.getDate()-30);
            xScale.domain([new Date(date2), d3.time.day.offset(new Date(date1), 1)]);
            function updateViewportFromChart() {
                if ((xScale.domain()[0] <= minDate) && (xScale.domain()[1] >= maxDate)) {

                    viewport.clear();
                }
                else {

                    viewport.extent(xScale.domain());
                }

                navChart.select('.viewport').call(viewport);
            }
    //    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,date1,date2,TICKS);
            updateViewportFromChart();
            redrawChart();
        }

        change_date();
}

  function init_cause_effect_chart(WIDTH,HEIGHT,MARGINS,TITLE,data,colors,name_or_data,scan_data,injury_data,event_data,linetype) {
          linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
//          data=[{"name":"Alexa Bartlett","Complex 1":[{"date":"2014-02-12T00:00:00","Complex 1":915,"tooltip":"Deadlift - 3in  <br>8: 25<br>5: 25<br>5: 30<br>5: 44<br>5: 44<br>0: 0<br>0: 0<br>"},{"date":"2014-02-19T00:00:00","Complex 1":692,"tooltip":"Deadlift - 3in  <br>8: 24<br>5: 25<br>5: 25<br>5: 25<br>5: 25<br>0: 0<br>0: 0<br>"},{"date":"2014-02-26T00:00:00","Complex 1":526,"tooltip":"Deadlift - 3in  <br>8: 17<br>5: 24<br>3: 30<br>3: 30<br>3: 30<br>0: 0<br>0: 0<br>"},{"date":"2014-03-12T00:00:00","Complex 1":615,"tooltip":"Deadlift - 3in  <br>8: 20<br>5: 28<br>3: 35<br>3: 35<br>3: 35<br>0: 0<br>0: 0<br>"},{"date":"2014-04-02T00:00:00","Complex 1":775,"tooltip":"Deadlift - 3in  <br>8: 25<br>5: 25<br>5: 30<br>5: 30<br>5: 30<br>0: 0<br>0: 0<br>"},{"date":"2014-04-26T00:00:00","Complex 1":0,"tooltip":"Split Squat - 18in <br>2: 0<br>2: 0<br>2: 0<br>2: 0<br>2: 0<br>0: 0<br>0: 0<br>"},{"date":"2014-05-07T00:00:00","Complex 1":188,"tooltip":"Split Squat - 18in <br>4: 17<br>4: 0<br>4: 0<br>4: 15<br>4: 15<br>0: 0<br>0: 0<br>"},{"date":"2014-05-17T00:00:00","Complex 1":336,"tooltip":"Split Squat - 18in <br>4: 9<br>4: 15<br>4: 20<br>4: 20<br>4: 20<br>0: 0<br>0: 0<br>"},{"date":"2014-06-02T00:00:00","Complex 1":420,"tooltip":"Split Squat - 18in <br>6: 0<br>6: 0<br>6: 20<br>6: 25<br>6: 25<br>0: 0<br>0: 0<br>"},{"date":"2014-06-25T00:00:00","Complex 1":0,"tooltip":"Split Squat - 18in <br>6: 0<br>6: 0<br>6: 0<br>6: 0<br>6: 0<br>0: 0<br>0: 0<br>"},{"date":"2014-07-02T00:00:00","Complex 1":180,"tooltip":"Split Squat - 18in <br>4: 0<br>4: 0<br>4: 15<br>4: 15<br>4: 15<br>0: 0<br>0: 0<br>"},{"date":"2014-07-13T00:00:00","Complex 1":280,"tooltip":"Split Squat - 18in <br>4: 0<br>4: 15<br>4: 15<br>4: 20<br>4: 20<br>0: 0<br>0: 0<br>"},{"date":"2014-07-22T00:00:00","Complex 1":324,"tooltip":"Split Squat - 18in <br>4: 0<br>4: 15<br>4: 22<br>4: 22<br>4: 22<br>0: 0<br>0: 0<br>"},{"date":"2014-08-26T00:00:00","Complex 1":360,"tooltip":"Split Squat - 18in <br>6: 20<br>6: 10<br>6: 10<br>6: 10<br>6: 10<br>0: 0<br>0: 0<br>"},{"date":"2014-08-30T00:00:00","Complex 1":200,"tooltip":"Split Squat - 18in <br>4: 10<br>4: 10<br>4: 10<br>4: 10<br>4: 10<br>0: 0<br>0: 0<br>"},{"date":"2014-09-03T00:00:00","Complex 1":160,"tooltip":"Split Squat - 18in <br>4: 0<br>4: 10<br>4: 10<br>4: 10<br>4: 10<br>0: 0<br>0: 0<br>"},{"date":"2014-09-17T00:00:00","Complex 1":600,"tooltip":"Row - DB (RTP) <br>10: 15<br>10: 15<br>10: 15<br>10: 15<br>0: 15<br>0: 0<br>0: 0<br>"},{"date":"2014-09-24T00:00:00","Complex 1":960,"tooltip":"Row - DB (RTP) <br>12: 20<br>12: 20<br>12: 20<br>12: 20<br>0: 20<br>0: 0<br>0: 0<br>"},{"date":"2014-10-11T00:00:00","Complex 1":1200,"tooltip":"Row - DB (RTP) <br>12: 25<br>12: 25<br>12: 25<br>12: 25<br>0: 25<br>0: 0<br>0: 0<br>"},{"date":"2014-10-15T00:00:00","Complex 1":1000,"tooltip":"Row - DB (RTP) <br>10: 25<br>10: 25<br>10: 25<br>10: 25<br>0: 25<br>0: 0<br>0: 0<br>"},{"date":"2014-10-22T00:00:00","Complex 1":1200,"tooltip":"Squat - 18\u0022 Box (RTP) <br>10: 20<br>10: 25<br>10: 25<br>10: 25<br>10: 25<br>0: 0<br>0: 0<br>"},{"date":"2014-10-29T00:00:00","Complex 1":1380,"tooltip":"Squat - 18\u0022 Box (RTP) <br>12: 20<br>12: 20<br>12: 20<br>12: 25<br>12: 30<br>0: 0<br>0: 0<br>"},{"date":"2014-11-09T00:00:00","Complex 1":1560,"tooltip":"Squat - 18\u0022 Box (RTP) <br>12: 20<br>12: 25<br>12: 25<br>12: 30<br>12: 30<br>0: 0<br>0: 0<br>"},{"date":"2014-11-16T00:00:00","Complex 1":2220,"tooltip":"Squat - 18\u0022 Box (RTP) <br>12: 30<br>12: 35<br>12: 40<br>12: 40<br>12: 40<br>0: 0<br>0: 0<br>"},{"date":"2015-01-31T00:00:00","Complex 1":240,"tooltip":"Split Squat - 18in - Barbell <br>2: 20<br>2: 25<br>2: 25<br>2: 25<br>2: 25<br>0: 0<br>0: 0<br>"},{"date":"2015-02-18T00:00:00","Complex 1":280,"tooltip":"Split Squat - 18in - Barbell <br>2: 20<br>2: 30<br>2: 30<br>2: 30<br>2: 30<br>0: 0<br>0: 0<br>"},{"date":"2015-03-28T00:00:00","Complex 1":830,"tooltip":"Squat - Front - Barbell <br>5: 25<br>5: 30<br>5: 37<br>5: 37<br>5: 37<br>0: 0<br>0: 0<br>"},{"date":"2015-04-08T00:00:00","Complex 1":451,"tooltip":"Squat - Front - Barbell <br>5: 38<br>3: 40<br>1: 47<br>1: 47<br>1: 47<br>0: 0<br>0: 0<br>"},{"date":"2015-04-22T00:00:00","Complex 1":0,"tooltip":"Squat - Front - Barbell <br>5: 0<br>3: 0<br>1: 0<br>1: 0<br>1: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-05-06T00:00:00","Complex 1":830,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>3: 50<br>3: 50<br>3: 55<br>3: 55<br>0: 0<br>0: 0<br>"},{"date":"2015-05-16T00:00:00","Complex 1":875,"tooltip":"Squat - Front - Barbell <br>5: 25<br>5: 35<br>5: 35<br>5: 40<br>5: 40<br>0: 0<br>0: 0<br>"},{"date":"2015-05-20T00:00:00","Complex 1":570,"tooltip":"Deadlift - 3in - Barbell <br>5: 45<br>3: 50<br>1: 65<br>1: 65<br>1: 65<br>0: 65<br>0: 0<br>"},{"date":"2015-05-30T00:00:00","Complex 1":960,"tooltip":"Squat - Front - Barbell <br>5: 30<br>5: 42<br>5: 40<br>5: 40<br>5: 40<br>0: 0<br>0: 0<br>"},{"date":"2015-06-06T00:00:00","Complex 1":950,"tooltip":"Squat - Front - Barbell <br>5: 30<br>5: 40<br>5: 40<br>5: 40<br>5: 40<br>0: 0<br>0: 0<br>"},{"date":"2015-06-13T00:00:00","Complex 1":900,"tooltip":"Squat - Front - Barbell <br>5: 25<br>5: 35<br>5: 40<br>5: 40<br>5: 40<br>0: 0<br>0: 0<br>"},{"date":"2015-07-11T00:00:00","Complex 1":557,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>3: 55<br>1: 55<br>1: 70<br>1: 67<br>0: 62<br>0: 0<br>"},{"date":"2015-07-18T00:00:00","Complex 1":1335,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>5: 50<br>5: 60<br>5: 60<br>5: 57<br>0: 0<br>0: 0<br>"},{"date":"2015-07-29T00:00:00","Complex 1":1150,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>5: 45<br>5: 50<br>5: 50<br>5: 45<br>0: 0<br>0: 0<br>"},{"date":"2015-08-05T00:00:00","Complex 1":1250,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>5: 45<br>5: 50<br>5: 55<br>5: 60<br>0: 0<br>0: 0<br>"},{"date":"2015-08-15T00:00:00","Complex 1":535,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>3: 50<br>1: 60<br>1: 60<br>1: 65<br>0: 65<br>0: 0<br>"},{"date":"2015-09-12T00:00:00","Complex 1":570,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>3: 55<br>1: 70<br>1: 70<br>1: 65<br>0: 65<br>0: 0<br>"}]},{"name":"Alexa Bartlett","Complex 2":[{"date":"2014-02-12T00:00:00","Complex 2":595,"tooltip":"Squat - Front <br>8: 15<br>5: 20<br>5: 20<br>5: 25<br>5: 30<br>0: 0<br>0: 0<br>"},{"date":"2014-02-19T00:00:00","Complex 2":180,"tooltip":"Z - Archive - 1 Leg Deadlift - 3in <br>6: 6<br>6: 6<br>6: 6<br>6: 6<br>6: 6<br>0: 0<br>0: 0<br>"},{"date":"2014-02-26T00:00:00","Complex 2":392,"tooltip":"Z - Archive - 1 Leg Deadlift - 3in <br>8: 5<br>8: 11<br>8: 11<br>8: 11<br>8: 11<br>0: 0<br>0: 0<br>"},{"date":"2014-03-12T00:00:00","Complex 2":741,"tooltip":"Squat - Front <br>8: 30<br>5: 30<br>3: 39<br>3: 39<br>3: 39<br>0: 0<br>0: 0<br>"},{"date":"2014-04-02T00:00:00","Complex 2":560,"tooltip":"Squat - Front <br>8: 20<br>5: 20<br>5: 20<br>5: 20<br>5: 20<br>0: 0<br>0: 0<br>"},{"date":"2014-04-26T00:00:00","Complex 2":180,"tooltip":"Squat - Front <br>5: 15<br>3: 15<br>1: 15<br>1: 15<br>1: 15<br>1: 15<br>0: 0<br>"},{"date":"2014-05-07T00:00:00","Complex 2":335,"tooltip":"Squat - Front <br>5: 10<br>3: 20<br>3: 25<br>3: 25<br>3: 25<br>0: 0<br>0: 0<br>"},{"date":"2014-05-17T00:00:00","Complex 2":320,"tooltip":"Squat - Front <br>5: 16<br>3: 20<br>3: 20<br>3: 20<br>3: 20<br>0: 0<br>0: 0<br>"},{"date":"2014-06-02T00:00:00","Complex 2":852,"tooltip":"1 Leg Hip Thrust - Floor <br>12: 10<br>12: 10<br>12: 17<br>12: 17<br>12: 17<br>0: 0<br>0: 0<br>"},{"date":"2014-06-25T00:00:00","Complex 2":600,"tooltip":"1 Leg Hip Thrust - Floor <br>12: 0<br>12: 0<br>12: 15<br>12: 15<br>12: 20<br>0: 0<br>0: 0<br>"},{"date":"2014-07-02T00:00:00","Complex 2":400,"tooltip":"1 Leg Hip Thrust - Floor <br>10: 10<br>10: 10<br>10: 10<br>10: 10<br>10: 0<br>0: 0<br>0: 0<br>"},{"date":"2014-07-13T00:00:00","Complex 2":120,"tooltip":"1 Leg Hip Thrust - Floor <br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>10: 12<br>0: 0<br>0: 0<br>"},{"date":"2014-07-22T00:00:00","Complex 2":530,"tooltip":"1 Leg Hip Thrust - Floor <br>10: 0<br>10: 15<br>10: 15<br>10: 15<br>10: 8<br>0: 0<br>0: 0<br>"},{"date":"2014-08-26T00:00:00","Complex 2":600,"tooltip":"1 Leg Hip Thrust - Floor <br>12: 10<br>12: 10<br>12: 10<br>12: 10<br>12: 10<br>0: 0<br>0: 0<br>"},{"date":"2014-08-30T00:00:00","Complex 2":700,"tooltip":"1 Leg Hip Thrust - Floor <br>10: 10<br>10: 15<br>10: 15<br>10: 15<br>10: 15<br>0: 0<br>0: 0<br>"},{"date":"2014-09-03T00:00:00","Complex 2":700,"tooltip":"1 Leg Hip Thrust - Floor <br>10: 10<br>10: 15<br>10: 15<br>10: 15<br>10: 15<br>0: 1<br>0: 0<br>"},{"date":"2014-09-17T00:00:00","Complex 2":0,"tooltip":"1 Leg Squat - 21in (RTP) <br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>0: 0<br>0: 0<br>"},{"date":"2014-09-24T00:00:00","Complex 2":0,"tooltip":"1 Leg Squat - 21in (RTP) <br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>0: 0<br>0: 0<br>"},{"date":"2014-10-11T00:00:00","Complex 2":10,"tooltip":"1 Leg Squat - 21in (RTP) <br>10: 1<br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>0: 1<br>0: 0<br>"},{"date":"2014-10-15T00:00:00","Complex 2":0,"tooltip":"1 Leg Squat - 21in (RTP) <br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>10: 0<br>0: 0<br>0: 0<br>"},{"date":"2014-10-22T00:00:00","Complex 2":1540,"tooltip":"Deadlift - 6\u0022 (RTP) <br>10: 30<br>10: 30<br>10: 30<br>10: 30<br>10: 34<br>0: 0<br>0: 0<br>"},{"date":"2014-10-29T00:00:00","Complex 2":2100,"tooltip":"Deadlift - 6\u0022 (RTP) <br>12: 35<br>12: 35<br>12: 35<br>12: 35<br>12: 35<br>0: 0<br>0: 0<br>"},{"date":"2014-11-09T00:00:00","Complex 2":2100,"tooltip":"Deadlift - 6\u0022 (RTP) <br>12: 35<br>12: 35<br>12: 35<br>12: 35<br>12: 35<br>0: 0<br>0: 0<br>"},{"date":"2014-11-16T00:00:00","Complex 2":1980,"tooltip":"Deadlift - 6\u0022 (RTP) <br>12: 25<br>12: 35<br>12: 35<br>12: 35<br>12: 35<br>0: 0<br>0: 0<br>"},{"date":"2015-01-31T00:00:00","Complex 2":525,"tooltip":"Squat - Front - Barbell <br>5: 30<br>5: 25<br>5: 25<br>5: 25<br>0: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-02-18T00:00:00","Complex 2":775,"tooltip":"Squat - Front - Barbell <br>5: 35<br>5: 40<br>5: 40<br>5: 40<br>0: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-03-28T00:00:00","Complex 2":1225,"tooltip":"Deadlift - 3in - Barbell <br>5: 45<br>5: 50<br>5: 50<br>5: 50<br>5: 50<br>0: 0<br>0: 0<br>"},{"date":"2015-04-08T00:00:00","Complex 2":565,"tooltip":"Deadlift - 3in - Barbell <br>5: 45<br>3: 55<br>1: 60<br>1: 60<br>1: 55<br>1: 0<br>0: 0<br>"},{"date":"2015-04-22T00:00:00","Complex 2":0,"tooltip":"Deadlift - 3in - Barbell <br>5: 0<br>3: 0<br>1: 0<br>1: 0<br>1: 0<br>1: 0<br>0: 0<br>"},{"date":"2015-05-06T00:00:00","Complex 2":565,"tooltip":"Squat - Front - Barbell <br>5: 35<br>3: 40<br>3: 45<br>3: 45<br>0: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-05-16T00:00:00","Complex 2":1275,"tooltip":"Deadlift - 3in - Barbell <br>5: 45<br>5: 45<br>5: 55<br>5: 55<br>5: 55<br>0: 0<br>0: 0<br>"},{"date":"2015-05-20T00:00:00","Complex 2":460,"tooltip":"Squat - Front - Barbell <br>5: 39<br>3: 41<br>1: 46<br>1: 50<br>1: 46<br>1: 0<br>0: 0<br>"},{"date":"2015-05-30T00:00:00","Complex 2":1250,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>5: 45<br>5: 55<br>5: 55<br>5: 55<br>0: 0<br>0: 0<br>"},{"date":"2015-06-06T00:00:00","Complex 2":1350,"tooltip":"Deadlift - 3in - Barbell <br>5: 40<br>5: 50<br>5: 60<br>5: 60<br>5: 60<br>0: 0<br>0: 0<br>"},{"date":"2015-06-13T00:00:00","Complex 2":1125,"tooltip":"Deadlift - 3in - Barbell <br>5: 45<br>5: 45<br>5: 45<br>5: 45<br>5: 45<br>0: 0<br>0: 0<br>"},{"date":"2015-07-11T00:00:00","Complex 2":454,"tooltip":"Squat - Front - Barbell <br>5: 20<br>3: 59<br>1: 59<br>1: 59<br>1: 59<br>1: 0<br>0: 0<br>"},{"date":"2015-07-18T00:00:00","Complex 2":550,"tooltip":"Squat - Front - Barbell <br>5: 25<br>5: 25<br>5: 30<br>5: 30<br>0: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-07-29T00:00:00","Complex 2":450,"tooltip":"Squat - Front - Barbell <br>5: 20<br>5: 20<br>5: 25<br>5: 25<br>0: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-08-05T00:00:00","Complex 2":140,"tooltip":"Split Squat - 18in - Barbell <br>2: 15<br>2: 15<br>2: 20<br>2: 20<br>0: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-08-15T00:00:00","Complex 2":390,"tooltip":"Split Squat - 18in - Barbell <br>6: 20<br>6: 15<br>6: 15<br>6: 15<br>0: 0<br>0: 0<br>0: 0<br>"},{"date":"2015-09-12T00:00:00","Complex 2":400,"tooltip":"Squat - Front - Barbell <br>5: 35<br>3: 35<br>1: 40<br>1: 40<br>1: 40<br>1: 0<br>0: 0<br>"}]}];

scan_data = scan_data[0];
injury_data = injury_data[0];
event_data = event_data[0];
    minDate = new Date();
    maxDate = new Date();
    minDate = minDate.setDate(minDate.getDate() - 70);
    maxDate = maxDate.setDate(maxDate.getDate() + 7);
if(scan_data.load==""){
    scan_data=null;
}
      //This is to set the json object names dynamic
    if(typeof colors=='undefined' || colors=='' || colors==null){
            colors = ['blue','red','green','orange','gray'];
    }
    var TICKS = {
        X: 5,
        Y: 5
    };
    var TOOLTIP = function(d,name,date_time){
        if(typeof(d.tooltip)=='undefined'){
            d.tooltip = ' ';
        }
        return '<strong>'+name+':</strong> <span style=\'color:white\'>' + d[name]+ '</span><br><span>'+ d[date_time].getFullYear() + '-' +(d[date_time].getMonth()+1) +'-'+d[date_time].getDate() +'</span><br>'+d.tooltip;}
    var datatot = [];
//    scan_data =  { "load": [ 45, 40, 34 ], "explode": [ 37, 36, 41 ], "drive": [ 28, 30, 50 ], "date": [ "2015-07-05", "2015-07-07", "2015-7-10" ], "weight": [ "184.12", "186.02", "152.24" ], "signature": [ "Weak Explode", "Weak Load", "Weak Load" ] };
    var parse_scan_date = d3.time.format("%Y-%m-%d").parse;
    var min = 1000000;
    var max = -100000;
    if( scan_data !=null ){
        for (j = 0; j < scan_data.date.length; j++) {
                scan_data.date[j] = parse_scan_date(scan_data.date[j]);
                if(minDate>scan_data.date[j]){
                        minDate = scan_data.date[j];
                }
                if(maxDate<scan_data.date[j]){
                        maxDate = scan_data.date[j];
                }

        }
    }
    var arr_legend_labels = [];
    for( i=0; i<data.length;i++){
        var data_name = Object.keys(data[i]);
        datatot[i]=data[i][data_name[1]];
        if(name_or_data=='name'){
            arr_legend_labels.push(data[i].name);
        }
        else{
            arr_legend_labels.push(data_name[1]);
        }
        if(typeof colors[i]=='undefined'){
            colors[i]=getRandomColor();
        }
    }
//parseDate is function for dealing with datetimes from the Database do not need to change them from SQL statement
    var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;   
//    var fact_name = Object.keys(data[0]);

if(datatot[0]!=null){
    var keys = Object.keys(datatot[0][0]);
    var name = keys[1];
    var date_time = keys[0];

//else{
//    keys=["date","name"];
//}
 
    //set min and max for y axis set high value for min and low value for max so that it will be overwritten
    var min = 1000000;
    var max = -100000;
//    var minDate = parseDate(datatot[0][0][date_time]);
//    var maxDate = parseDate(datatot[0][0][date_time]);
//Set min and max for xaxis and yaxis
    for( i=0; i<datatot.length;i++){
        var keys = Object.keys(datatot[i][0]);
        var name = keys[1];
        var date_time = keys[0];
        for (j = 0; j < datatot[i].length; j++) {
            datatot[i][j][name] = parseFloat(datatot[i][j][name]).toFixed(2);
            if(parseFloat(datatot[i][j][name])<min){
                min = datatot[i][j][name];
            }
            if(parseFloat(datatot[i][j][name])>max){
                max = datatot[i][j][name];
            }
            datatot[i][j][date_time] = parseDate(datatot[i][j][date_time]);
            if(minDate>datatot[i][j][date_time]){
                minDate = datatot[i][j][date_time];
            }
            if(maxDate<datatot[i][j][date_time]){
                maxDate = datatot[i][j][date_time];
            }

        }
    }
//Give padding to the yaxis 
    var range = (parseFloat(max)-parseFloat(min))*.05;
    
    if(range==0){
        max=parseFloat(max)+1;
        min=parseFloat(min)-1;
    }
    else{
        max = parseFloat(max)+range;
        min = parseFloat(min)-range;
    }
}
//    minDate = minDate.setDate(minDate.getDate() - 70);
//    maxDate = maxDate.setDate(maxDate.getDate() + 7);
//select the dom element named visualisation
    var vis = d3.select("#visualisation");
    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,minDate,maxDate,TICKS);
    xScale = scales.xScale;
    yScale = scales.yScale;

//This svg element goes on top of vis to keep the navigation contained inside the axises
    var graphSVG = vis
        .append("svg:svg")
        .attr('width', WIDTH-MARGINS.right-MARGINS.left)
        .attr('height',HEIGHT-MARGINS.top-MARGINS.bottom)
        .attr('x',MARGINS.left)
        .attr('y',MARGINS.top)
        .attr('class','graphSVG');
//ADD TITLE
    vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text(TITLE);
    
//add injury data
//injury_data = [{"nid":"37118","vid":"389477","title":"Richard Heal","field_ir_athlete_uid":"4","date_injured":"2015-05-05T00:00:00","date_cleared":"","area_injured":"Calf - L","field_ir_clear_criteria_value":null,"field_ir_clear_rft_value":null,"field_ir_clear_to_train_value":"2013-05-06 00:00:00","field_ir_description_value":"Bad tear.","field_ir_injury_date_value":"2013-03-01T00:00:00","field_ir_severity_value":"3","field_ir_treat_start_value":"2002-08-01T00:00:00","field_ir_treatment_value":"In boot for 6 weeks.. Then took easy for another 2-3 weeks.","field_ir_sc_restrict_value":"None.","field_ir_play_restrict_value":"Don't play until out of boot. Then once a week for 2 weeks.","field_ir_disposition_value":null,"field_ir_dor_date_value":"2013-05-06T00:00:00","field_ir_play_status_value":null}];
       //formatting date for injury data
    var parseDate1 = d3.time.format("%Y-%m-%d %H:%M:%S").parse; 
    if(injury_data!=null){
       if(injury_data[0]!=null){
            for (j = 0; j < injury_data.length; j++) {
                if(Object.prototype.toString.call(injury_data[j].date_injured ) !== '[object Date]'){
                    injury_data[j].date_injured = parseDate(injury_data[j].date_injured);
                }
                if(Object.prototype.toString.call(injury_data[j].date_cleared ) !== '[object Date]'){
                    if(injury_data[j].date_cleared!=null){
                        injury_data[j].date_cleared = parseDate1(injury_data[j].date_cleared);
                    }
                }
            }
        }
    }
    function add_injury_data(injury_data){
            var tip = d3.tip()
                .attr('class', 'd3-tip')
                .offset([-10, 0])
                .html( function(d){
                            if(d.date_cleared==null){date_cleared = "<br>Date Cleared: Still Injured"; }   
                            else{date_cleared ="<br>Date Cleared: "+d.date_cleared.getFullYear()+ '-' +(d.date_cleared.getMonth()+1) +'-'+d.date_cleared.getDate()}
                            return "Date Injured: "+d.date_injured.getFullYear()+ '-' +(d.date_injured.getMonth()+1) +'-'+d.date_injured.getDate()
                                        +date_cleared+" <br>"+d.area_injured;
                    }
            );
            graphSVG.call(tip);
            graphSVG.selectAll("rect")
                .data(injury_data)
                .enter()
                .append("rect")
                .attr("class","injury")
                .attr("x",function(d){ 
                            if(xScale(d.date_injured)<MARGINS.left){first_value=0;}
                            else{first_value = xScale(d.date_injured)-MARGINS.left;}
                            return first_value;}) // start rectangle on the good position
                .attr("y", 0) // no vertical translate
                .attr("width", function(d){
                                    if(d.date_cleared===null){ second_value=WIDTH-MARGINS.right;}
                                    else{second_value = xScale(d.date_cleared);}
                                    if(xScale(d.date_injured)<MARGINS.left){first_value=0;}
                                    else{first_value = xScale(d.date_injured);}
                                    if(second_value-first_value<0){return 0;}
                                    else{     return (second_value-first_value);}}) // correct size
                .attr("height", HEIGHT-MARGINS.top-MARGINS.bottom) // full height
                .attr("fill", "red")
                .attr("opacity",.15)
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);
    }
    if(injury_data!=null){
        if(injury_data[0]!=null){
            add_injury_data(injury_data);
        }
    }

//      Adding the navigation at the bottom 
//var event_data=null;
    function add_event_data(event_data){
        if(event_data.length>=1 || typeof event_data=='undefined'){
            for (j = 0; j < event_data.length; j++) {
                if(Object.prototype.toString.call(event_data[j].field_ev_date_value) !== '[object Date]'){
                    event_data[j].field_ev_date_value = parseDate(event_data[j].field_ev_date_value);
                }
            }
            var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html( function(d){
                        if(parseInt(d.field_ev_team_score_value)>parseInt(d.field_ev_opponent_score_value)){result =  "Win";}
                        if(parseInt(d.field_ev_team_score_value)===parseInt(d.field_ev_opponent_score_value)){result = "Tie";}
                        if(parseInt(d.field_ev_team_score_value)<parseInt(d.field_ev_opponent_score_value)){result =  "Loss";}
                    return d.field_ev_date_value.getFullYear()+ '-' +(d.field_ev_date_value.getMonth()+1) +'-'+d.field_ev_date_value.getDate()+" "+
                            result+"<br>"+
                            d.field_ev_team_value+": "+d.field_ev_team_score_value+" to "+d.field_ev_opponent_value+": "+d.field_ev_opponent_score_value;

                    }
            );
            graphSVG.call(tip);

            vis.selectAll("events")
                    .data(event_data)
                    .enter()
                    .append("text")
                    .attr("id", "eventcircle")
                    .attr("class","tipCircleEvent")
                    .attr("x",function(d){ 


                                if(xScale(d.field_ev_date_value)>WIDTH-MARGINS.right || xScale(d.field_ev_date_value)<MARGINS.left ){
                                    return -15; 
                                }
                                else{
                                    return xScale(d.field_ev_date_value);
                                }
                            })
                    .attr("y",yScale(min)+(MARGINS.top/2))
                    .text(function(d){
                        if(parseInt(d.field_ev_team_score_value)>parseInt(d.field_ev_opponent_score_value)){return "W";}
                        if(parseInt(d.field_ev_team_score_value)===parseInt(d.field_ev_opponent_score_value)){return "T";}
                        if(parseInt(d.field_ev_team_score_value)<parseInt(d.field_ev_opponent_score_value)){return "L";}
                    })
                    .style('opacity',1)
                    .style('fill',"#B8860B")
                    .attr("class","event")
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide);
        }
    }
//    if(typeof event_data!="undefined"){
    if(event_data!=null){
        if(event_data[0]!=null){
            add_event_data(event_data);
        }
    }
    navHeight = 50 ;
        redrawChart=function() {       
            xScale.domain(viewport.empty() ? navXScale.domain() : viewport.extent());
                d3.selectAll("rect.scan").remove();
                d3.selectAll("text.event").remove();
                d3.selectAll("rect.injury").remove();
                d3.selectAll("circle.tipcircle").remove();
//                add_injury_data(injury_data);
            if(injury_data!=null){
                if(injury_data[0]!=null){
                    add_injury_data(injury_data);
                }
            }
            if(event_data!=null){
                if(event_data[0]!=null){
                    add_event_data(event_data);
                }
            }
                if(scan_data !=null){
                    add_movement_signature_to_graph(vis,graphSVG,scan_data,xScale,WIDTH,HEIGHT,MARGINS,true);
                }
                if(datatot[0]!=null){
                    for( i=0; i<datatot.length;i++){
                        var keys = Object.keys(datatot[i][0]);
                        var name = keys[1];
                        var date_time = keys[0];
                        d3.selectAll("circle.tipcircle"+"line"+i).remove();
                        d3.select("#line"+i).remove();
                        drawline(graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[i],"line"+i,TOOLTIP,linetype);
                    }
                }
      
                vis.select('.x.axis').call(xAxis);
            }

    navigation(vis,graphSVG,datatot,navHeight,WIDTH,HEIGHT,MARGINS,minDate,maxDate,xScale,yScale,name,date_time,colors,TOOLTIP,redrawChart);
        //adding movement signatures to chart

        if(scan_data !=null){
            add_movement_signature_to_graph(vis,graphSVG,scan_data,xScale,WIDTH,HEIGHT,MARGINS,true);
        }
        if(datatot[0]!=null){
            for( i=0; i<datatot.length;i++){
                var keys = Object.keys(datatot[i][0]);
                var name = keys[1];
                var date_time = keys[0];
                drawline_legend(vis,graphSVG,xScale,yScale,datatot[i],HEIGHT,WIDTH,colors[i],name,date_time,0+i*20,arr_legend_labels[i],"line"+i,MARGINS,TOOLTIP,linetype);
            }
        }

    change_date = function(){
            var today = new Date();
            var date1 = new Date().setDate(today.getDate()+1);
            var date2 =  new Date().setDate(today.getDate()-90);
            xScale.domain([new Date(date2), d3.time.day.offset(new Date(date1), 1)]);
            function updateViewportFromChart() {
                if ((xScale.domain()[0] <= minDate) && (xScale.domain()[1] >= maxDate)) {

                    viewport.clear();
                }
                else {

                    viewport.extent(xScale.domain());
                }

                navChart.select('.viewport').call(viewport);
            }
    //    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,date1,date2,TICKS);
            updateViewportFromChart();
            redrawChart();
        }

    change_date();

}


/* 
 * Function to initialize the chart
 * @parameter WIDTH is the width of graph in pixels
 * @parameter HEIGHT is the height of graph in pixels
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter TITLE is string of what the title should say.  Can use HTML to style and format
 * @parameter TOOLTIP is function to display the data for hovering over the lines
 * @parameter arr_legend_labels array of strings for the labels to the colors in the legend
 * @parameter datatot array of data.  Should be in the following format: 
 *                  datatot = [[{fact_date:sqlformatdatetime,fact_value:Value_here}],[{fact_date:sqlformatdatetime,fact_value:Value_here}]]
 * @parameter colors is an array of colors if no color is specified the line will be randomly assigned some color.
 * @parameter name_or_data string of 'athlete' or 'data'  to determine the legend labels.
 */
function InitChartBars(WIDTH,HEIGHT,MARGINS,TITLE,data,colors,name_or_data,linetype) {
    linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
    //This is to set the json object names dynamic
    if(typeof colors=='undefined' || colors=='' || colors==null){
            colors = ['blue','red','#00FF00','orange','gray'];
    }
    var TICKS = {
        X: 5,
        Y: 5
    };
    var TOOLTIP = function(d,name,date_time){
        if(typeof(d.tooltip)=='undefined'){
            d.tooltip = ' ';
        }
//        var formatAsPercentage = d3.format(".1%");
        return '<span>Count: '+d.Count+'</span><br><strong>'+name+':</strong> <span style=\'color:white\'>' + formatAsPercentage(d[name])+ '</span><br><span>Week of:'+ d[date_time].getFullYear() + '-' +(d[date_time].getMonth()+1) +'-'+d[date_time].getDate() +'</span><br>'+d.tooltip;}
    var datatot = [];
    var arr_legend_labels = [];
    for( i=0; i<data.length;i++){
        var data_name = Object.keys(data[i]);
        datatot[i]=data[i][data_name[1]];
        if(name_or_data=='name'){
            arr_legend_labels.push(data[i].name);
        }
        else{
            arr_legend_labels.push(data_name[1]);
        }
        if(typeof colors[i]=='undefined'){
            colors[i]=getRandomColor();
        }
    }
    var fact_name = Object.keys(data[0]);

    var keys = Object.keys(datatot[0][0]);
    var name = keys[1];
    var date_time = keys[0];
    //console.log(date_time);
    //parseDate is function for dealing with datetimes from the Database do not need to change them from SQL statement
    var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;    
    //set min and max for y axis set high value for min and low value for max so that it will be overwritten
    var min = 1000000;
    var max = -100000;
    var minDate = parseDate(datatot[0][0][date_time]);
    var maxDate = parseDate(datatot[0][0][date_time]);
//Set min and max for xaxis and yaxis
    for( i=0; i<datatot.length;i++){
        if(datatot[i]!=null){
            var keys = Object.keys(datatot[i][0]);
            var name = keys[1];
            var date_time = keys[0];
            for (j = 0; j < datatot[i].length; j++) {

                datatot[i][j][name] = parseFloat(datatot[i][j][name]).toFixed(3);
                if(parseFloat(datatot[i][j][name])<min){
                    min = parseFloat(datatot[i][j][name]);
                }
                if(parseFloat(datatot[i][j][name])>max){
                    max = parseFloat(datatot[i][j][name]);
                }
                datatot[i][j][date_time] = parseDate(datatot[i][j][date_time]);
                if(minDate>datatot[i][j][date_time]){
                    minDate = datatot[i][j][date_time];
                }
                if(maxDate<datatot[i][j][date_time]){
                    maxDate = datatot[i][j][date_time];
                }

            }
        }
    }
//Give padding to the yaxis 
    var range = (parseFloat(max)-parseFloat(min))*.05;
    if(range==0){
        max=max+1;
        min=min-1;
    }
    else{
        max = parseFloat(max)+range;
        min = parseFloat(min)-range;
    }
    min = 0;
    max = 1;
   // console.log(minDate);
   // console.log(maxDate);
    minDate = minDate.setDate(minDate.getDate() - 70);
    maxDate = maxDate.setDate(maxDate.getDate() + 21);
//select the dom element named visualisation
    var vis = d3.select("#visualisation");
     yScale = d3.scale.linear().range([HEIGHT-MARGINS.bottom , MARGINS.top]).domain([min,max ]),
    xScale = d3.time.scale().rangeRound([MARGINS.left, WIDTH - MARGINS.right])
        .domain([new Date(minDate), d3.time.day.offset(new Date(maxDate), 1)]);
                
    var formatAsPercentage = d3.format(".1%");
//Create the xaxis TICKS.X is the number of vertical lines to draw on graph and TICKS.Y is horizontal lines to draw on graph  
    xAxis = d3.svg.axis()
        .scale(xScale)
        .tickPadding(10)
        .ticks(TICKS.X);
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(TICKS.Y)
        .tickFormat(formatAsPercentage);
    function make_x_axis() {        
        return d3.svg.axis()
            .scale(xScale)
            .ticks(TICKS.X)
            .orient("bottom");
    };
    function make_y_axis() {        
            return d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(TICKS.Y);
    };
//add grid to the graph
    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + (HEIGHT-MARGINS.bottom) + ")")
            .call(make_x_axis()
                    .tickSize(-(HEIGHT-MARGINS.top-MARGINS.bottom), 0, 0)
                    .tickFormat("")
            );

    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(" + MARGINS.left + ",0)")
            .call(make_y_axis()
                    .tickSize(-(WIDTH-MARGINS.right-MARGINS.left), 0, 0)
                    .tickFormat("")
            );
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis)
        .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em");
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);


    scales = {xScale:xScale,yScale:yScale};
//    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,minDate,maxDate,TICKS);
    xScale = scales.xScale;
    yScale = scales.yScale;
//This svg element goes on top of vis to keep the navigation contained inside the axises
    var graphSVG = vis
        .append("svg:svg")
        .attr('width', WIDTH-MARGINS.right-MARGINS.left)
        .attr('height',HEIGHT-MARGINS.top-MARGINS.bottom)
        .attr('x',MARGINS.left)
        .attr('y',MARGINS.top)
        .attr('class','graphSVG');
//ADD TITLE
    vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text(TITLE);
    

//      Adding the navigation at the bottom
    redrawChart=function() {

                    xScale.domain(viewport.empty() ? navXScale.domain() : viewport.extent());
                for( i=0; i<datatot.length;i++){
                    if(datatot[i]!=null){
                        var keys = Object.keys(datatot[i][0]);
                        var name = keys[1];
                        var date_time = keys[0];
                        d3.selectAll("circle.tipcircle"+"line"+i).remove();
                        d3.select("#line"+i).remove();
                        d3.selectAll("#rect").remove();
                        d3.selectAll(".d3-tip").remove();
                        drawbars(WIDTH,HEIGHT,graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[0],'rect',TOOLTIP);
//                        drawline(graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[i],"line"+i,TOOLTIP,linetype);
                    }
                }
      
                vis.select('.x.axis').call(xAxis);
            }
    navHeight = 50 ;

    navigation(vis,graphSVG,datatot,navHeight,WIDTH,HEIGHT,MARGINS,minDate,maxDate,xScale,yScale,name,date_time,colors,TOOLTIP,redrawChart);
    for( i=0; i<datatot.length;i++){
        if(datatot[i]!=null){
            var keys = Object.keys(datatot[i][0]);
            var name = keys[1];
            var date_time = keys[0];
        }
        drawbars(WIDTH,HEIGHT,graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[0],'rect',TOOLTIP);
    }
        change_date = function(){
            date1 = new Date(document.getElementById("datepicker_to").value);
            date2 = new Date(document.getElementById("datepicker_from").value);
            xScale.domain([date2, d3.time.day.offset(date1, 1)]);
            function updateViewportFromChart() {
                if ((xScale.domain()[0] <= minDate) && (xScale.domain()[1] >= maxDate)) {

                    viewport.clear();
                }
                else {

                    viewport.extent(xScale.domain());
                }

                navChart.select('.viewport').call(viewport);
            }
    //    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,date1,date2,TICKS);
            updateViewportFromChart();
            redrawChart();
        }

    change_date();
}

function add_data_to_graph(data,newdata,colors,newcolor,legend_labels,newlegend_labels){
    data.push(newdata);
    colors.push(newcolor);
    legend_labels.push(newlegend_labels);
}
function set_fact_data(){
    var full_url = document.URL; // Get current url
    var url_array = full_url.split('/') // Split the string into an array with / as separator
    var metafact=$('#meta_fact_drop option:selected').val(); 
    var athlete=$('#athlete_drop option:selected').val();
    $('#meta_fact_drop option:selected').val(metafact);
    window.location.assign("http://"+window.location.hostname+"/charts_cause_effect/"+athlete+"/"+metafact); 
}
/* 
 * Function to initialize the chart
 * @parameter WIDTH is the width of graph in pixels
 * @parameter HEIGHT is the height of graph in pixels
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter TITLE is string of what the title should say.  Can use HTML to style and format
 * @parameter TOOLTIP is function to display the data for hovering over the lines
 * @parameter arr_legend_labels array of strings for the labels to the colors in the legend
 * @parameter datatot array of data.  Should be in the following format: 
 *                  datatot = [[{fact_date:sqlformatdatetime,fact_value:Value_here}],[{fact_date:sqlformatdatetime,fact_value:Value_here}]]
 * @parameter colors is an array of colors if no color is specified the line will be randomly assigned some color.
 * @parameter name_or_data string of 'athlete' or 'data'  to determine the legend labels.
 */
function draw_bar_chart(htmlElement,dataset,width,height,barPadding,margin,colors,labels,weight,date,max){
    if(typeof(max)=='undefined'){
        max=0;
        var max = d3.max(dataset,function(d){return d;});
        if(max==0){
            max=20;
        }
    }

    max = max+20;
    if(typeof(svg)!='undefined'){
        svg.selectAll("*").remove();
    }

var scale = d3.scale.linear().domain([0,max]).range([height-margin.Top-margin.Bottom,0]);
var yAxis = d3.svg.axis()
        .scale(scale)
        .orient("left")
        .ticks(5);
    function make_y_axis() {        
            return d3.svg.axis()
                    .scale(scale)
                    .orient("left")
                    .ticks(5);
    };
var svg = d3.select(htmlElement)
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    svg.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(" + margin.Left + ","+margin.Top+")")
            .call(make_y_axis()
                    .tickSize(-(width-margin.Right-margin.Left), 0, 0)
                    .tickFormat("")
            );
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
      return 10+i * ((width-margin.Left-margin.Right-20) / dataset.length)+margin.Left;
      })
   .attr("y",function(d,i){
		return scale(d)+margin.Top;
	})
   .attr("height",function(d){
		return (height-margin.Bottom)-margin.Top-scale(d);
    })
    .attr("width", (width-margin.Left-margin.Right-20) / dataset.length - barPadding)
    .attr("fill",function(d,i){
					return colors[i];
     })
;
	
    svg.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (margin.Left) + ","+margin.Top+")")
        .call(yAxis);
var legend = svg.selectAll('.legend')
  .data(dataset)
  .enter()
  .append('g')
  .attr('class', 'legend')
  .attr('transform', function(d, i) {
    var height = 25;
    var offset =  height-35 ;
    var horz = margin.Right+(2 * 40*i);
    var vert = height - offset;
    return 'translate(' + horz + ',' +vert+ ')';
  });
  legend.append('rect')
  .attr('width', 10)
  .attr('height', 10)
  .style('fill', function(d,i){
						return colors[i];
  })
  .style('stroke', function(d,i){
					return colors[i];
					});
  legend.append('text')
  .attr('x', 15)
  .attr('y', 10)
  .text(function(d,i) { 
						return labels[i];
						});
  svg.append('text')
	.attr("class","graph-title")
	.attr("text-anchor", "middle")
	.attr("x",(width)/2)
	.attr("y",height-((margin.Bottom/3)*2))
	.attr("font-size","12")
	.text(date);
  svg.append('text')
	.attr("class","graph-title")
	.attr("text-anchor", "middle")
	.attr("x",(width)/2)
	.attr("y",height-(margin.Bottom/3))
	.attr("font-size","16")
	.text("Weight:"+weight);


}

function InitChartByName(WIDTH,HEIGHT,MARGINS,TITLE,data,colors,linetype,click) {
    linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
    //This is to set the json object names dynamic
    if(typeof colors=='undefined' || colors=='' || colors==null){
            colors = ['blue','red','#00FF00','orange','gray'];
    }
    var TICKS = {
        X: 5,
        Y: 5
    };
    var TOOLTIP = function(d,name,date_time){
        if(typeof(d.tooltip)=='undefined'){
            d.tooltip = ' ';
        }
        return '<strong>'+name+':</strong> <span style=\'color:white\'>' + d[name]+ '</span><br><span>'+ d[date_time].getFullYear() + '-' +(d[date_time].getMonth()+1) +'-'+d[date_time].getDate() +'</span><br>'+d.tooltip;
    }
    min = d3.min(data,function(d){
       return d3.min([d.load,d.explode,d.drive]); 
    });
    max = d3.max(data,function(d){
       return d3.max([d.load,d.explode,d.drive]); 
    });
    var parseDate = d3.time.format("%Y-%m-%d").parse; 
    for (j = 0; j < data.length; j++){
        data[j].date = parseDate(data[j].date);
    }
    var minDate = d3.min(data,function(d){
       return d.date; 
    }); 
    var maxDate = d3.max(data,function(d){
       return d.date; 
    });
    //give some room at the top and bottom of the graph
    max = max + 10;
    min = min-10;
//select the dom element named visualisation
    var vis = d3.select("#visualisation");
    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,minDate,maxDate,TICKS);
    xScale = scales.xScale;
    yScale = scales.yScale;
//This svg element goes on top of vis to keep the navigation contained inside the axises
    var graphSVG = vis
        .append("svg:svg")
        .attr('width', WIDTH-MARGINS.right-MARGINS.left)
        .attr('height',HEIGHT-MARGINS.top-MARGINS.bottom)
        .attr('x',MARGINS.left)
        .attr('y',MARGINS.top)
        .attr('class','graphSVG');
//ADD TITLE
    vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text(TITLE);
    

        drawline_legend(vis,graphSVG,xScale,yScale,data,HEIGHT,WIDTH,colors[0],"load","date",20,"Load","lineload",MARGINS,TOOLTIP,linetype,click);
        drawline_legend(vis,graphSVG,xScale,yScale,data,HEIGHT,WIDTH,colors[1],"explode","date",40,"Explode","lineexplode",MARGINS,TOOLTIP,linetype,click);
        drawline_legend(vis,graphSVG,xScale,yScale,data,HEIGHT,WIDTH,colors[2],"drive","date",60,"Drive","linedrive",MARGINS,TOOLTIP,linetype,click);
return graphSVG;
    
}

function InitChartByNameRightLeft(WIDTH,HEIGHT,MARGINS,TITLE,data,colors,linetype,htmlElement) {
    htmlElement = typeof htmlElement !== 'undefined' ? htmlElement : 'visualisation'; 
    linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
    //This is to set the json object names dynamic
    if(typeof colors=='undefined' || colors=='' || colors==null){
            colors = ['blue','red','#00FF00','orange','gray'];
    }
    var TICKS = {
        X: 5,
        Y: 5
    };
    var TOOLTIP = function(d,name,date_time){
        if(typeof(d.tooltip)=='undefined'){
            d.tooltip = ' ';
        }
        return '<strong>'+name+':</strong> <span style=\'color:white\'>' + d[name]+ '</span><br><span>'+ d[date_time].getFullYear() + '-' +(d[date_time].getMonth()+1) +'-'+d[date_time].getDate() +'</span><br>'+d.tooltip;
    }
    min = d3.min(data,function(d){
       return d3.min([d.left,d.right]); 
    });
    max = d3.max(data,function(d){
       return d3.max([d.left,d.right]); 
    });
    var parseDate = d3.time.format("%Y-%m-%d").parse; 
    for (j = 0; j < data.length; j++){
        data[j].date = parseDate(data[j].date);
    }
    var minDate = d3.min(data,function(d){
       return d.date; 
    }); 
    var maxDate = d3.max(data,function(d){
       return d.date; 
    });
    min=min-10;
    max=max+10;
//select the dom element named visualisation
    var vis = d3.select("#"+htmlElement);
    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,minDate,maxDate,TICKS);
    xScale = scales.xScale;
    yScale = scales.yScale;
//This svg element goes on top of vis to keep the navigation contained inside the axises
    var graphSVG = vis
        .append("svg:svg")
        .attr('width', WIDTH-MARGINS.right-MARGINS.left)
        .attr('height',HEIGHT-MARGINS.top-MARGINS.bottom)
        .attr('x',MARGINS.left)
        .attr('y',MARGINS.top)
        .attr('class','graphSVG');
//ADD TITLE
    vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text(TITLE);
    

        drawline_legend(vis,graphSVG,xScale,yScale,data,HEIGHT,WIDTH,colors[0],"left","date",20,"Left","lineleft",MARGINS,TOOLTIP,linetype);
        drawline_legend(vis,graphSVG,xScale,yScale,data,HEIGHT,WIDTH,colors[1],"right","date",40,"Right","lineright",MARGINS,TOOLTIP,linetype);
    
}

//        drawline_legend(vis,graphSVG,xScale,yScale,data,HEIGHT,WIDTH,colors[2],"drive","date",60,"drive","linedrive",MARGINS,TOOLTIP,linetype);


/* 
 * Function to initialize the chart
 * @parameter WIDTH is the width of graph in pixels
 * @parameter HEIGHT is the height of graph in pixels
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter TITLE is string of what the title should say.  Can use HTML to style and format
 * @parameter TOOLTIP is function to display the data for hovering over the lines
 * @parameter arr_legend_labels array of strings for the labels to the colors in the legend
 * @parameter datatot array of data.  Should be in the following format: 
 *                  datatot = [[{fact_date:sqlformatdatetime,fact_value:Value_here}],[{fact_date:sqlformatdatetime,fact_value:Value_here}]]
 * @parameter colors is an array of colors if no color is specified the line will be randomly assigned some color.
 * @parameter name_or_data string of 'athlete' or 'data'  to determine the legend labels.
 */
function InitChartBarsScan(WIDTH,HEIGHT,MARGINS,TITLE,data,colors,name_or_data) {
    //This is to set the json object names dynamic

    if(typeof colors=='undefined' || colors=='' || colors==null){
            colors = ['blue','red','#00FF00','orange','gray'];
    }
    var TICKS = {
        X: 5,
        Y: 5
    };
    var TOOLTIP = function(d,name,date_time){
        if(typeof(d.tooltip)=='undefined'){
            d.tooltip = ' ';
        }
//        var formatAsPercentage = d3.format(".1%");
        return '<strong>'+name+':</strong> <span style=\'color:white\'>' + d[name]+ '</span><br><span>Date:'+ d[date_time].getFullYear() + '-' +(d[date_time].getMonth()+1) +'-'+d[date_time].getDate() +'</span><br>'+d.tooltip;
    }
    var datatot = [];
    var dataForChart = [];
    var arr_legend_labels = [];
    for( i=0; i<data.length;i++){
        var data_name = Object.keys(data[i]);
        datatot[i]=data[i][data_name[1]];
        dataForChart[i]=data[i][data_name[1]];
     //   console.log(dataForChart[i]);
        if(name_or_data=='name'){
            arr_legend_labels.push(data[i].name);
        }
        else{
            arr_legend_labels.push(data_name[1]);
        }
        if(typeof colors[i]=='undefined'){
            colors[i]=getRandomColor();
        }
    }
    var fact_name = Object.keys(data[0]);

    var keys = Object.keys(datatot[0][0]);
    var name = keys[1];
    var date_time = keys[0];
    //parseDate is function for dealing with datetimes from the Database do not need to change them from SQL statement
    var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S").parse;    
    //set min and max for y axis set high value for min and low value for max so that it will be overwritten
    var min = 1000000;
    var max = -100000;
    var minDate = parseDate(datatot[0][0][date_time]);
    var maxDate = parseDate(datatot[0][0][date_time]);
////Set min and max for xaxis and yaxis
    for( i=0; i<datatot.length;i++){
        if(datatot[i]!=null){
            var keys = Object.keys(datatot[i][0]);
            var name = keys[1];
            var date_time = keys[0];
            for (j = 0; j < datatot[i].length; j++) {
                datatot[i][j][name] = parseFloat(datatot[i][j][name]).toFixed(0);
                datatot[i][j][date_time] = parseDate(datatot[i][j][date_time]);
            }
                if(d3.min(datatot[i],function(d){return parseFloat(d[name]);})<min){
                    min = d3.min(datatot[i],function(d){return parseFloat(d[name]);});
                }
                if(d3.max(datatot[i],function(d){return parseFloat(d[name]);})>max){
                    max = d3.max(datatot[i],function(d){return parseFloat(d[name]);});
                }
                if(d3.min(datatot[i],function(d){return d[date_time];})<minDate){
                    minDate = d3.min(datatot[i],function(d){return d[date_time];});
                }
                if(d3.max(datatot[i],function(d){return d[date_time];})>maxDate){
                    maxDate = d3.max(datatot[i],function(d){return d[date_time];});
                }
        }
    }

   // console.log(min);
   // console.log(max);
////Give padding to the yaxis 
    var range = (parseFloat(max)-parseFloat(min))*.05;
    if(range==0){
        max=max+1;
        min=min-1;
    }
    else{
        max = parseFloat(max)+range;
        min = parseFloat(min)-range;
    }
    min=0;
    minDate.setDate(minDate.getDate() - 2);
//    maxDate.setDate(maxDate.getDate() + 70);
//select the dom element named visualisation
    var vis = d3.select("#visualisation");
    yScale = d3.scale.linear().range([HEIGHT-MARGINS.bottom , MARGINS.top]).domain([min,max ]),
    xScale = d3.time.scale().rangeRound([MARGINS.left, WIDTH - MARGINS.right])
        .domain([new Date(minDate), new Date(maxDate)]);
                
//Create the xaxis TICKS.X is the number of vertical lines to draw on graph and TICKS.Y is horizontal lines to draw on graph  
    xAxis = d3.svg.axis()
        .scale(xScale)
        .tickPadding(10)
        .ticks(TICKS.X);
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(TICKS.Y);
    function make_x_axis() {        
        return d3.svg.axis()
            .scale(xScale)
            .ticks(TICKS.X)
            .orient("bottom");
    };
    function make_y_axis() {        
            return d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(TICKS.Y);
    };
//add grid to the graph
    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + (HEIGHT-MARGINS.bottom) + ")")
            .call(make_x_axis()
                    .tickSize(-(HEIGHT-MARGINS.top-MARGINS.bottom), 0, 0)
                    .tickFormat("")
            );

    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(" + MARGINS.left + ",0)")
            .call(make_y_axis()
                    .tickSize(-(WIDTH-MARGINS.right-MARGINS.left), 0, 0)
                    .tickFormat("")
            );
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis)
        .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em");
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);


    scales = {xScale:xScale,yScale:yScale};
    xScale = scales.xScale;
    yScale = scales.yScale;
//This svg element goes on top of vis to keep the navigation contained inside the axises
    var graphSVG = vis
        .append("svg:svg")
        .attr('width', WIDTH-MARGINS.right-MARGINS.left)
        .attr('height',HEIGHT-MARGINS.top-MARGINS.bottom)
        .attr('x',MARGINS.left)
        .attr('y',MARGINS.top)
        .attr('class','graphSVG');
//ADD TITLE
    vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text(TITLE);
    

//      Adding the navigation at the bottom
    redrawChart=function() {

                    xScale.domain(viewport.empty() ? navXScale.domain() : viewport.extent());
                for( i=0; i<datatot.length;i++){
                    if(datatot[i]!=null){
                        var keys = Object.keys(datatot[i][0]);
                        var name = keys[1];
                        var date_time = keys[0];
                        d3.selectAll("circle.tipcircle"+"line"+i).remove();
                        d3.select("#line"+i).remove();
                        d3.selectAll("#rect").remove();
                        d3.selectAll(".d3-tip").remove();
                        drawbars(WIDTH,HEIGHT,graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[0],'rect',TOOLTIP);
                    }
                }
      
                vis.select('.x.axis').call(xAxis);
            }
    navHeight = 50 ;

    navigation(vis,graphSVG,datatot,navHeight,WIDTH,HEIGHT,MARGINS,minDate,maxDate,xScale,yScale,name,date_time,colors,TOOLTIP,redrawChart);
    for( i=0; i<datatot.length;i++){
        if(datatot[i]!=null){
            var keys = Object.keys(datatot[i][0]);
            var name = keys[1];
            var date_time = keys[0];
        }
        drawbars(WIDTH,HEIGHT,graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[0],'rect',TOOLTIP);
       // console.log(datatot[i]);
    }
    return graphSVG;
}

/* 
 * Function to initialize the chart
 * @parameter WIDTH is the width of graph in pixels
 * @parameter HEIGHT is the height of graph in pixels
 * @parameter MARGINS is an object with top, bottom, left and right values of 
 *          margins for the graph useful for leaving room for legend, title, and axis labels
 * @parameter TITLE is string of what the title should say.  Can use HTML to style and format
 * @parameter TOOLTIP is function to display the data for hovering over the lines
 * @parameter arr_legend_labels array of strings for the labels to the colors in the legend
 * @parameter datatot array of data.  Should be in the following format: 
 *                  datatot = [[{fact_date:sqlformatdatetime,fact_value:Value_here}],[{fact_date:sqlformatdatetime,fact_value:Value_here}]]
 * @parameter colors is an array of colors if no color is specified the line will be randomly assigned some color.
 * @parameter name_or_data string of 'athlete' or 'data'  to determine the legend labels.
 */
function InitChartTeamLoading(WIDTH,HEIGHT,MARGINS,TITLE,data,colors,name_or_data,linetype) {
    console.log(data);
    var vis = d3.select("#visualisation");
    if(typeof data=='undefined'){
        vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text("No Data");
    return;
    }
    linetype = typeof linetype !== 'undefined' ? linetype : 'linear'; 
    //This is to set the json object names dynamic
    if(typeof colors=='undefined' || colors=='' || colors==null){
            colors = ['blue','red','#00FF00','orange','gray'];
    }
    var TICKS = {
        X: 5,
        Y: 5
    };
    var TOOLTIP = function(d){
        if(typeof(d.tooltip)=='undefined'){
            d.tooltip = ' ';
        }
        return '<span>Cycle: '+d.cycle+'</span><br><strong>Total Internal Load:</strong> <span style=\'color:white\'>' + +d.total+ '</span>';
    }
    var datatot = [];
    var arr_legend_labels = [];
    for( i=0; i<data.length;i++){
        var data_name = Object.keys(data[i]);
        datatot[i]=data[i][data_name[1]];
        if(name_or_data=='name'){
            arr_legend_labels.push(data[i].name);
        }
        else{
            arr_legend_labels.push(data_name[1]);
        }
        if(typeof colors[i]=='undefined'){
            colors[i]=getRandomColor();
        }
    }

    var parseDate = d3.time.format("%Y-%m-%d").parse;    
    //set min and max for y axis set high value for min and low value for max so that it will be overwritten
    var minDate = d3.min(data, function(d) { return parseDate(d.MinDate); });
    var maxDate = d3.max(data, function(d) { return parseDate(d.MaxDate); });
    var min = d3.min(data, function(d) { return parseInt(d.total); });
    var max = d3.max(data, function(d) { return parseInt(d.total); });
    console.log(minDate);
    console.log(maxDate);
    console.log(min);
    console.log(max);

//select the dom element named visualisation
     yScale = d3.scale.linear().range([HEIGHT-MARGINS.bottom , MARGINS.top]).domain([min,max ]),
    xScale = d3.time.scale().rangeRound([MARGINS.left, WIDTH - MARGINS.right])
        .domain([new Date(minDate)-15, d3.time.day.offset(new Date(maxDate), 1)]);
                
//Create the xaxis TICKS.X is the number of vertical lines to draw on graph and TICKS.Y is horizontal lines to draw on graph  
    xAxis = d3.svg.axis()
        .scale(xScale)
        .tickPadding(10)
        .ticks(TICKS.X);
    yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(TICKS.Y);
    function make_x_axis() {        
        return d3.svg.axis()
            .scale(xScale)
            .ticks(TICKS.X)
            .orient("bottom");
    };
    function make_y_axis() {        
            return d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks(TICKS.Y);
    };
//add grid to the graph
    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(0," + (HEIGHT-MARGINS.bottom) + ")")
            .call(make_x_axis()
                    .tickSize(-(HEIGHT-MARGINS.top-MARGINS.bottom), 0, 0)
                    .tickFormat("")
            );

    vis.append("svg:g")         
            .attr("class", "grid")
            .attr("transform", "translate(" + MARGINS.left + ",0)")
            .call(make_y_axis()
                    .tickSize(-(WIDTH-MARGINS.right-MARGINS.left), 0, 0)
                    .tickFormat("")
            );
    vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis)
        .selectAll("text")  
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em");
    vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);


    scales = {xScale:xScale,yScale:yScale};
//    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,minDate,maxDate,TICKS);
    xScale = scales.xScale;
    yScale = scales.yScale;
//This svg element goes on top of vis to keep the navigation contained inside the axises
    var graphSVG = vis
        .append("svg:svg")
        .attr('width', WIDTH-MARGINS.right-MARGINS.left)
        .attr('height',HEIGHT-MARGINS.top-MARGINS.bottom)
        .attr('x',MARGINS.left)
        .attr('y',MARGINS.top)
        .attr('class','graphSVG');
//ADD TITLE
    vis.append('text')
            .attr("class","graph-title")
            .attr("text-anchor", "middle")
            .attr("x",(WIDTH)/2)
            .attr("y",MARGINS.top-(MARGINS.top/2))
            .attr("font-size","24")
            .text(TITLE);
    

//      Adding the navigation at the bottom
    redrawChart=function() {

                    xScale.domain(viewport.empty() ? navXScale.domain() : viewport.extent());
                for( i=0; i<datatot.length;i++){
                    if(datatot[i]!=null){
                        var keys = Object.keys(datatot[i][0]);
                        var name = keys[1];
                        var date_time = keys[0];
                        d3.selectAll("circle.tipcircle"+"line"+i).remove();
                        d3.select("#line"+i).remove();
                        d3.selectAll("#rect").remove();
                        d3.selectAll(".d3-tip").remove();
                        drawbars(WIDTH,HEIGHT,graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[0],'rect',TOOLTIP);
//                        drawline(graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[i],"line"+i,TOOLTIP,linetype);
                    }
                }
      
                vis.select('.x.axis').call(xAxis);
            }
    navHeight = 50 ;

//    navigation(vis,graphSVG,datatot,navHeight,WIDTH,HEIGHT,MARGINS,minDate,maxDate,xScale,yScale,name,date_time,colors,TOOLTIP,redrawChart);
//    for( i=0; i<datatot.length;i++){
//        if(datatot[i]!=null){
//            var keys = Object.keys(datatot[i][0]);
//            var name = keys[1];
//            var date_time = keys[0];
//        }
////        drawbars(WIDTH,HEIGHT,graphSVG,xScale,yScale,datatot[i],MARGINS,name,date_time,colors[0],'rect',TOOLTIP);
    var x=xScale.domain();
    var width = (WIDTH-MARGINS.left-MARGINS.right)/((x[1]-x[0])/(WIDTH * 3600 * 24));
    var height = HEIGHT-MARGINS.top-MARGINS.bottom;
    var width = width*.90;
    var tip = d3.tip()
            .attr('class','chart-region')      
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
            return TOOLTIP(d);
      })
    graphSVG.call(tip); 
    graphSVG.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("id", "rect")
            .attr("class","bars")
            .attr("width", function(d,i){
                if(xScale(parseDate(d.MaxDate))-MARGINS.left-( xScale(parseDate(d.MinDate))-MARGINS.left)==0){
                    return width;
                }else{
                    return xScale(parseDate(d.MaxDate))-MARGINS.left-(20)-( xScale(parseDate(d.MinDate))-MARGINS.left-(20));
                };
            })
            .attr("height", height)
            .attr("x",function(d,i){return xScale(parseDate(d.MinDate))-MARGINS.left-(20)})
            .attr("y",function(d,i){
                                    if(yScale(parseInt(d.total))-MARGINS.top>0)
                                    {
                                        return yScale(parseInt(d.total))-MARGINS.top;
                                    }
                                    else{
                                        return 0;
                                    }
                                })
            .style('opacity',1)
            .style('fill','blue')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
//    }
//adding second axis to the right
    var indMax=5;
    var rowMax=0;
    var indMin = 0;
    var rowMin=0;
    for( i=0; i<(data.length);i++){
        console.log(i);
         rowMax = d3.max(data[i].types, function(d) { return parseInt(d.value); });
         if(rowMax>indMax){
             indMax=rowMax;
         }
         rowMin = d3.min(data[i].types, function(d) { return parseInt(d.value); });
         
         if(rowMin<indMin){
             indMin=rowMin;
         }
    }

        var y = d3.scale.linear()
            .domain([indMin, indMax+(indMax*.05)])
            .range([HEIGHT-MARGINS.bottom , MARGINS.top]);
        var trans = WIDTH-MARGINS.right;
        var yAxis2 = d3.svg.axis()
            .scale(y)
            .orient("right");
           vis.append("g")
               .attr("class", "y axis")
               .attr("transform", "translate("+trans+",0)")
               .call(yAxis2);
       colors=['#ff6600','#00cc99','#0099cc','#000066','#9900ff','#993300','#669900','#990099','#00cc00','#333300','#0066cc','#993366','#339966'];
       var line=[];
//add lines to graph below
        for(i=0;i<data[0].types.length;i++){
            //draw legeng plot here
            console.log(data[0].types[i]); 
            var line1=[];
            line1.push("line"+i);
                var dataArray=[];
            for(j=0;j<data.length;j++){
                //add lines here
                delete dataObject;
                var dataObject;
                if(data[j].types[i].value != null){
                    console.log(data[j].types[i].value);
                    dataObject={
                                value:parseInt(data[j].types[i].value),
                                date:parseDate(data[j].MinDate),
                                name:data[j].types[i].name
                            };
//                    dataObject.date=parseDate(data[j].MinDate);
                     dataArray.push(dataObject);
                }
            }
            legend_y = i*15;
            line1='line'+i;
            console.log(dataArray);
            click = "undefined";
            var tooltipLine = function(d){
                return '<span>Type: '+d.name+'</span><br><strong>Internal Load:</strong> <span style=\'color:white\'>' + +d.value+ '</span>';
            }
            drawline_legend(vis,graphSVG,xScale,y,dataArray,HEIGHT,WIDTH,colors[i], 'value','date',legend_y,data[0].types[i].name,line1,MARGINS,tooltipLine,linetype,click);
            console.log(dataArray);
        }
        change_date = function(){
            xScale.domain([date2, d3.time.day.offset(date1, 1)]);
            function updateViewportFromChart() {
                if ((xScale.domain()[0] <= minDate) && (xScale.domain()[1] >= maxDate)) {

                    viewport.clear();
                }
                else {

                    viewport.extent(xScale.domain());
                }

                navChart.select('.viewport').call(viewport);
            }
    //    scales = create_scales_and_grid(vis,MARGINS,HEIGHT,WIDTH,min,max,date1,date2,TICKS);
            updateViewportFromChart();
            redrawChart();
        }

    change_date();
}