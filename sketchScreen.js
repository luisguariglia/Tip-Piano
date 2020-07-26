let system;
let trigger=0;
let maximo=100;
let timer=0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  system = new ParticleSystem(createVector(width / 2, height/2));
  //noStroke();
  background(0);
}
function setY(num) {
  //var octava =document.getElementById("octava").value;
 // notaFinal=num+(12*octava);

 // posY=10+(altura-(notaFinal*altura)/107);
 trigger=maximo;
}
function draw() {
  background(0);
  rotate(cos(timer*0.005)/4);
  if(trigger>=maximo){  
    
  var color=[random(0, 240), random(0, 240), random(0, 240)];
  system.addParticle(color);
   
  trigger=0;
  maximo=random(0, 100);
 
  }else{
  //trigger++;
  }
  timer++;
  
  system.run();
}

// A simple Particle class
let Particle = function(position,colores) {
  this.acceleration = createVector(cos(timer*0.005)*0.0001, cos(timer*0.005)*0.001);
  //this.velocity = createVector(cos(timer*0.005)/4, sin(timer*0.005)/4);
  this.velocity = createVector(0, 0);
  this.position = position.copy();
  this.lifespan = 2000;
  this.colores=colores;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 4
};

// Method to display
Particle.prototype.display = function() {
  stroke(0, this.lifespan);
  //strokeWeight(2);

  //fill(127, this.lifespan);
  //ellipse(this.position.x, this.position.y, 12, 12);
  var tam=this.lifespan;
  fill(this.colores[0],this.colores[1],this.colores[2]);
  rect(this.position.x-tam/2,this.position.y-tam/2, tam, tam);

  aux=tam-20;
  if(aux<=0){
    aux=0;
  }
  fill(this.colores[0],this.colores[1]-20, this.colores[2] -20);
  rect(this.position.x-aux/2,this.position.y-aux/2, aux, aux);
    
  aux2=tam-40;
  if(aux2<=0){
    aux2=0;
  }
  fill(this.colores[0],this.colores[1]-40, this.colores[2] -40);
  rect(this.position.x-aux2/2,this.position.y-aux2/2, aux2, aux2);
  
  //stroke(0);
  //line(this.position.x, this.position.y, this.position.x-tam/2, this.position.y-tam/2);

};


// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function(colores) {
  this.particles.push(new Particle(this.origin,colores));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};
