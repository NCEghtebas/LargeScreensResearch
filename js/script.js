function init() {
}

function resizeCanvas() {
  // onResize();
}

var stage = new Kinetic.Stage({
        container: 'container',
        width: window.innerWidth,
        height: window.innerHeight,
        draggable: true
      });

// var shape_group = new Kinetic.Group({
//   x: 10,
//   y: 10,
//   width: 10,
//   height: 10,
//   draggable: true
// });

var layer = new Kinetic.Layer();

var circle = new Kinetic.Circle({
  x: 200,
  y: 100,
  radius: 70,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 4
});

var circle2 = new Kinetic.Circle({
  x: 200,
  y: 100,
  radius: 70,
  fill: 'green',
  stroke: 'black',
  strokeWidth: 4
});


// add the shape to the layer
layer.add(circle);

// add the layer to the stage
stage.add(layer);

var i = 1;
function closest_cell_from_mouse_position(shape){
  var cell = new Object;
  cell.x = 70+i - shape.getX();
  cell.y = 50+i - shape.getY();
  return cell;
}

circle.on('mouseup', function() {
  i++ ;
  console.log("mouse up on shape_group called");
  var closest_cell = closest_cell_from_mouse_position(circle);
  // circle.setPosition(closest_cell.x, closest_cell.y);
  circle.move({x: closest_cell.x, y: closest_cell.y} );
  // console.log(circle.getX());
  // circle.setY(closest_cell.y);
  // circle.setX(closest_cell.x);
  console.log("y: " +circle.getY());
  console.log("x: " +circle.getX());
  layer.draw();
  layer.add(circle);
  stage.add(layer); 
  return stage;
  console.log("moved");
});




//////////////////////

// var stage = new Kinetic.Stage({
//     container: 'container',
//     width: 300,
//     height: 300
// });

// var layer = new Kinetic.Layer();

// var rect = new Kinetic.Rect({
//     fill: 'red',
//     width: stage.getWidth(),
//     height: stage.getHeight()
//     });
                            
// layer.add(rect);
// stage.add(layer);

// rect.on('mouseup', function() {
//    alert('mouseup'); 
// });

////////////////







