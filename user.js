function tocar(nota){
  var attack = document.getElementById("attack").value/100;   
  var decay = document.getElementById("decay").value/100;   
  var sustain = document.getElementById("sustain").value/100;   
  var release = document.getElementById("release").value/100; 

  var maxDelay = document.getElementById("maxDelay").value/100;
  var frequency = document.getElementById("frequency").value/10;   
  var depth = document.getElementById("depth").value/10;  
   
  var duracion =document.getElementById("duracion").value/10;  
  var octava =document.getElementById("octava").value;  

  var freeverb = new Tone.Freeverb().toMaster();
  freeverb.dampening.value = 200;

  var vibrato =new Tone.Vibrato({
    maxDelay : maxDelay ,
    frequency : frequency ,
    depth : depth ,
    type : "sine"
  }); 
  var phaser = new Tone.Phaser({
    "frequency" : 15,
    "octaves" : 1,
    "baseFrequency" : 500
  }).toMaster();
  
  var ampEnv = new Tone.AmplitudeEnvelope({
      "attack": attack,
      "decay": decay,
      "sustain": sustain,
      "release": release
  }).toMaster();
  
  var notaFinal=nota;
  notaFinal=notaFinal+(12*octava);
  var osc = new Tone.Oscillator(Tone.Frequency(notaFinal, "midi")).chain(vibrato,ampEnv).start();
  ampEnv.triggerAttackRelease(duracion);
  visual(nota);
}
function actualizar() {
  var attack = document.getElementById("attack").value/100;   
  var decay = document.getElementById("decay").value/100;   
  var sustain = document.getElementById("sustain").value/100;   
  var release = document.getElementById("release").value/100;

  document.getElementById("attackShow").innerHTML=attack;   
  document.getElementById("decayShow").innerHTML=decay;   
  document.getElementById("sustainShow").innerHTML=sustain;   
  document.getElementById("releaseShow").innerHTML=release;   

  var maxDelay = document.getElementById("maxDelay").value/100;   
  var frequency = document.getElementById("frequency").value/10;   
  var depth = document.getElementById("depth").value/10; 

  document.getElementById("maxDelayShow").innerHTML=maxDelay;   
  document.getElementById("frequencyShow").innerHTML=frequency;   
  document.getElementById("depthShow").innerHTML=depth;   

  var duracion =document.getElementById("duracion").value;  
  document.getElementById("duracionShow").innerHTML=duracion;   

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