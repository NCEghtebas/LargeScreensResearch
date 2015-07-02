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

var line = new Kinetic.Line({
  points: [73, 70, 340, 23, 450, 60, 500, 20],
  stroke: 'blue',
  strokeWidth: 10,
  lineCap: 'round',
  lineJoin: 'round',
  dash: [29, 20, 0.001, 20]
});

function init() {
}

function resizeCanvas() {
}

// Taken from here: http://goo.gl/bHGUi3

// Calculates Circle Size based on window size
function calculateCircleSize(){
  //TODO: think of a justifiable way to do so 
}


function draw_shape(sides) {}

var shape_group = new Kinetic.Group({
  x: 10,
  y: 10,
  width: 10,
  height: 10,
  draggable: true
});

var shape_size = 50;
// TODO: make radius dependant on window size
var radius = shape_size / 2;
var shape = new Kinetic.Circle({
  x: ,
  y: 0,
  radius: radius,
  fill:'#fff',
  stroke: 'black',
  strokeWidth: 1,
  lineJoin: 'bevel'
});

//TODO: return nearest x and y to simulate grid. 
//TODO: think about scaling grid size based on window size
function current_cell_from_mouse_position(){
}

shape_group.on('dragmove', function() {
  var current_cell = current_cell_from_mouse_position()
  shape_group.setX(70);
  console.log(shape_group.getX());
  shape_group.setY(50);
  console.log(shape_group.getY());
});
shape_group.add(shape);
      gridLayer.add(shape_group);

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

// gridLayer.add(line);
// reorderLayer.add(circle);
stage.add(reorderLayer).add(gridLayer);