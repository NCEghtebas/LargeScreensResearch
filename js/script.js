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
        stopMoving : function(container){
            var a = document.createElement('script');
            document.getElementById(container).style.cursor='default';
            document.onmousemove = function(){}
        },
    }
}();

function grid(){
    var gDiv = document.createElement('div');
    gDiv.id = 'grid';
}

// Untested
function findCircleCenter(circle){
  width = circle.style.width;
  height = circle.style.height;
  return width/2, height/2;
}


var circle_number = 48 ;
var my_div = null;
var mainDiv = null;
var column = null;
var sq = null;
// var position_array = calculateGrid();

//TODO: make border only 1 px thick
function generateGrid(number_of_rows, number_of_columns)
{
  container = document.getElementById('container');
  var i=0,id;
  var k= 1;
  for(j=0; j<number_of_columns; j++) {
      column = document.createElement("div");
      column.setAttribute('id', 'Column' + (j+1));  
      column.setAttribute('style', 'float:left; border:1px solid black');
      column.style.width = String(Math.round(1/number_of_columns*100)) + '%';//window.innerWidth/c;
      column.style.height = '100%';

      for(i=0; i<number_of_rows; i++) {
          square = document.createElement("div");
          square.setAttribute('id', "Square" + k);  
          square.setAttribute('style', 'border:1px solid black');
          square.style.height = String(Math.round(1/number_of_rows*100)) +'%';
          square.style.width = '100%';

          k++;
          column.appendChild(square);
      }

      container.appendChild(column);
  }
  // add the newly created element and it's content into the DOM
  my_div = document.getElementById("org_div1");
  document.body.insertBefore(container, my_div);
}

function generateCircles(n){
    container = document.getElementById('container');
    for(i=0; i<n; i++){
        circle = document.createElement("div");
        circle.setAttribute('id', 'Circle'+ (i+1));
        //TODO: make radius of circle change with screen size
        circle.style.width = 100;
        circle.style.height = 100; 
        circle.style.borderRadius= 100;
        circle.setAttribute('style', 'position: absolute; background-color: red; border: 3px solid black');
        circle.setAttribute('onmousedown' ,'mydragg.startMoving(this,"container",event);');
        circle.setAttribute('onmouseup', 'mydragg.stopMoving("container");');
        container.appendChild(circle);
    }
}

// Doesn't include 0
function naturalNumberSequence(cardinality){
  var a = [];
  for (var i = 1; i <= cardinality; i++) {
    a.push(i);
  };
  return a;
}

function getGridCenterPoints(number_of_rows, number_of_columns){
  var centerPointArray = [];
  var naturalNumbers = naturalNumberSequence(number_of_columns*number_of_rows);
  var i = 0; 
  for(c= 0; c< number_of_columns; c++){
    for(r= 0; r< number_of_rows; r++){
      var squareElement = document.getElementById('Square'+naturalNumbers[i]);
      var rect = squareElement.getBoundingClientRect();
      centerPointArray.push({x: rect.width/2 + rect.left, y: rect.height/2 + rect.top});
      // console.log(coordinate.x, coordinate.y);
      // console.log( 'Square'+naturalNumbers[i]+ ": "+ (rect.height/2 +rect.top));
      // console.log(squareElement.getAttribute('id'));

      i++;
    }
  }
  return centerPointArray;
}

function greaterThan(val1, val2){
  if(val1 > val2){
    return val1;
  }else{
    return val2;
  }
}

// generateCircles(circle_number);

generateGrid(4,12);
points = getGridCenterPoints(4, 12);

console.log(points);

/* CODE GRAVEYARD

function oddNumSequence(length){
  var odds = [];
  for(i=0; i<((length-1)*2); i++){
    if((i%2)){
      odds.push(i);
    }
  } 
  return odds;
}

// number_of_columns-1
var odds = oddNumSequence(11);

*/





