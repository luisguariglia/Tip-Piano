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

import 'style/about.css'
//import YouTubeIframeLoader from 'youtube-iframe'
import events from 'events'

const magentaLink = 'https://magenta.tensorflow.org/'
const tfLink = 'https://www.tensorflow.org/'
const toneLink = 'https://github.com/Tonejs/Tone.js'
const sourceCode = 'https://github.com/googlecreativelab/aiexperiments-ai-duet'

const blurbCopy = `Built by Yotam Mann with friends on the Magenta and Creative Lab teams at Google. 
					It uses <a target='_blank' href='${tfLink}'>TensorFlow</a>,
					<a target='_blank' href='${toneLink}'>Tone.js</a> and tools 
					from the <a target='_blank' href='${magentaLink}'>Magenta project</a>. 
					The open-source code is <a target='_blank' href='${sourceCode}'>available here</a>.
					Click the keyboard, use your computer keys, or even plug in a MIDI keyboard.`
var midiExportar;

export class About extends events.EventEmitter{
	constructor(container){
		var cantidad=0;
		var cantidadOctava=4;
		super()

		this._container = document.createElement('div')
		this._container.id = 'about'
		container.appendChild(this._container)

		//importar midi--------------------------------

		this._divImportar = document.createElement('div');
		this._divImportar.id='divImportar';	
		this._divImportar.innerHTML=`
		<div class="divContenido">	
					
			<div id="FileDrop">			
				<div id="Text">				
					Arrastre archivo midi aquí	
				</div>			
				<input type="file" accept="audio/midi">		
			</div>		
			<div id="Results">			
				<textarea id="ResultsText" style="width:0px;height:0px;visibility: hidden;" placeholder="json output..."></textarea>		
			</div>		
			<tone-play-toggle disabled></tone-play-toggle>	

		</div>`;
		this._divImportar.classList.add('open');
		container.appendChild(this._divImportar);

		if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
			document.querySelector("#FileDrop #Text").textContent = "Reading files not supported by this browser";
		} else {

			const fileDrop = document.querySelector("#FileDrop")

			fileDrop.addEventListener("dragenter", () => fileDrop.classList.add("Hover"))

			fileDrop.addEventListener("dragleave", () => fileDrop.classList.remove("Hover"))

			fileDrop.addEventListener("drop", () => fileDrop.classList.remove("Hover"))

			document.querySelector("#FileDrop input").addEventListener("change", e => {
				//get the files
				const files = e.target.files
				if (files.length > 0){
					const file = files[0]
					document.querySelector("#FileDrop #Text").textContent = file.name
					parseFile(file)
				}
			})
		}

		let currentMidi = null

		function parseFile(file){
			//read the file
			const reader = new FileReader()
			reader.onload = function(e){
				const midi = new Midi(e.target.result)
				document.querySelector("#ResultsText").value = JSON.stringify(midi, undefined, 2)
				document.querySelector('tone-play-toggle').removeAttribute('disabled')
				currentMidi = midi
				midiExportar = currentMidi
				
				//localStorage.setItem('midi', JSON.stringify(currentMidi));
			}
			reader.readAsArrayBuffer(file)
		}

