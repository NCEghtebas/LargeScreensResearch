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
      checkColor(divid);
      var x = divid.style.left;
      var y = divid.style.top;
      var nearest_point = getNearestGridPoint(x, y);
      divid.style.left = nearest_point.x + 'px';
      divid.style.top = nearest_point.y + 'px';
    },
  }
}();

function checkColor(circle) { 
  var circle_label = circle.id.slice(6,7);
  var circle_number = circle.id.slice(7, circle.id.length);
  // console.log("circle number: ",circle_number);
  var basket_label = circleInBasket(circle);
  // console.log(basket_label);
  if (circle_label == basket_label) {
    // make circle color green
    changeCircleColorToGreen(circle_label, circle_number);
    console.log("green");
  } else {
    // make circle color red
    changeCircleColorToRed(circle_label, circle_number);
    console.log("red");
  }
}

// Returns id of basket dependign on circles coordinates
function circleInBasket(circle) {
  var xp = parseInt(circle.style.left, 10)+1;
  var yp = parseInt(circle.style.top, 10)+1;
  container = document.getElementById('container');
  var square_dummy = document.getElementById("Square1");
  var rect_dummy = square_dummy.getBoundingClientRect();
  var i = 0;
  for (point in basket_points) {
    // console.log(point);
    x1 = (basket_points[point].x);
    y1 = (basket_points[point].y);
    x2 = x1 + rect_dummy.width * 3;
    y2 = y1 + rect_dummy.height * 2;
    // console.log( "x1: ", x1 , " <= xp: ", xp ,  " < x2: ", x2, " evaluates to: ", (x1 <= xp) && (xp < x2));
    // console.log( "y1: ", y1 , " <= yp: ", yp ,  " < y2: ", y2, " evaluates to: ", (y1 <= yp) && (yp < y2));
    // console.log( "end result: ", ( (x1 <= xp) && (xp < x2) ) && ( (y1 <= yp) && (yp < y2) ));
    if ( ( (x1 <= xp) && (xp < x2) ) && ( (y1 <= yp) && (yp < y2) ) ) {
      // console.log(basket_initial_alphabet2[i]);
      return basket_initial_alphabet2[i];
    }
    i++;
  }
}

function determineTextSize() {
  return parseInt(determineDiameter(), 10)/4 + 'px';
}

// Will later need to make sure average max distance 
// between random letters are constrained 
function randomizeCircleLetters(alphabet) {
  return alphabet[Math.floor(Math.random()*alphabet.length)];
}

//Changes circle div of id Circle + letter + number to red 
function changeCircleColorToRed(letter, number) {
    var temp_circle = document.getElementById('Circle'+ letter + number);
    temp_circle.style.backgroundColor= 'red';
}

//Changes circle div of id Circle + letter + number to green 
function changeCircleColorToGreen(letter, number) {
    var temp_circle = document.getElementById('Circle'+ letter + number);
    temp_circle.style.backgroundColor= 'green';
}

// returns the diameter of circle based on window size
function determineDiameter() {
  var height = square_div_array[0].clientHeight;
  var width = square_div_array[0].clientWidth;
  // how to return most correct size circle?
  return (lessThan(height, width)-5)+'px';
}

// Returns value lesser than out of the inputs val1 and val2
function lessThan(val1, val2) {
  if(val1 < val2){
    return val1;
  }else{
    return val2;
  }
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

// generates grid backgroud grid
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

// Returns point array in grid points
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

// Returns points of baskets at column c  
// Helper function for getBasketPoints(row, column) 
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

// returns point array for the baskets to be placed
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

// generates basket div elements from basket_point array
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

// Returns five points in the basket where cicles should be placed
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

/* Generates Circle divs in each basket. Last two circles  
 * in basket have random text chosen from initial alphabet 
 * with equally distributed weights.  */
// TODO: Refactor, trace bug of layered circles on initialization
function generateInitialGameStateCircles(initial_alphabet_config) {
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
                  changeCircleColorToRed("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColorToRed("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColorToRed("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColorToRed("R", r);
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
                  changeCircleColorToRed("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColorToRed("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColorToRed("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColorToRed("R", r);
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
                  changeCircleColorToRed("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColorToRed("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColorToRed("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColorToRed("R", r);
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
                  changeCircleColorToRed("H", h);
                  h++;
                  break;
                case 'N':
                  generateCirclesAtPoint(circle_point, "N"+ n);
                  changeCircleColorToRed("N", n);
                  n++;
                  break;
                case 'K':
                  generateCirclesAtPoint(circle_point, "K"+ k);
                  changeCircleColorToRed("K", k);
                  k++;
                  break;
                case 'R':
                  generateCirclesAtPoint(circle_point, "R"+ r);
                  changeCircleColorToRed("R", r);;
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

// Generates a green draggable circle at point with id Circle+label
// and centered text of value label
function generateCirclesAtPoint(point, label){
    container = document.getElementById('container');
    circle = document.createElement("div");
    // console.log("label: ", label);6
    circle.setAttribute('id', "Circle" + label);
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
    table.setAttribute('id', "Table" + label);
    table.setAttribute('style', 'width: 100%; height:100%; text-align: center;');
    var table_row = document.createElement('tr'), table_column = document.createElement('td');
    table_column.setAttribute("id", "TableColumn" +  label);
    table.appendChild(table_row); table_row.appendChild(table_column);
    // Creating Text
    var text = document.createTextNode(label);
    table_column.style.fontSize = determineTextSize();
    // Adding everything
    table_column.appendChild(text);
    circle.appendChild(table);
    container.appendChild(circle);
}

// Currently does nothing
// Supposed to resize baskets on window resize
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
// Whenever window is resized, this function resizes
// grid, circles, and textsize
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

// one initialization alphabet determining basket labels
var basket_initial_alphabet2 = [ 'H', 'R', 'H', 'N',
                                 'K', 'H', 'R', 'K',
                                 'R', 'N', 'H', 'R', 
                                 'N', 'K', 'N', 'H',
                                 'R', 'N', 'H', 'N',
                                 'K', 'R', 'K', 'R',
                                 'H', 'K', 'N', 'K',
                                 'N', 'R', 'K', 'H'];
// glabal parameters and variables
var circle_number = 160 ;
var column_div_array = [];
var square_div_array = [];
var hard_sort_alphabet = ["H", "K", "N", "R"];
var easy_sort_alphabet = ["C", "D"];
var grid_rows = 8;
var grid_columns = 24;

// equal weights for chooseing random letter
var weights = [0.25, 0.25, 0.25, 0.25];
// could weight each random differently
var h_weight = [0.1, 0.3, 0.3, 0.3];
var k_weight = [0.3, 0.1, 0.3, 0.3];
var n_weight = [0.3, 0.3, 0.1, 0.3];
var r_weight = [0.3, 0.3, 0.3, 0.1];

// First step is to generate grid div elements
generateGrid(grid_rows, grid_columns);

// Next, get array of points from grid div elements
var points = getGridPoints(grid_rows, grid_columns);

// Then we create basket points based on grid points
var basket_points =  getBasketPoints(grid_rows, grid_columns);

// We generate baskets based on basket_points
generateBaskets();

// Finally we generate the circle game elements to be sorted
var circleNames = generateInitialGameStateCircles(circle_number);

// TODO fix physics dragging/highlighting issue... 



