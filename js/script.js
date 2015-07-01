var canvas = document.getElementById("canvas_1");
var context = canvas.getContext('2d');
var data = canvas.toDataURL();
var img = new Image();
var winIDList = [];

var menuX = window.innerWidth;
var menuY = 7/8 * window.innerHeight;  
var windowHeight = window.innerHeight;

function init () {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.addEventListener("mousedown", mouseDown, false);
  makeMenu();
}

function resizeCanvas () {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  // console.log("w x h: "+ canvas.width + " " +canvas.height);
  makeMenu();
  context.restore();
  
  data = canvas.toDataURL();

  console.log(data);

  // scale and redraw the canvas content
  img = new Image();
  img.onload = function () {
    context.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    }
  img.src = data;
}

function makeMenu (x, y){
  menuX = window.innerWidth;
  menuY = 7/8 * window.innerHeight;  
  windowHeight = window.innerHeight;
  context.strokeRect(0, menuY, menuX, windowHeight);
  context.stroke();
}

function mouseDown (event) {
  canvas_x = event.pageX;
  canvas_y = event.pageY;
  // console.log("x: "+ canvas_x + " y: " + canvas_y);
  if (event.pageY >= menuY) {
    openWindow();
  }
}

// function contains(a, obj) {
//     for (var i = 0; i < a.length; i++) {
//         if (a[i] === obj) {
//             return true;
//         }
//     }
//     return false;
// }

// function createWinID(){
// 	var winID = "window"+ Math.round((Math.random()*100;
// 	if (!contains(winID, winIDList)){
// 		winIDList.push("window"+ Math.round((Math.random()*100)));
// 	}else{
// 		createWinID();
// 	}
// }

function openWindow(){
  div = document.createElement("canvas_1");
  div.style.width = "100px";
  div.style.height = "100px";
  div.style.background = "red";
  div.style.color = "white";
  div.innerHTML = "Hello";

  document.body.appendChild(div);

  var appX = Math.random()*menuX;
  var appY = Math.random()*menuY;
  var appWidth = Math.random()*window.innerWidth;
  var appHeight = Math.random()*window.innerHeight;
  // randomCoordinate(appX, appY);
  // console.log(appX + " " + appY);
  createRandomShape(appX, appY, appWidth, appHeight);
}

function createRandomShape(appX, appY, appWidth, appHeight){
  context.strokeRect(appX, appY, appX+appWidth, appY+appHeight);
  context.stroke();
  context.save();
  // console.log(context);
}


// function randomCoordinate(){
//   appX = (Math.random()*menuX);
//   appY = (Math.random()*menuY); 
// }