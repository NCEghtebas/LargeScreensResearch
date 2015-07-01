var stage = new Kinetic.Stage({
  container: 'container',
  width: 1000,
  height: 500
});


var reorderLayer = new Kinetic.Layer();
var gridLayer = new Kinetic.Layer();

var circle = new Kinetic.Circle({
  x: 100,
  y: stage.height()/2,
  // sides: 6,
  radius: 70,
  fill: '#00D2FF',
  stroke: 'black',
  strokeWidth: 4,
  draggable: true
});

function init() {
}

function resizeCanvas() {
}

// Calculates Circle Size based on window size
function calculateCircleSize(){
  //TODO: think of a justifiable way to do so 
}

// TODO add text inside circle

// TODO configure circle placement or randomly layout the circles. 

// TODO function to make circles

// How to make a function continuously check if circle is in correct order and change circle color from red to green 
// gridLayer.add(grid);

// function mouseDown(event) {
//   canvas_x = event.pageX;
//   canvas_y = event.pageY;
//   console.log("x: "+ canvas_x + " y: " + canvas_y);
// }

reorderLayer.add(circle);
stage.add(reorderLayer).add(gridLayer);