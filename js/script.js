var canvas = document.getElementById("canvas_1");

function init() {
  canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  canvas.addEventListener("mousedown", mouseDown, false);
}

function resizeCanvas() {
  canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("w x h: "+ canvas.width + " " +canvas.height);
}

function mouseDown(event) {
  canvas_x = event.pageX;
  canvas_y = event.pageY;
  console.log("x: "+ canvas_x + " y: " + canvas_y);
}


