import {appConfig} from "../../settings/settings"
export default ()=>{
    return(`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>Tree Example</title>
	
	<style>
	@font-face {
		font-family: 'Rowdies';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: local('Rowdies Bold'), local('Rowdies-Bold'), url(file:///android_asset/fonts/ptRMTieMYPNBAK219gtm1Ob4KDNu.woff2) format('woff2');
		unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
	  }
	  /* latin-ext */
	  @font-face {
		font-family: 'Rowdies';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: local('Rowdies Bold'), local('Rowdies-Bold'), url(file:///android_asset/fonts/ptRMTieMYPNBAK219gtm1Of4KDNu.woff2) format('woff2');
		unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	  }
	  /* latin */
	  @font-face {
		font-family: 'Rowdies';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: local('Rowdies Bold'), local('Rowdies-Bold'), url(file:///android_asset/fonts/ptRMTieMYPNBAK219gtm1On4KA.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	  }
	body{
		background:transparent
		
	}
	.node {
		cursor: pointer;
	}

	.node circle {
	  fill: ;
	  stroke: grey;
	  stroke-width: 3px;
	}

	.node text {
	  font-size: 40px;
	  font-family: 'Rowdies', cursive;

	}

	.link {
	  fill: none;
	  stroke: #ccc;
	  stroke-width: 10px;
    }
    
	
    </style>

  </head>

  <body>
	
<!-- load the d3.js library -->	
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js"></script>
	
<script>


window.addEventListener("message", function (message) {
  var treeData=message.data.data
  generateTree(treeData)
});

// ************** Generate the tree diagram	 *****************
function generateTree(treeDataArg){
  var margin = {top: 20, right: 120, bottom: 20, left: 350},
	width = 1600 - margin.right - margin.left,
	height = 2000 - margin.top - margin.bottom;
	
var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = treeDataArg;
root.x0 = height / 2;
root.y0 = 0;


update(root);



d3.select(self.frameElement).style("height", "500px");
function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
	}
	update(root)
}
function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 250; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

  nodeEnter.append("circle")
	  .attr("r", 1e-1)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -50 : 50; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 30)
	  .style("fill", function(d) { return d._children ? "${appConfig.primaryColor}" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}
root.children.forEach(collapse);


// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}

}

// generateTree(treeData)

</script>
	
  </body>
</html>
    `)
}