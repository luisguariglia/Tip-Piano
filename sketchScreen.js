let x, y;
let player;
let to;
let cont=0;
var posY=0;
var altura=0;

function setup() {
  altura=windowHeight;
  createCanvas(windowWidth, altura);
  noStroke();
  x = width / 2;
  y = height/2;
  player=color(66, 200, 245);
  from=color(66, 200, 245);
  to=color(66, 200, 245);
}
function setY(num) {
  posY=10+(altura-(num*altura)/107);
}
function draw() {
  clear();
  //posY=mouseY;
  if(posY>height-150){
    posY=height-150;
  };
  if(posY<10){
    posY=10;
  };
  if (cont==100) {
      cont=0;
      to=color( random(255),  random(255),  random(255));      
  }else{
    cont++;
  }
  player = lerpColor(player, to, 0.1);
  fill(player);
  bezier(
      x,  
      y-200+posY,
      
      x-200-(posY*0.5),
      y+240,
      x+200+(posY*0.5),
      y+240,
      
      x,
      y-200+posY
  );
  
  
  arc(x-25, height-90, 20+posY*0.1, 180, 0, PI);
  arc(x+25, height-90, 20+posY*0.1, 180, 0, PI);
  //ellipse(x+25, y+150, 20, 100);
  //ellipse(x-25, y+150, 20, 100);
  
  fill(color( 255,  255,  255)); 
  ellipse(x+25, y+50+posY/4, 20, 20);
  ellipse(x-25, y+50+posY/4, 20, 20);
  
  //fill(color( 0,  0,  0));
  //ellipse(x+25, y+50+posY/4, 10, 10);
  //ellipse(x-25, y+50+posY/4, 10, 10);
  
  fill(color( 0,  0,  0));
  ellipse(x, y+100+posY/5, 30, 20+(height-posY)*0.08);
  
  
  fill(player);
  angle1 = (mouseX / float(width) - 0.5) * -TWO_PI;
  angle2 = (mouseY / float(height) - 0.5) * PI;
  ellipse(x+100-(posY*0.1), y+70-posY/15, 20, 20);
  ellipse(x-100+(posY*0.1), y+70-posY/15, 20, 20);

  
}