		const synths = []
		document.querySelector('tone-play-toggle').addEventListener('play', (e) => {
			const playing = e.detail
			if (playing && currentMidi){
				//alert(currentMidi.tracks);
				const now = Tone.now() + 0.5
				currentMidi.tracks.forEach(track => {
					//create a synth for each track
					const synth = new Tone.PolySynth(10, Tone.Synth, {
						envelope : {
							attack : 0.02,
							decay : 0.1,
							sustain : 0.3,
							release : 1
						}
					}).toMaster()
					synths.push(synth)
					//schedule all of the events
					track.notes.forEach(note => {
						synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity)
					})
				})
			} else {
				//dispose the synth and make a new one
				while(synths.length){
					const synth = synths.shift()
					synth.dispose()
				}
			}
		})





		//fin inportar midi-------------------------------

		//botones de octavas
		
		this._BotonMasOctava = document.createElement('div')
		this._BotonMasOctava.id = 'botonMasOctava'
		this._BotonMasOctava.classList.add('open')
		container.appendChild(this._BotonMasOctava)
		this._BotonMasOctava.addEventListener('click', (e) => {
			e.preventDefault()
			if (this.isOpen()){
				this.close()
			} else {
				cantidadOctava++;
				cantidadOctava=cantidadOctava%5;			
				localStorage.setItem('octava', cantidadOctava-2);
			}
		})
		//botones de semitonos
		this.cantidad = document.createElement('div')
		this.cantidad.id = 'cantidad'
		this.cantidad.classList.add('open')
		//this.cantidad.classList.add('open')
		container.appendChild(this.cantidad)

		this._BotonMas = document.createElement('div')
		this._BotonMas.id = 'botonMas'
		this._BotonMas.classList.add('open')
		container.appendChild(this._BotonMas)
		this._BotonMas.addEventListener('click', (e) => {
			e.preventDefault()
			if (this.isOpen()){
				this.close()
			} else {
				if(cantidad>=12){
					cantidad=12;
				}else{
					cantidad++;
				}
				
				
				this.cantidad.innerHTML="<p style='z-index: 5000;color:white;'>"+cantidad+"</p>";
				//this.open()
			}
		})
		this._BotonMenos = document.createElement('div')
		this._BotonMenos.id = 'botonMenos'
		this._BotonMenos.classList.add('open')
		container.appendChild(this._BotonMenos)
		this._BotonMenos.addEventListener('click', (e) => {
			e.preventDefault()
			if (this.isOpen()){
				this.close()
			} else {
				if(cantidad<=-12){
					cantidad=-12;
				}else{
					cantidad--;
				}
				this.cantidad.innerHTML="<p style='z-index: 5000;color:white;'>"+cantidad+"</p>";
				//this.open()
			}
		})
		
		
		//
		this._toggleButton = document.createElement('div')
		this._toggleButton.id = 'aboutButton'
		this._toggleButton.classList.add('open')
		container.appendChild(this._toggleButton)
		this._toggleButton.addEventListener('click', (e) => {
			e.preventDefault()
			if (this.isOpen()){			//esto siempre entra en fase
				this.close()
				
			} else {
				this.open()  
			}
		})

		const content = document.createElement('div')
		content.id = 'content'
		this._container.appendChild(content)

		const title = document.createElement('div')
		title.id = 'title'
		title.textContent = 'TIP Piano'
		//content.appendChild(title)

		const video = document.createElement('div')
		video.id = 'video'
		//vid YT0k99hCY5I 
		video.innerHTML = `<iframe id='youtube-iframe' src="https://www.youtube.com/embed/0ZE1bfPtvZo?modestbranding=0&showinfo=0&enablejsapi=1" frameborder="0" allowfullscreen></iframe>`
		content.appendChild(video)

		this._ytplayer = null

		this._playButton = document.createElement('div')
		this._playButton.id = 'playButton'
		this._playButton.classList.add('visible')
		video.appendChild(this._playButton)

		const blurb = document.createElement('div')
		blurb.id = 'blurb'
		content.appendChild(blurb)
		blurb.innerHTML = blurbCopy

	}
	close(){
		
		this._toggleButton.classList.remove('close')
		this._toggleButton.classList.add('open')

		this._container.classList.remove('visible')

		if (window.ga){
			ga('send', 'event', 'AI-Duet', 'Click', 'About - Close')
		}
	}
	open(play=false){
		
		this.emit('open')
	}
	// waits until the player is ready to play the video, 
	// otherwise goes back into waiting loop
	_playVideo(retries=0){
		if (this._ytplayer && this._ytplayer.playVideo){
			this._ytplayer.playVideo()
		} else if (retries < 10 && this.isOpen()){
			setTimeout(() => this._playVideo(retries+1), 200);
		}	
	}
	isOpen(){
		
		return this._container.classList.contains('visible')
	}
	showButton(){
		
		this._toggleButton.classList.add('show')
		this._BotonMas.classList.add('show')
		this._BotonMasOctava.classList.add('show')
		this._BotonMenos.classList.add('show')
		this.cantidad.classList.add('show')
		this._divImportar.classList.add('show')
	}
	
	
}
export function funcion() {
	return midiExportar;
}
