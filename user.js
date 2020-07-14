
var ampEnv = new Tone.AmplitudeEnvelope().toMaster();
var phaser = new Tone.Phaser({
  "frequency" : 15,
  "octaves" : 1,
  "baseFrequency" : 500
}).toMaster();
var osc = new Tone.Oscillator().chain(ampEnv,phaser).start();
var inicio=false;
function tocar(nota){
  if (inicio==true) {
  var attack = document.getElementById("attack").value/100;   
  var decay = document.getElementById("decay").value/100;   
  var sustain = document.getElementById("sustain").value/100;   
  var release = document.getElementById("release").value/100; 

  var tipo=document.getElementById("tipo").value ;

 
  var depth = document.getElementById("depth").value;  

  phaser.baseFrequency=depth;

  var duracion =document.getElementById("duracion").value;  
  var octava =document.getElementById("octava").value;  

  ampEnv.attack=attack;
  ampEnv.decay=decay;
  ampEnv.sustain=sustain;
  ampEnv.release=release;
  
  var notaFinal=nota;
  notaFinal=notaFinal+(12*octava);
  osc.frequency.value = Tone.Frequency(notaFinal, "midi");
  osc.volume.value=0.5;
  osc.type=tipo;
  ampEnv.triggerAttackRelease("8t");
  visual(nota);
  }
}

function actualizar() {
  if (Tone.context.state !== 'running') {
    Tone.context.resume();
  }
  inicio=true;
  var attack = document.getElementById("attack").value/100;   
  var decay = document.getElementById("decay").value/100;   
  var sustain = document.getElementById("sustain").value/100;   
  var release = document.getElementById("release").value/100;

  document.getElementById("attackShow").innerHTML=attack;   
  document.getElementById("decayShow").innerHTML=decay;   
  document.getElementById("sustainShow").innerHTML=sustain;   
  document.getElementById("releaseShow").innerHTML=release;   

  var depth = document.getElementById("depth").value/10; 

  document.getElementById("depthShow").innerHTML=depth;   

  var duracion =document.getElementById("duracion").value;  
  document.getElementById("duracionShow").innerHTML=duracion;  
  
  var octava =document.getElementById("octava").value;  
  document.getElementById("octavaShow").innerHTML=octava;  

}
function visual(nota) {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var elem = document.getElementById("container");   
    //elem.style.backgroundColor="#"+((1<<24)*Math.random()|0).toString(16);
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
function random() {
  document.getElementById("attack").value=getRandomFloat(0,100);   
  document.getElementById("decay").value=getRandomFloat(0,100);   
  document.getElementById("sustain").value=getRandomFloat(0,100);   
  document.getElementById("release").value=getRandomFloat(0,100); 
 
  document.getElementById("depth").value=getRandomFloat(0,100);  
   
  document.getElementById("duracion").value=getRandomFloat(1,10);  
  document.getElementById("octava").value=getRandomInt(-2,2);  

  document.getElementById("octava").value=getRandomInt(-2,2); 

  var tipo = ["sine", "square", "sawtooth", "triangle"];
  document.getElementById("tipo").value= tipo[getRandomInt(0,3)];

  actualizar();
}
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function iniciar(){
  actualizar();
  document.getElementById("modal-inicio").style.display="none";
  document.getElementById("opciones").style.opacity=1;
}