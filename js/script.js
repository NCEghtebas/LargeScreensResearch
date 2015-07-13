/*
Chloe Eghtebas
July 12, 2015
*/

// Makes divs draggable, taken and modified from: http://jsfiddle.net/g6m5t8co/1/
var mydragg = function(){
    return {
        move : function(divid,xpos,ypos){
            divid.style.left = xpos + 'px';
            divid.style.top = ypos + 'px';
        },
        startMoving : function(divid,container,evt){
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
            divTop = divid.style.top,
            divLeft = divid.style.left,
            eWi = parseInt(divid.style.width),
            eHe = parseInt(divid.style.height),
            cWi = parseInt(document.getElementById(container).style.width),
            cHe = parseInt(document.getElementById(container).style.height);
            document.getElementById(container).style.cursor='move';
            divTop = divTop.replace('px','');
            divLeft = divLeft.replace('px','');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function(evt){
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                    if (aX < 0) aX = 0;
                    if (aY < 0) aY = 0;
                    if (aX + eWi > cWi) aX = cWi - eWi;
                    if (aY + eHe > cHe) aY = cHe -eHe;
                mydragg.move(divid,aX,aY);
            }
        },
        stopMoving : function(divid, container){
            var a = document.createElement('script');
            document.getElementById(container).style.cursor='default';
            document.onmousemove = function(){}
            var x = divid.style.left;
            var y = divid.style.top;
            var nearest_point = getNearestGridPoint(x, y);
            divid.style.left = nearest_point.x + 'px';
            divid.style.top = nearest_point.y + 'px';
        },
    }
}();

// Doesn't include 0
function naturalNumberSequence(cardinality) {
  var a = [];
  for (var i = 1; i <= cardinality; i++) {
    a.push(i);
  };
  return a;
}

function lessThan(val1, val2){
  if(val1 < val2){
    return val1;
  }else{
    return val2;
  }
}

function determineDiameter(){
  var height = square_div_array[0].clientHeight;
  var width = square_div_array[0].clientWidth;
  // how to return most correct size circle?
  return (lessThan(height, width)-5)+'px';
}

function determineTextSize(){
  return parseInt(determineDiameter(), 10)/4 + 'px';
}

// Untested and unused
function findCircleCenter(circle){
  width = circle.style.width;
  height = circle.style.height;
  return width/2, height/2;
}

// Will later need to make sure average max distance 
// between random letters are constrained 
function randomizeCircleLetters(alphabet) {
  return alphabet[Math.floor(Math.random()*alphabet.length)];
}

function containerNumber () {
  var container_number = Math.floor((grid_rows*grid_columns)/6);
  console.log(container_number);
}

function getBasketPoints(number_of_rows, number_of_columns){
  var basketArray = [];
  var naturalNumbers = naturalNumberSequence(number_of_columns*number_of_rows);
  var i = 0; 
  for(c= 0; c< number_of_columns; c++){
    for(r= 0; r< number_of_rows; r++){
      if ( !(c%3) && !(r %2) ) {
        var squareElement = document.getElementById('Square'+naturalNumbers[i]);
        var rect = squareElement.getBoundingClientRect();
        // Center point of the grid:
        // centerPointArray.push({x: rect.width/2 + rect.left, y: rect.height/2 + rect.top});
        // Left and Top coordiates of grid
        basketArray.push({x: rect.left, y: rect.top});
      }
      i++;
    }
  }
  return basketArray;
}

function defineBasket() {
  container = document.getElementById('container');
  var square_dummy = document.getElementById("Square1");
  for (point of basket_points) {
    basket = document.createElement('div');
    basket.setAttribute('id', 'Basket'+(1));
    basket.setAttribute('style', 'position: absolute; border:3px solid black; text-align:center');
    basket.style.left = point.x+'px';
    basket.style.top = point.y+'px';
    basket.style.width = square_dummy.getBoundingClientRect().width*3+'px';
    basket.style.height = square_dummy.getBoundingClientRect().height*2+'px';
    container.appendChild(basket);
  }
}

