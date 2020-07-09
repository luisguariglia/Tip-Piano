function tocar(nota){
/*const synth = new Tone.MembraneSynth().toMaster();

synth.triggerAttackRelease("C2", "8n");*/
var synth = new Tone.Synth().toMaster();
synth.triggerAttackRelease(Tone.Frequency(nota, "midi").toNote(), "8n");
visual(nota);
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