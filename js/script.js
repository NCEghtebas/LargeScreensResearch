function init() {
	var canvas = document.getElementById("canvas_1");
	canvas.width  = window.innerWidth;
	console.log(canvas.width);
    canvas.height = window.innerHeight;
	canvas.addEventListener("mousedown", mouseDown, false);
}

function mouseDown(event) {
	canvas_x = event.pageX;
	canvas_y = event.pageY;
	console.log("x: "+ canvas_x + " y: " + canvas_y);
}
