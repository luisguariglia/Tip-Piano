/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Tone from 'Tone/core/Tone'
//import {MidiConvert} from 'midiconvert'
//import { Midi as MidiConvert } from '@tonejs/midi'
import events from 'events'
import { funcion } from "../interface/About.js";
class AI extends events.EventEmitter{
	
	constructor(){
		super()

		this.init();
	}
	init(){
		this.guardarNotas;
		this.guardarMidi;
		this._newTrack()
		//this.guardarNotas=this._track;
		//this.guardarMidi=this._midi;

		this._sendTimeout = -1

		this._heldNotes = {}

		this._lastPhrase = -1
		this._firstPhrase = -1

		this._aiEndTime = 0
	}
	_newTrack(){
		debugger;
		this._midi = new MidiConvert.create()
		//this._midi = new MidiConvert()
		this._track = this._midi.track()
		//this._track = this._midi.addTrack()
	}
	
	send(){
		var element = document.getElementById("cantidad");
		var valor=element.textContent;

		this.tocarMidi();
		return;


		if (this._track.length||this.guardarNotas !== undefined){
			
			if (!this._track.length){
				this.init();
				this._newTrack();
				this._track=null;
				this._track=this.guardarNotas;
				this._midi=this.guardarMidi;
			}else{
				this.guardarMidi=null;
				this.guardarNotas=null;
				this.guardarNotas=this._track;
				this.guardarMidi=this._midi;
			}
			
			this._track.notes.forEach((note) => {
					//console.log(note);
					const now = Tone.now() + 0.05
					if (note.noteOn + now > this._aiEndTime){						
						var chord=Tone.Frequency(note.midi, 'midi').toNote();
						//console.log('chord:'+chord);
						var chord_transpose=Tone.Frequency(chord).transpose(valor).toNote();//3 semitonos
						//console.log('chord_transpose:'+chord_transpose);
						//vuelta a midi
						var note_transpose=Tone.Frequency(chord_transpose).toMidi();
						this._aiEndTime = note.noteOn + now
						this.emit('keyDown', note_transpose, (note.noteOn  ) + (now-this._firstPhrase ))
						console.log("--------------------------")
						console.log("note.noteOn = "+note.noteOn )
						console.log("now = "+now)
						console.log("this._firstPhrase = "+this._firstPhrase)

						note.duration = note.duration * 0.9
						note.duration = Math.min(note.duration, 4)
						this.emit('keyUp', note_transpose, ( note.noteOff ) + (now-this._firstPhrase ))
					}
				})
			let request = this._midi.slice(this._midi.startTime)
			this._newTrack()
			let endTime = request.duration
			//shorten the request if it's too long
			if (endTime > 10){
				request = request.slice(request.duration - 15)
				endTime = request.duration
			}
			let additional = endTime
			additional = Math.min(additional, 8)
			additional = Math.max(additional, 1)
			
			this._lastPhrase = -1
			this.emit('sent')
		}
	}

	keyDown(note, time=Tone.now()){
		//console.log('keyUpAI');
		//console.log('note'+note);
		if (this._track.length === 0 ){//&& this._lastPhrase === -1
			this._lastPhrase = Date.now()
			this._firstPhrase = Tone.now()
			this._newTrack()
		}
		this._track.noteOn(note, time)
		clearTimeout(this._sendTimeout)
		this._heldNotes[note] = true
	}

	keyUp(note, time=Tone.now()){
		//console.log('keyUpAI');
		//console.log('note'+note);
		this._track.noteOff(note, time)
		delete this._heldNotes[note]
		// send something if there are no events for a moment
		if (Object.keys(this._heldNotes).length === 0){
			if (this._lastPhrase !== -1 && Date.now() - this._lastPhrase > 3000){
				//just send it
				//this.send()
			} else {
				//this._sendTimeout = setTimeout(this.send.bind(this), 600 + (time - Tone.now()) * 1000)
			}
		}
	}
	tocarMidi(){
		var element = document.getElementById("cantidad");
		var valor=element.textContent;

		var midiImportado=null;
		midiImportado=funcion();
		
		if(midiImportado!=null){
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

				//const now = Tone.now() + 0.5
				midiImportado.tracks.forEach(track => {
				//console.log("UN TRACK");
				this.init();
				this._newTrack();
				this._track=null;
				this._track=track;
				
				
				this._track.notes.forEach((note) => {
						//alert("una nota");
						console.log("NOTA:"+JSON.stringify(note));						
						const now = Tone.now() + 0.05
									
						var chord=Tone.Frequency(note.midi, 'midi').toNote();
						var chord_transpose=Tone.Frequency(chord).transpose(valor).toNote();//3 semitonos
						//vuelta a midi
						var note_transpose=Tone.Frequency(chord_transpose).toMidi();
						this._aiEndTime = note.noteOn + now
						this.emit('keyDown', note_transpose, now+note.time)
						note.duration = note.duration * 0.9
						note.duration = Math.min(note.duration, 4)
						this.emit('keyUp', note_transpose, now+note.time)
							
					})
			})			
			
			////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		}else{
			alert("midi es null");
		}
	}
	
}

export {AI}