// returns nearest grid point to x1 and y1
function getNearestGridPoint(x1, y1) {
  var current_x = parseInt(x1, 10);
  var current_y = parseInt(y1, 10);
  var i = 0;
  var minDist = Math.sqrt(Math.pow(points[i].x - current_x, 2) + Math.pow(points[i].y-current_y, 2));
  var ans = points[0];
  for(var i = 0 ; i < points.length; i ++) {
    var dist = Math.sqrt(Math.pow(points[i].x - current_x, 2) + Math.pow(points[i].y-current_y, 2));
    if(dist < minDist) {
        minDist = dist;
        ans = points[i];
    }
  }
  return ans;
}

//TODO: make border only 1 px thick
function generateGrid(number_of_rows, number_of_columns)
{
  container = document.getElementById('container');
  var i=0,id;
  var k= 1;
  for(j=0; j<number_of_columns; j++) {
      column = document.createElement("div");
      column.setAttribute('id', 'Column' + (j+1));  
      column.setAttribute('style', 'float:left; border:1px solid black'); //border:1px solid black
      column.style.width = String(Math.round(1/number_of_columns*100)) + '%';//window.innerWidth/c;
      column.style.height = '100%';
      column_div_array.push(column);
      for(i=0; i<number_of_rows; i++) {
          square = document.createElement("div");
          square.setAttribute('id', "Square" + k);  
          square.setAttribute('style', 'border:1px solid black; text-align:center');
          square.style.height = String(Math.round(1/number_of_rows*100)) +'%';
          square.style.width = '100%';
          square_div_array.push(square);
          k++;
          column.appendChild(square);
      }

      container.appendChild(column);
  }
  // add the newly created element and it's content into the DOM
  my_div = document.getElementById("org_div1");
  document.body.insertBefore(container, my_div);
}

function getGridPoints(number_of_rows, number_of_columns){
  var pointArray = [];
  var naturalNumbers = naturalNumberSequence(number_of_columns*number_of_rows);
  var i = 0; 
  for(c= 0; c< number_of_columns; c++){
    for(r= 0; r< number_of_rows; r++){
      var squareElement = document.getElementById('Square'+naturalNumbers[i]);
      var rect = squareElement.getBoundingClientRect();
      // Center point of the grid:
      // centerPointArray.push({x: rect.width/2 + rect.left, y: rect.height/2 + rect.top});
      // Left and Top coordiates of grid
      pointArray.push({x: rect.left, y: rect.top});
      i++;
    }
  }
  return pointArray;
}

// Generates circles out of divs and returns array of circle ID names
function generateCircles(n){
    container = document.getElementById('container');
    var circleIDs = [] 
    for(i=0; i<n; i++){
        circle = document.createElement("div");
        circleIDs.push('Circle'+ (i+1));
        circle.setAttribute('id', circleIDs[i]);
        circle.setAttribute('style', 'position: absolute; background-color: red; border-radius: 100px; border: 3px solid black');
        // setting circle's initial position
        circle.style.top = points[i].y+'px';
        circle.style.left = points[i].x+'px';
        circle.style.width = determineDiameter();
        circle.style.height = determineDiameter();
        // Making Circle Draggable
        circle.setAttribute('onmousedown' ,'mydragg.startMoving(this,"container",event);');
        circle.setAttribute('onmouseup', 'mydragg.stopMoving(this, "container");');
        // Creating tables for centering text in circles
        var table = document.createElement("table");
        table.setAttribute('id', "Table"+(i+1));
        table.setAttribute('style', 'width: 100%; height:100%; text-align: center;');
        var table_row = document.createElement('tr'), table_column = document.createElement('td');
        table_column.setAttribute("id", "TableColumn" + (i+1));
        table.appendChild(table_row); table_row.appendChild(table_column);
        // Creating Text
        var text = document.createTextNode(randomizeCircleLetters(hard_sort_alphabet));
        table_column.style.fontSize = determineTextSize();
        table_column.appendChild(text);
        circle.appendChild(table);
        container.appendChild(circle);
    }
    return circleIDs;
}

