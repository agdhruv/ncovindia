var DATA_FILE_PATH = "assets/data/total_cases.csv";

$(document).ready(function () {

	init_d3_greater_60();
	init_d3_doubling_days();
	init_world_total("#graph_d3_world_total1");

});

function init_world_total (selector) {
	    var margin = {top: 10, right: 30, bottom: 30, left: 60},
	width = 2000 - margin.left - margin.right,
	height = 766 - margin.top - margin.bottom;

	const svg = d3.select(selector)
	.append("svg")
	    // .attr("width", width + margin.left + margin.right)
	    // .attr("height", height + margin.top + margin.bottom)
	    .attr("viewBox", `0 0 2000 766`)
	.append("g")
	    .attr("transform",
	        "translate(" + margin.left + "," + margin.top + ")");
	
	d3.csv(DATA_FILE_PATH, 
	function(d) {
	    if(d3.timeParse("%Y-%m-%d")(d.date) > d3.timeParse("%Y-%m-%d")("2020-02-01")) // only show feb onwards
	    return {
	        date: d3.timeParse("%Y-%m-%d")(d.date),
	        value: d.World,
	    };
	}).then(
	    function(data) {

	        var x = d3.scaleTime()
	        .domain(d3.extent(data, function(d) {
	            return d.date;
	        }))
	        .range([0, width]);

	        svg.append("g")
	        .attr("transform", "translate(0," + height + ")")
	        .call(d3.axisBottom(x));

	        var y = d3.scaleLinear()
	        .domain([0, d3.max(data, function(d) { return +d.value})])
	        .range([height, 0]);

	        svg.append("g")
	            .call(d3.axisLeft(y));

	        svg.append("path")
	            .datum(data)
	            .attr("fill", "none")
	            .attr("stroke", "steelblue")
	            .attr("stroke-width", 5)
	            .attr("d", d3.line()
	            .x(function(d) { return x(d.date)})
	            .y(function(d) { return y(d.value)})
	            );

	        svg.selectAll("circle")
	            .data(data)
	            .enter()
	            .append("circle")
	            .attr("fill", "steelblue")
	            .attr("stroke","black")
	            .attr("r", "5")
	            .attr("cx", function(d) {
	                return x(d.date);
	            })
	            .attr("cy", function(d) {
	                return y(d.value);
	            });

	            
	        
	        const points = document.getElementsByTagName("circle");

	        const mouse_over = svg.append("g")
	        .attr("class", "mouse-over-effects");

	        mouse_over.append("path")
	        .attr("class", "mouse-line")
	        .style("stroke", "black")
	        .style("opacity", "0");

	        mouse_over.append("text")
	        .attr("class", "tooltip-text")
	        .style("opacity", 0)
	        .attr("font-size", "20px");

	        mouse_over.append("svg:rect")
	        .attr("width", width)
	        .attr("height", height)
	        .style("opacity", 0)
	        .on('mouseover', function() {
	            svg.select('.mouse-line')
	            .style("opacity", 1);
	            svg.select('.tooltip-text')
	            .style("opacity", 1);
	        })
	        .on('mouseout', function() {
	            svg.select('.mouse-line')
	            .style("opacity", 0);
	            svg.select(".tooltip-text")
	            .style("opacity", 0);
	            svg.selectAll("circle")
	            .attr("r", "5")
	            .attr("fill", "steelblue");
	        })
	        .on('mousemove', function() {
	            var mouse = d3.mouse(this);
	            const bisect = d3.bisector(function(d) {
	                return d.date
	            }).left;
	            const date = x.invert(mouse[0]);
	            var index = bisect(data, date, 1);
	            const left_candidate = index-1;
	            const right_candidate = index;
	            const closest_index = date - data[left_candidate].date > data[right_candidate].date - date ? right_candidate : left_candidate;

	            const closest_data_point = data[closest_index];

	            const x_value = x(closest_data_point.date);
	            const y_value = closest_data_point.value;

	            svg.selectAll("circle")
	            .attr("r", "5")
	            .attr("fill", "steelblue"); // Little bit of a hack, first we clean up all previous circles that might have been red. 
	            
	            svg.select(points[closest_index]) // Then we color the current one red. This is slightly inefficient because we should just keep the "last visited" in a variable and only clean that one but eh who cares. Something to remember if efficiency becomes an issue. I suspect, though, that the asymptocity of curre
	            .attr("fill", "red")
	            .attr("r", "10");
	            // We'll use the y_value for the tooltip text and
	            // the y_coordinate to figure out _where_ to show it
	            const y_coordinate = y(y_value);
	            const y_start = y(y.invert(0));
	            const y_end = height;
	            svg.select(".mouse-line")
	            .attr("d", function() {
	                var d = "M" + x_value + " " + y_start + "L " + x_value + " " + y_end;
	                return d;
	            })
	            .style("opacity", 1);

	            var tooltip_x_value = x_value;
	            var tooltip_y_value = y_coordinate - 30;
	            if(closest_index > points.length/2) {
	                tooltip_x_value -=75;
	            }
	            else {
	                tooltip_x_value += 5;
	            }
	            console.log(tooltip_y_value);
	            svg.select(".tooltip-text")
	            .text(function() {
	                return y_value;
	            })
	            .style("opacity", 1)
	            .attr("transform", "translate(" + tooltip_x_value + "," + tooltip_y_value + ")");
	        })
	    }
	);
}

