
var contNotas=0;
var notas = [];
class Sintetizador {
  constructor(nota) {
    this.octava=0
    this.nota=nota;
    this.synth = new Tone.MonoSynth({
      oscillator: {
        type: "square"
      },
      envelope: {
        attack: 0.5,
        release: 0.5
      }}).toMaster();
  }
  tocar(){
    this.synth.triggerAttack(Tone.Frequency(this.nota+(12*this.octava), "midi"));
  }
  tocarUp(){
    this.synth.triggerRelease();
  }
  setType(tipo){
    this.synth.oscillator.type=tipo;
  }
  setAttack(num){
    this.synth.envelope.attack=num;
  }
  setRelease(num){
    this.synth.envelope.release=num;
  }
  setOctava(num){
    this.octava=num;
  }
  setVol(num){
    this.synth.oscillator.volume.value=num;  //-25 es mas bajito  //100 explota el parlante
  }
}

var inicio=false;

function tocar(nota){
  if (inicio==true) {
  contNotas++;
  this.notas[nota].tocar();
  this.notas[nota].setVol(contNotas*-5);
  //(contNotas*-5);
  visual(nota);
  //osc.volume.value=0.5;

  }
}
function tocarUp(nota){
  if (inicio==true) {
    contNotas--;
    if(contNotas<0){
      contNotas=0;
    }
  this.notas[nota].tocarUp();
  }
}

function actualizar() {
  inicio=true;
  var attack = document.getElementById("attack").value/100;   
  var release = document.getElementById("release").value/100;
  var octava =document.getElementById("octava").value; 
  var tipo=document.getElementById("tipo").value ;

  
  document.getElementById("attackShow").innerHTML=attack;   
  document.getElementById("releaseShow").innerHTML=release;   
  document.getElementById("octavaShow").innerHTML=octava;  

  for(var i=20;i<110;i++){
    this.notas[i].setAttack(attack);
    this.notas[i].setType(tipo);
    this.notas[i].setOctava(octava);
    this.notas[i].setRelease(release);
  }
}
function visual(nota) {
    //var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var elem = document.getElementById("container");   
    var color=nota%12;
    switch(color) {
        case 0:
            elem.style.backgroundColor="red";
          break;
        case 1:
            elem.style.backgroundColor="purple";
          break;
          case 2:
            elem.style.backgroundColor="yellow";
          break;
          case 3:
            elem.style.backgroundColor="LightSteelBlue";
          break;
          case 4:
            elem.style.backgroundColor="SkyBlue";
          break;
          case 5:
            elem.style.backgroundColor="DarkRed";
          break;
          case 6:
            elem.style.backgroundColor="Violet";
          break;
          case 7:
            elem.style.backgroundColor="orange";
          break;
          case 8:
            elem.style.backgroundColor="BlueViolet";
          break;
          case 9:
            elem.style.backgroundColor="green";
          break;
          case 10:
            elem.style.backgroundColor="Magenta";
          break;
          case 11:
            elem.style.backgroundColor="blue";
          break;

        default:
            elem.style.backgroundColor="#"+((1<<24)*Math.random()|0).toString(16);
      }
}
document.getElementById("random").addEventListener("click", function(){

  document.getElementById("attack").value=getRandomFloat(0,100);   
  document.getElementById("release").value=getRandomFloat(0,100); 
  document.getElementById("octava").value=getRandomInt(-2,2); 

  var tipo = ["sine", "square", "sawtooth", "triangle"];
  document.getElementById("tipo").value= tipo[getRandomInt(0,3)];

  actualizar();
});
function myFunction() {
  document.getElementById("demo").innerHTML = "Hello World";
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function iniciar(){
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  for(var i=20;i<110;i++){
    mySin = new Sintetizador(i);
    this.notas[i]=mySin;
  }
  socket.emit('join', document.getElementById("sala").value);
  actualizar();
  document.getElementById("modal-inicio").style.display="none";
  document.getElementById("opciones").style.opacity=1;
  
}