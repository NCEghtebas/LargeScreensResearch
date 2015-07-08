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

var circle_number = 48 ;
var my_div = null;
var mainDiv = null;
var column = null;
var sq = null;
var position_array = calculateGrid();

function calculateGrid(){
    
}

//TODO: make border only 1 px thick
function generateGrid(r, c)
{
  container = document.getElementById('container');
  var i=0,id;
  var k= 1;
  for(j=0; j<c; j++) {
      column = document.createElement("div");
      column.setAttribute('id', 'Column' + (j+1));  
      column.setAttribute('style', 'float:left; border:1px solid black');
      column.style.width = String(Math.round(1/c*100)) + '%';//window.innerWidth/c;
      column.style.height = '100%';

      for(i=0; i<r; i++) {
          sq = document.createElement("div");
          sq.setAttribute('id', "sq" + k);  
          sq.setAttribute('style', 'border:1px solid black');
          sq.style.height = String(Math.round(1/r*100)) +'%';
          sq.style.width = '100%';

          k++;
          column.appendChild(sq);
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
        circle.setAttribute('style', 'position: absolute; background-color: red; width: 100px; height: 100px; border-radius: 100px; border: 3px solid black');
        circle.setAttribute('onmousedown' ,'mydragg.startMoving(this,"container",event);');
        circle.setAttribute('onmouseup', 'mydragg.stopMoving("container");');
        container.appendChild(circle);
    }
}

generateCircles(circle_number);

generateGrid(5,7);