// returns point array for the baskets
function getBasketPoints(number_of_rows, number_of_columns){
  var basket_array= [];
  // var naturalNumbers = naturalNumberSequence(number_of_columns*number_of_rows);
  var i = 0; 
  var j = 0;
  for(c= 0; c< number_of_columns; c++){
    for(r= 0; r< number_of_rows; r++){
      if ( !(c%3) && !(r %2) ) {
        // console.log("r: ",r,"c: ", c)
        var squareElement = document.getElementById('Square'+(i+1));
        var columnElement = document.getElementById('Column'+ (c+1));
        // console.log('Square'+(i+1));//"x: ", x, "y: ", y);
        var rect = squareElement.getBoundingClientRect();
        // console.log(rect);
  //       // Center point of the grid:
  //       // centerPointArray.push({x: rect.width/2 + rect.left, y: rect.height/2 + rect.top});
  //       // Left and Top coordiates of grid
        // basket_array.push({x: rect.left, y: rect.top});
        basket_array[j] = {x: rect.left, y: rect.top};
        console.log(basket_array[j].x, basket_array[j].y);
        j++;
        i+=2;
      }
    }
  }
  return basket_array;
}

// generates baskets
function generateBaskets() {
  container = document.getElementById('container');
  var square_dummy = document.getElementById("Square1");
  var rect_dummy = square_dummy.getBoundingClientRect();
  var i = 0;
  for (point of basket_points) {
    console.log("point: ", point);
    // console.log("created basket with rect: ", rect_dummy);
    basket = document.createElement('div');
    basket.setAttribute('id', 'Basket'+(i+1));
    // var x2 = point.x + rect_dummy.width*3+'px';
    // var y2 = rect_dummy.height*2+'px';
    basket.setAttribute('style', 'position: absolute; border:3px solid black; text-align:center');
    basket.style.left = point.x+'px';
    basket.style.top = point.y+'px';
    // basket.style.bottom = y2;
    // basket.style.right = x2;
    // basket.style.width = rect_dummy.width*3+'px';
    // basket.style.height = rect_dummy.height*2+'px';
    container.appendChild(basket);
    i++;
  }
}

function resizeBaskets() {
  // var square_dummy = document.getElementById("Square1");
  // for (var i = 0; i < basket_points.length; i++) {
  //   // recalculate basket positions
  //   basket = document.getElementById("Basket" +(i+1));
  //   basket.style.top = basket_points[i].y+'px';
  //   circle.style.left = basket_points[i].x+'px'; 
  //   // recaluculate basket dimensions
  //   basket.style.height = square_dummy.getBoundingClientRect().width*2+'px';
  //   basket.style.width = square_dummy.getBoundingClientRect().width*3+'px';
  //   i++;
  // }
}

// whenever window is resized, this function is called
function resizeCanvas() {
  var circleID;
  points = getGridPoints(grid_rows, grid_columns);
  var i = 0; 
  for (circleID of circleNames) {
    // recalculate circle positions
    circle = document.getElementById(circleID);
    circle.style.top = points[i].y+'px';
    circle.style.left = points[i].x+'px'; 
    // recaluculate circle dimensions
    circle.style.height = determineDiameter();
    circle.style.width = determineDiameter();
    //
    var column = document.getElementById("TableColumn"+(i+1));
    column.style.fontSize = determineTextSize();
    // 
    defineBasket();
    i++;
  }
  // resizeBaskets();
}

// Oh boy this is getting messy...

var circle_number = 160 ;
// var my_div = null;
// var mainDiv = null;
var column_div_array = [];
var square_div_array = [];
var points;
var hard_sort_alphabet = ["H", "K", "N", "R"];
var easy_sort_alphabet = ["C", "D"];
var grid_rows = 8;
var grid_columns = 24;

generateGrid(grid_rows, grid_columns);

//This line of code deosn't work when inseterted in generatCricles function
points = getGridPoints(grid_rows, grid_columns);

var circleNames = generateCircles(circle_number);

var basket_points =  getBasketPoints(grid_rows, grid_columns);
console.log("basket.points" , basket_points);

generateBaskets();

// console.log("basket_points: ", basket_points.length, "points: ", points.length );





