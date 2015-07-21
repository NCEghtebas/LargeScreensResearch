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

// Will later need to make sure average max distance 
// between random letters are constrained 
function randomizeCircleLetters(alphabet) {
  return alphabet[Math.floor(Math.random()*alphabet.length)];
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
  var i = 0; 
  for(c= 0; c< number_of_columns; c++){
    for(r= 0; r< number_of_rows; r++){
      var squareElement = document.getElementById('Square'+(i+1));
      var rect = squareElement.getBoundingClientRect();
      // Left and Top coordiates of grid
      pointArray.push({x: rect.left, y: rect.top});
      i++;
    }
  }
  return pointArray;
}

// Generates circles out of divs and returns array of circle ID names
function generateNCircles(n){
    container = document.getElementById('container');
    var circleIDs = [] 
    for (i=0; i<n; i++){
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
  var i = 0; 
  var j = 0;
  var even = [2, 4, 6, 8];
  var merged =[];
  for (c= 0; c< number_of_columns; c++){
      if ( !(c%3) && !(r %2) ) {
        basket_array.push(appendBasketPointsOfColumn(c));
        j++;
        i+=8;
    }
  }
  return [].concat.apply([], basket_array);
}

// basket_array is the section of a point array to append points to 
// n is teh current column number
function appendBasketPointsOfColumn(c){
  var temp_basket_array = [];
  var squaresInColumn = document.getElementById('Column'+ (c+1)).childNodes;
  var array_index = 0;
  for (m = 0 ; m < squaresInColumn.length; m ++){
    if (m%2) {
      var rectsInColumn = squaresInColumn[m].getBoundingClientRect();
      temp_basket_array[array_index] = {x: rectsInColumn.left, y: rectsInColumn.top };
    }
    array_index++;
  }
  return temp_basket_array;
}

// generates baskets
function generateBaskets() {
  container = document.getElementById('container');
  var square_dummy = document.getElementById("Square1");
  var rect_dummy = square_dummy.getBoundingClientRect();
  var i = 0;
  for (point in basket_points) {
    basket = document.createElement('div'); 
    basket.setAttribute('id', 'Basket' + (i + 1));
    basket.setAttribute('style', 'position: absolute; border:3px solid black; text-align:center');
    basket.style.left = basket_points[point].x + 'px';
    basket.style.top = basket_points[point].y + 'px';
    basket.style.width = rect_dummy.width * 3 + 'px';
    basket.style.height = rect_dummy.height * 2 + 'px';
    container.appendChild(basket);
    i++;
  }
}

function makePointsInBasket(point) {
  var square_dummy = document.getElementById('Square2');
  var rect_dummy = square_dummy.getBoundingClientRect();
  var eins = {x: point.x, y: point.y};
  var zwei = {x: point.x + rect_dummy.width, y: point.y};
  var drei = {x: point.x + rect_dummy.width * 2, y: point.y };
  var vier = {x: point.x, y: point.y + rect_dummy.height};
  var funf = {x: point.x + rect_dummy.width, y: point.y + rect_dummy.height}
  return [eins, zwei, drei, vier, funf];
}

function changeCircleColor(letter, number) {
    var temp_circle = document.getElementById('Circle'+ letter + number);
    temp_circle.style.backgroundColor= 'red';
}

// from http://stackoverflow.com/questions/8877249/generate-random-integers-with-probabilities
function getRandom (results) {
    var num = Math.random(),
        s = 0,
        lastIndex = weights.length - 1;

    for (var i = 0; i < lastIndex; ++i) {
        s += weights[i];
        if (num < s) {
            return results[i];
        }
    }
    return results[lastIndex];
};

// TODO: Refactor
function generateAllCircles(initial_alphabet_config) {
  var i = 0;
  var h = 1, n = 1, k = 1, r = 1;
  // for each basket point
  for (basket_point in basket_points) {
    // create points to place the circles
    var circle_point_array = makePointsInBasket(basket_points[basket_point]);
    // go through all the circle points and place circles
    var last_two = circle_point_array.slice( Math.max(circle_point_array.length-2,1));
    for (circle_point of circle_point_array) {
      if (i < 160){
        switch (basket_initial_alphabet2[i]) {
          case 'H':2
            // if this h circle being placed is the 4rth or 5th circle
            if ( last_two.indexOf(circle_point) != -1 ) { 
              // make this circle a random letter
              var rand_letter = getRandom(hard_sort_alphabet);
              switch (rand_letter) {
                case 'H':
                  generateCirclesAtPoint(circle_point, "H"+ h);
                  changeCircleColor("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColor("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColor("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColor("R", r);
                  r++;
                  break;
              }
            } else {
              // else just place a regular circle here
              generateCirclesAtPoint(circle_point, "H"+ h);
              h++;
              break;
            }
          case 'N':
            // if this n circle being placed is the 4rth or 5th circle
            if ( last_two.indexOf(circle_point) != -1 ) { 
              // make this circle a random letter and initialize it as red
              var rand_letter = getRandom(hard_sort_alphabet);
              switch (rand_letter) {
                case 'H':
                  generateCirclesAtPoint(circle_point, "H"+ h);
                  changeCircleColor("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColor("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColor("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColor("R", r);
                  r++;
                  break;
              }
            } else {
              // else just place a regular circle here
              generateCirclesAtPoint(circle_point, "N"+ n);
              n++;
              break;
            }
          case 'K':
            // if this n circle being placed is the 4rth or 5th circle
            if ( last_two.indexOf(circle_point) != -1 ) { 
              // make this circle a random letter and initialize it as red
              var rand_letter = getRandom(hard_sort_alphabet);
              switch (rand_letter) {
                case 'H':
                  generateCirclesAtPoint(circle_point, "H"+ h);
                  changeCircleColor("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColor("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColor("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColor("R", r);
                  r++;
                  break;
              }
            } else {
              // else just place a regular circle here
              generateCirclesAtPoint(circle_point, "K"+ k);
              k++;
              break;
            }
          case 'R':
            // if this n circle being placed is the 4rth or 5th circle
            if ( last_two.indexOf(circle_point) != -1 ) { 
              // make this circle a random letter and initialize it as red
              var rand_letter = getRandom(hard_sort_alphabet);
              switch (rand_letter) {
                case 'H':
                  generateCirclesAtPoint(circle_point, "H"+ h);
                  changeCircleColor("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColor("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColor("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColor("R", r);;
                  r++;
                  break;
              }
            } else {
              // else just place a regular circle here
              generateCirclesAtPoint(circle_point, "R"+ r);
              r++;
              break;
            }
        }
      } else {
        break;
      }
    }
    i++;
  }
}

function generateCirclesAtPoint(point, increment){
    container = document.getElementById('container');
    circle = document.createElement("div");
    // console.log("increment: ", increment);6
    circle.setAttribute('id', "Circle" + increment);
    circle.setAttribute('style', 'position: absolute; background-color: green; border-radius: 100px; border: 3px solid black');
    // setting circle's initial position
    circle.style.top = point.y + 'px';
    circle.style.left = point.x + 'px';
    circle.style.width = determineDiameter();
    circle.style.height = determineDiameter();
    // Making Circle Draggable
    circle.setAttribute('onmousedown' ,'mydragg.startMoving(this,"container",event);');
    circle.setAttribute('onmouseup', 'mydragg.stopMoving(this, "container");');
    // Creating tables for centering text in circles
    var table = document.createElement("table");
    table.setAttribute('id', "Table" + increment);
    table.setAttribute('style', 'width: 100%; height:100%; text-align: center;');
    var table_row = document.createElement('tr'), table_column = document.createElement('td');
    table_column.setAttribute("id", "TableColumn" +  increment);
    table.appendChild(table_row); table_row.appendChild(table_column);
    // Creating Text
    var text = document.createTextNode(increment);
    table_column.style.fontSize = determineTextSize();
    table_column.appendChild(text);
    circle.appendChild(table);
    container.appendChild(circle);
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

// TODO: fix for circle, text, and basket
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
    i++;
  }
  // resizeBaskets();
}

// Oh boy this is getting messy...

// fix ordering
var basket_initial_alphabet2 = [ 'H', 'R', 'H', 'N','K', 'H', 'R', 'K','R', 'N', 'H', 'R', 'N', 'K', 'N', 'H','R', 'N', 'H', 'N','K', 'R', 'K', 'R','H', 'K', 'N', 'K','N', 'R', 'K', 'H'];
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

// equal weights for chooseing random letter
var weights = [0.25, 0.25, 0.25, 0.25];
// could weight each random differently.
var h_weight = [0.1, 0.3, 0.3, 0.3];
var k_weight = [0.3, 0.1, 0.3, 0.3];
var n_weight = [0.3, 0.3, 0.1, 0.3];
var r_weight = [0.3, 0.3, 0.3, 0.1];

generateGrid(grid_rows, grid_columns);

//This line of code deosn't work when inseterted in generatCricles function
points = getGridPoints(grid_rows, grid_columns);

var basket_points =  getBasketPoints(grid_rows, grid_columns);

generateBaskets();

// want to generate circles after the baskets
var circleNames = generateAllCircles(circle_number);

// TODO fix physics dragging/highlighting issue... 