function init_d3_greater_60 () {

	var margin = {top: 10, right: 30, bottom: 30, left: 60},
		width = 2000 - margin.left - margin.right,
		height = 766 - margin.top - margin.bottom;
	
	const svg = d3.select("#graph_d3_greater_60")
	.append("svg")
		.attr("viewBox", '0 0 2000 766')
	.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	d3.csv(DATA_FILE_PATH, 
	function(d) {
		result = {
			date: d3.timeParse("%Y-%m-%d")(d.date),
		}
		for(element in d)
		{
			if(element != "date")
			{
				if(d[element] == null)
					result[element] = 0;
				else {
					result[element] = parseInt(d[element]);   
				}
			}
		}
		return result;
	}).then(
		function(data) {
			var groups = d3.keys(data[0]);
			groups.shift();
			var current_country = "India";
			var filtered_data = data.filter(function(d) {
				if(d[current_country] >= 60)
				{
					return d;
				}  
			}).map(function(d) {
				return {
					date: d.date,
					value: d[current_country],
				}
			})

			var initial_countries = ["China", "India", "France", "South Korea", "Italy", "Germany", "United States"];
			var z = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"];
			var colour_mapping = {};
			for(idx in initial_countries)
			{
				colour_mapping[initial_countries[idx]] = z[idx];
			}
			d3.select("#graph_d3_greater_60-checkboxes")
			.selectAll()
			.data(initial_countries)
			.enter()
			.append("div")
			.attr("class", "check-option")
			.text(function(d) {
				return d;
			})
			.append("input")
			.attr("type", "checkbox")
			.property("checked", true)
			.attr("value", function(d) {
				return d;
			})
			.property("checked", function(d) {
				return initial_countries.includes(d);
			})
			.attr("class", "country-60-checkbox")
			.on("change", update_graph);

			var x = d3.scaleTime()
			.domain(d3.extent(filtered_data, function(d) {
				return d.date;
			}))
			.range([0, width]);

			let x_axis = svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

			var y = d3.scaleLinear()
			.domain([0, d3.max(filtered_data, function(d) { return +d.value})])
			.range([height, 0]);

			let y_axis = svg.append("g")
				.call(d3.axisLeft(y));

			let line = svg.append("path")
				.datum(filtered_data)
				.attr("fill", "none")
				.attr("class", "graph-line")
				.attr("stroke", "steelblue")
				.attr("stroke-width", 5)
				.attr("d", d3.line()
				.x(function(d) { return x(d.date)})
				.y(function(d) { return y(d.value)})
				);

			let circles = svg.selectAll("circle")
				.data(filtered_data)
				.enter()
				.append("circle")
				.attr("fill", "steelblue")
				.attr("stroke","black")
				.attr("r", "5")
				.attr("cx", function(d) {
					return x(d.date);
				})
				.attr("cy", function(d) {
					return y(d.value);
				});

			let points = document.getElementsByTagName("circle");

			const mouse_over = svg.append("g")
			.attr("class", "mouse-over-effects");

			mouse_over.append("path")
			.attr("class", "mouse-line")
			.style("stroke", "black")
			.style("opacity", "0");

			mouse_over.append("text")
			.attr("class", "tooltip-text")
			.style("opacity", 0)
			.attr("font-size", "20px");

			let mouse_rectangle = mouse_over.append("svg:rect")
			.attr("width", width)
			.attr("height", height)
			.style("opacity", 0)
			.on('mouseover', function() {
				d3.select('.mouse-line')
				.style("opacity", 1);
				d3.select('.tooltip-text')
				.style("opacity", 1);
			})
			.on('mouseout', function() {
				d3.select('.mouse-line')
				.style("opacity", 0);
				d3.select(".tooltip-text")
				.style("opacity", 0);
			})
			.on('mousemove', function() {
				var mouse = d3.mouse(this);
				const bisect = d3.bisector(function(d) {
					return d.date
				}).left;
				const date = x.invert(mouse[0]);
				var index = bisect(filtered_data, date, 1);
				const left_candidate = index-1;
				const right_candidate = index;
				const closest_index = date - filtered_data[left_candidate].date > filtered_data[right_candidate].date - date ? right_candidate : left_candidate;

				const closest_data_point = filtered_data[closest_index];

				const x_value = x(closest_data_point.date);
				const y_value = closest_data_point.value;

				d3.selectAll("circle")
				.attr("r", "5")
				.attr("fill", "steelblue"); // Little bit of a hack, first we clean up all previous circles that might have been red. 
				
				d3.select(points[closest_index]) // Then we color the current one red. This is slightly inefficient because we should just keep the "last visited" in a variable and only clean that one but eh who cares. Something to remember if efficiency becomes an issue. I suspect, though, that the asymptocity of curre
				.attr("fill", "red")
				.attr("r", "10");
				// We'll use the y_value for the tooltip text and
				// the y_coordinate to figure out _where_ to show it
				const y_coordinate = y(y_value);
				const y_start = y(y.invert(0));
				const y_end = height;
				d3.select(".mouse-line")
				.attr("d", function() {
					var d = "M" + x_value + " " + y_start + "L " + x_value + " " + y_end;
					return d;
				})
				.style("opacity", 1);

				var tooltip_x_value = x_value;
				var tooltip_y_value = y_coordinate - 30;
				if(closest_index > points.length/2) {
					tooltip_x_value -=75;
				}
				else {
					tooltip_x_value += 5;
				}

				d3.select(".tooltip-text")
				.text(function() {
					return y_value;
				})
				.style("opacity", 1)
				.attr("transform", "translate(" + tooltip_x_value + "," + tooltip_y_value + ")");
			})
			
			function update(selected_countries) {
				// console.log(selected_countries);
				var country_data = [];
				var temp_country_data = {};
				var max_length = 0;
				for(idx in selected_countries)
				{
					country = selected_countries[idx];
					var day = 0;
					for(i in data)
					{
						row_data = data[i];
						if(row_data[country] >= 60 && row_data[country] <= 10000)
						{
							if(temp_country_data[day] == undefined)
							{
								temp_country_data[day] = {};
							}
							temp_country_data[day][country] = row_data[country];
							max_length = Math.max(max_length, day);
							day++;
						}
					}
				}
				for(var i=0;i<max_length;i++)
				{
					country_data.push(temp_country_data[i]);
					country_data[i].day = i+1;
				}

				x = d3.scaleLinear()
					.domain(d3.extent(country_data, function(d) {
						return d.day;
					}))
					.range([0, width]);

				x_axis
					.transition()
					.duration(1000)
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x));

				y = d3.scaleLinear()
				.domain([0, d3.max(country_data, function(d) { 
					var max_val = 0;
					for(idx in selected_countries)
					{
						country = selected_countries[idx];
						if(d[country])
						{
							max_val = Math.max(max_val, d[country]);
						}
					}
					return max_val;
				})])
				.range([height, 0]);

				y_axis
					.transition()
					.duration(1000)
					.call(d3.axisLeft(y));1

				
				
				svg.selectAll(".graph-line")
				.remove();

				svg.selectAll("circle")
				.remove();

				// filter the country_data by the selected country
				for(idx in selected_countries)
				{
					country = selected_countries[idx];
					var temp_filtered_data = country_data.filter(function(d) {
						return d.hasOwnProperty(country);
					}).map(function(d) {
						return {
							day: d.day,
							value: d[country],
						}
					});
					
					let line = svg.append("path")
						.datum(temp_filtered_data)
						.attr("fill", "none")
						.attr("class", "graph-line")
						.attr("stroke", function(d) {
							return colour_mapping[country];
						})
						.attr("stroke-width", 5)
						.attr("d", d3.line()
						.x(function(d) { return x(d.day)})
						.y(function(d) { return y(d.value)})
						);


						svg.selectAll("circle")
						.data(temp_filtered_data, function(d) { return country})
						.enter()
						.append("circle")
						.attr("fill", function(d) {
							return colour_mapping[country];
						})
						.attr('class', 'cursor-pointer')
						.attr("stroke","black")
						.attr("r", "0")
						.attr("cx", function(d) {
							return x(d.day);
						})
						.attr("cy", function(d) {
							return y(d.value);
						})
						.attr("country", country)
						.on("mouseover", function(d) {
							svg.append("text")
							.attr("class", "temp-tooltip")
						})
						.on("mousemove", function(d) {
							var country = d3.select(this).attr("country");
							svg.select(".temp-tooltip")
							.text( "(" + country + ") Day Number: " + d.day + " | Number of Cases : " + d.value)
							.attr("transform", "translate(" + (x(d.day) + 10) + "," + y(d.value) + ")")
						})
						.on("mouseout", function(d) {
							svg.select(".temp-tooltip")
							.remove();
						});

				}
				
				svg.selectAll("circle")
				.transition()
				.duration(1000)
				.attr("r", "5"); 
				

							
				points = document.getElementsByTagName("circle");
				mouse_rectangle.on("mousemove", null);
				return;
			}

			function update_graph() {
				var selected_countries = [];
				var temp = d3.selectAll(".country-60-checkbox")
				.each(function() {
					if(d3.select(this).property("checked"))
						selected_countries.push(this.value);
				});
				// console.log(selected_countries);
				update(selected_countries);
			}

			update_graph();
		}
	);
}

