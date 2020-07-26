var inicio=false;
let x, y;
let player;
let to;
let toColor;
let cont=0;
var posY=0;
var futureY=0
var altura=0;
var ancho=0;

var tiempo=0;
var tamañoExtra=0;
var parpadeoCont=0;
var parpadeo=100;
var parpadeoClose=10;
var parpadeoCloseCont=0;


var saltando=0; // 0 1 -1
var cantidadDeSalto=15;
var contSalto=0;
var tiempoEntreSalto=0;
var contTiempoEntreSalto=0;

var tamañoBoca=2;



var cantando=1;
var cantandoBool=false;
//var tiempoCantando=25;

/*
var notasALaVez= [];*/


function setup() {  
  altura=windowHeight-(windowHeight*(0.4));     //alto y margen
  if(altura>384)       //640-(640*0.4)
  {
    altura=384;
  }
  ancho=windowWidth-(windowWidth*0.1);
  if(ancho>750)  //esto es el maxwith
  {
    ancho=750;
  }
  createCanvas(ancho, altura);
  noStroke();
  x = width / 2;
  y = height/2-10;
  player=color(66, 200, 245);
  from=color(66, 200, 245);
  to=color(66, 0, 245);
  posY=ancho/4;
  futureY=ancho/4;
  frameRate(60);
}
function iniciar(){
  inicio=true;
}
function dejarDeTocar(num) {
  if(inicio){
  cantando--;
  /*var nota=(num%12)+1;
    for(var i=0;i<notasALaVez.length;i++){
      if(notasALaVez[i]==nota){
        notasALaVez.splice(i, 1);
      }
    }*/
  //print(notasALaVez);
  
  if(cantando<1){
    cantando=1;
  }
  if(cantando==1){
    notasALaVez= [];
    cantandoBool=false;
  }
}
}
function setY(num) {
  if(inicio){
  //var octava =document.getElementById("octava").value;
  //notaFinal=num+(12*octava);
  //var nota=(num%12)+1;
  //var yaHay=false;
  /*for(var i=0;i<notasALaVez.length;i++){
    if(notasALaVez[i]==nota){
      yaHay=true;
    }
  }*/
  //if(!yaHay){
  //notasALaVez.push(nota);
  //}

 // print(notasALaVez);
  cantando++;
  cantandoBool=true;
  futureY=10+(altura-(num*altura)/107);

  }
}
function draw() {
  clear();
  noStroke();
  //posY=mouseY;
  posY=lerp(posY, futureY, 0.5)
  if(posY>height-150){
    posY=height-150;
  };
  if(posY<20){
    posY=20;
  };
  tiempo++;
  
  if(contSalto>=cantidadDeSalto){  //top
    saltando=-1;
  }
  if(saltando==-1&&contSalto<=0){  //toco el piso
    saltando=0;
    contSalto=0;
  }
  if(saltando==1){
  contSalto++;
  y-=1;
  }
  if(saltando==-1){
  contSalto--;
  y+=1;
  }
  contTiempoEntreSalto++;
  if (cantandoBool) {
    tamañoExtra=sin((tiempo*0.3)*(cantando*0.5))*2;
    if(saltando==0 && contTiempoEntreSalto>=tiempoEntreSalto){
      saltando=1;
      contTiempoEntreSalto=0;
      tiempoEntreSalto=random(50,120);
    }
  }else{
    tamañoExtra=0;
  }
  /*if(cantandoCont>=tiempoCantando){
    cantando=0;
    cantandoCont=0;
  }*/

  //sombra
  fill(0,0,0,5*(y*0.05)+(posY*0.2));
  ellipse(x, height-10, 30*(y*0.02)+(posY*0.2), 5*(y*0.02));
  
  //piernas
  fill(0);
  arc(x-25, y*2-88, 22+posY*0.1, 200, 0, PI);
  arc(x+25, y*2-88, 22+posY*0.1, 200, 0, PI);
  fill(player);
  arc(x-25, y*2-90, 20+posY*0.1, 199, 0, PI);
  arc(x+25, y*2-90, 20+posY*0.1, 199, 0, PI);

  //cuerpo
  if (cont==100) {
      cont=0;
      to=color( random(255),  random(255),  random(255));      
  }else{
    cont++;
  }
  //toColor=color((int)(to[0]),(int)(to[1]),(int)(to[2]));

  /*player = color(lerp((int)(player[0]),(int)(to[0]),0.1),
  lerp((int)(player[1]),(int)(to[1]),0.1),
  lerp((int)(player[2]),(int)(to[2]),0.1)
  );*/
    //player=toColor;
  player = lerpColor(player, to, 0.1);


  fill(0);
  bezier(
      x,  
      y-198+posY,
      
      x-202-(posY*0.5)-tamañoExtra,
      y+242,
      x+202+(posY*0.5)+tamañoExtra,
      y+242,
      
      x,
      y-198+posY
  );
  fill(player);
  bezier(
      x,  
      y-200+posY,
      
      x-200-(posY*0.5)-tamañoExtra,
      y+240,
      x+200+(posY*0.5)+tamañoExtra,
      y+240,
      
      x,
      y-200+posY
  );
  
  
  //ojos
  fill(0); 
  ellipse(x+25, y+51+posY/4, 20, 22+cantando);
  ellipse(x-25, y+51+posY/4, 20, 22+cantando);
  
  fill(color( 255,  255,  255)); 
  if(parpadeoCont>=parpadeo){     //parpadeo
    ellipse(x+25, y+50+posY/4, 20, 0);
    ellipse(x-25, y+50+posY/4, 20, 0);
    parpadeoCloseCont++;
    if(parpadeoCloseCont>=parpadeoClose){
      parpadeoCont=0;
      parpadeo=50+random(500);
    }
  }else{
    ellipse(x+25, y+50+posY/4, 20, 20+cantando);
    ellipse(x-25, y+50+posY/4, 20, 20+cantando);
    parpadeoCont++;
    parpadeoCloseCont=0;
  }
 
  //boca 
  fill(color( 0,  0,  0)); 
  if (cantandoBool) {
   
    fill(color( 0,  0,  0)); 
    //ellipse(x, y+100+posY/5, 30, 25+(height-posY)*0.08);
    arc(x,y+70+posY*0.3, 40*tamañoBoca, (25+(height-posY)*0.15)*(tamañoBoca*0.5), 0, PI);
    
    stroke(255);
    strokeWeight(2)
    var ancho=(60)*tamañoBoca;
    var inicio=x-ancho/4;
    var fin=x+ancho/4;
    var auxY=y+85+posY*0.3;
    for(var i=0;i<ancho/2;i++){
      stroke(255,i*40);
      if(i>ancho/4){
        stroke(255,(ancho/2-i)*40);
      }
      line(inicio+i, auxY+sin(i*0.5+tiempo)*(4+(((height/2)-posY)*0.05)),
           inicio+i+1,auxY+sin((i+1)*0.5+tiempo)*(4+(((height/2)-posY)*0.05)));
    }       
    noStroke();
 
    
  }else{
    ellipse(x, y+100+posY/5, 30*(tamañoBoca*0.5), 5*(tamañoBoca*0.5));
  }
  //manos
  
  //animacion extra
  if(contTiempoEntreSalto>900&&contTiempoEntreSalto<1000){
    fill(0);
    ellipse(x+100-(posY*0.1)+sin(tiempo*0.3)*2, y+71-posY/15, 20, 22);
    ellipse(x-100+(posY*0.1), y+71-posY/15, 20, 22);
    fill(player);
    ellipse(x+100-(posY*0.1)+sin(tiempo*0.3)*2, y+70-posY/15, 20, 20);
    ellipse(x-100+(posY*0.1), y+70-posY/15, 20, 20);

  }else{
    fill(0);
    ellipse(x+100-(posY*0.1)+tamañoExtra, y+71-posY/15, 20, 22);
    ellipse(x-100+(posY*0.1)+tamañoExtra, y+71-posY/15, 20, 22);
    fill(player);
    ellipse(x+100-(posY*0.1)+tamañoExtra, y+70-posY/15, 20, 20);
    ellipse(x-100+(posY*0.1)+tamañoExtra, y+70-posY/15, 20, 20);
  }
  if(contTiempoEntreSalto>1000){
  contTiempoEntreSalto=0;
  }

}