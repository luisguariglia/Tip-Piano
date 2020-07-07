function tocar(nota){
/*const synth = new Tone.MembraneSynth().toMaster();

synth.triggerAttackRelease("C2", "8n");*/
var synth = new Tone.Synth().toMaster();
synth.triggerAttackRelease(Tone.Frequency(nota, "midi").toNote(), "8n");
myMove();
}

function myMove() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var elem = document.getElementById("container");   
    elem.style.backgroundColor="#"+((1<<24)*Math.random()|0).toString(16);
}