function init_d3_doubling_days () {
	var margin = {top: 10, right: 30, bottom: 30, left: 60},
		width = 2000 - margin.left - margin.right,
		height = 766 - margin.top - margin.bottom;
	
	const svg = d3.select("#graph_d3_doubling_days")
	.append("svg")
		.attr("viewBox", '0 0 2000 766')
	.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	d3.csv(DATA_FILE_PATH, 
	function(d) {
		result = {
			date: d3.timeParse("%Y-%m-%d")(d.date),
		}
		for(element in d)
		{
			if(element != "date")
			{
				if(d[element] == null)
					result[element] = 0;
				else {
					result[element] = parseInt(d[element]);   
				}
			}
		}
		return result;
	}).then(
		function(data) {
			var groups = d3.keys(data[0]);
			groups.shift();
			var current_country = "India";
			var filtered_data = data.filter(function(d) {
				if(d[current_country] >= 60)
				{
					return d;
				}  
			}).map(function(d) {
				return {
					date: d.date,
					value: d[current_country],
				}
			})

			var initial_countries = ["China", "India", "France", "South Korea", "Italy", "Germany", "United States"];
			var z = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2"];
			var colour_mapping = {};
			for(idx in initial_countries)
			{
				colour_mapping[initial_countries[idx]] = z[idx];
			}
			d3.select("#graph_d3_doubling_days-checkboxes")
			.selectAll()
			.data(initial_countries)
			.enter()
			.append("div")
			.attr("class", "check-option")
			.text(function(d) {
				return d;
			})
			.append("input")
			.attr("type", "checkbox")
			.property("checked", true)
			.attr("value", function(d) {
				return d;
			})
			.property("checked", function(d) {
				return initial_countries.includes(d);
			})
			.attr("class", "country-checkbox")
			.on("change", update_graph);

			var x = d3.scaleTime()
			.domain(d3.extent(filtered_data, function(d) {
				return d.date;
			}))
			.range([0, width]);

			let x_axis = svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));

			var y = d3.scaleLinear()
			.domain([0, d3.max(filtered_data, function(d) { return +d.value})])
			.range([height, 0]);

			let y_axis = svg.append("g")
				.call(d3.axisLeft(y));

			let line = svg.append("path")
				.datum(filtered_data)
				.attr("fill", "none")
				.attr("class", "graph-line")
				.attr("stroke", "steelblue")
				.attr("stroke-width", 5)
				.attr("d", d3.line()
				.x(function(d) { return x(d.date)})
				.y(function(d) { return y(d.value)})
				);

			let circles = svg.selectAll("circle")
				.data(filtered_data)
				.enter()
				.append("circle")
				.attr("fill", "steelblue")
				.attr("stroke","black")
				.attr("r", "5")
				.attr("cx", function(d) {
					return x(d.date);
				})
				.attr("cy", function(d) {
					return y(d.value);
				});

			let points = document.getElementsByTagName("circle");

			const mouse_over = svg.append("g")
			.attr("class", "mouse-over-effects");

			mouse_over.append("path")
			.attr("class", "mouse-line")
			.style("stroke", "black")
			.style("opacity", "0");

			mouse_over.append("text")
			.attr("class", "tooltip-text")
			.style("opacity", 0)
			.attr("font-size", "20px");
			
			function update(selected_countries) {
				var country_data = {};
				var temp_country_data = {};
				var max_x_value = 0;
				var min_x_value = 1e9;
				var max_y_value = 0;
				var min_y_value = 1e9;
				for(idx in selected_countries)
				{
					country = selected_countries[idx];
					var day = 0;
					country_data[country] = [];
					for(i in data)
					{
						row_data = data[i];
						if(row_data[country] >= 60)
						{
							// so we need to find
							// the largest such index 
							// such that data[idx][country] >= row_data[country]/2
							// then store it as 
							var result = {
								total_cases: row_data[country],
								doubling_time: 0,
							}
							for(var j=0;j<=i;j++)
							{
								if(data[j][country] >= result.total_cases/2)
								{
									if(j == i)
									{
										result.doubling_time = 1;
									}
									else{
										result.doubling_time = i - j;
									}
									break;
								}
							}
							max_x_value = Math.max(max_x_value, result.total_cases);
							min_x_value = Math.min(min_x_value, result.total_cases);
							max_y_value = Math.max(max_y_value, result.doubling_time);
							min_y_value = Math.min(min_y_value, result.doubling_time);
							country_data[country].push(result);
						}
					}
				}

				x = d3.scaleLog()
					.domain([60, max_x_value])
					.range([0, width]);

				x_axis
					.transition()
					.duration(1000)
					.attr("transform", "translate(0," + height + ")")
					.call(d3.axisBottom(x));

				y = d3.scaleLinear()
				.domain([0, 15])
				.range([height, 0]);

				y_axis
					.transition()
					.duration(1000)
					.call(d3.axisLeft(y));1

				
				
				svg.selectAll(".graph-line")
				.remove();

				svg.selectAll("circle")
				.remove();

				// filter the country_data by the selected country
				for(idx in selected_countries)
				{
					country = selected_countries[idx];
					var temp_filtered_data = country_data[country];
					
					let line = svg.append("path")
						.datum(temp_filtered_data)
						.attr("fill", "none")
						.attr("class", "graph-line")
						.attr("stroke", function(d) {
							return colour_mapping[country];
						})
						.attr("stroke-width", 10)
						.attr("d", d3.line()
						.x(function(d) { return x(d.total_cases)})
						.y(function(d) { return y(d.doubling_time)})
						);


						svg.selectAll("circle")
						.data(temp_filtered_data, function(d) { return country})
						.enter()
						.append("circle")
						.attr("fill", function(d) {
							return colour_mapping[country];
						})
						.attr('class', 'cursor-pointer')
						.attr("stroke","black")
						.attr("r", "0")
						.attr("cx", function(d) {
							return x(d.total_cases);
						})
						.attr("cy", function(d) {
							return y(d.doubling_time);
						})
						.attr("country", country)
						.on("mouseover", function(d) {
							svg.append("text")
							.attr("class", "temp-tooltip")
						})
						.on("mousemove", function(d) {
							var country = d3.select(this).attr("country");
							svg.select(".temp-tooltip")
							.text("(" + country + ") Number of cases: " + d.total_cases + " | Time it took to double : " + d.doubling_time)
							.attr("transform", "translate(" + (x(d.total_cases) + 10) + "," + y(d.doubling_time) + ")");
						})
						.on("mouseout", function(d) {
							svg.select(".temp-tooltip")
							.remove();
						});

				}
				
				svg.selectAll("circle")
				.transition()
				.duration(1000)
				.attr("r", "10"); 
				

							
				points = document.getElementsByTagName("circle");
				// mouse_rectangle.on("mousemove", null);
				return;
				
			}

			function update_graph() {
				var selected_countries = [];
				var temp = d3.selectAll(".country-checkbox")
				.each(function() {
					if(d3.select(this).property("checked"))
						selected_countries.push(this.value);
				});
				// console.log(selected_countries);
				update(selected_countries);
			}

			update_graph();
		}
	);
}