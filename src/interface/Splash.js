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

import Buffer from 'Tone/core/Buffer'
import 'style/splash.css'
import events from 'events'
import Loader from 'interface/Loader'

class Splash extends events.EventEmitter{
	constructor(container){

		super()
		const splash = this._splash = document.createElement('div')
		splash.id = 'splash'
		container.appendChild(splash)

		// the title
		const titleContainer = document.createElement('div')
		titleContainer.id = 'titleContainer'
		splash.appendChild(titleContainer)

		const title = document.createElement('div')
		title.id = 'title'
		title.textContent = 'TIP Piano'
		titleContainer.appendChild(title)

		const subTitle = document.createElement('div')
		subTitle.id = 'subTitle'
		titleContainer.appendChild(subTitle)
		subTitle.textContent = 'Un piano que te responde.'

		this._clicked = false
		const loader = this._loader = new Loader(titleContainer)
		loader.on('click', () => {
			splash.classList.add('disappear')
			this._clicked = true
			this.emit('click')
		})

		/*const howItWorks = document.createElement('div')
		howItWorks.id = 'howItWorks'
		titleContainer.appendChild(howItWorks)
		howItWorks.textContent = 'How it works'
		howItWorks.addEventListener('click', () => {
			this.emit('about')
		})*/

		const badges = document.createElement('div')
		badges.id = 'badges'
		splash.appendChild(badges)


		const tip = document.createElement('a')
		tip.href = 'https://www.fing.edu.uy/tecnoinf/paysandu/index.html'
		tip.target = '_blank'
		tip.id = 'magentaLink'
		tip.classList.add('badge')
		const imgHtml = '<div id="img"></div>'
		tip.innerHTML = imgHtml + '<div id="text">Tecnólogo en Informática</div>'
		badges.appendChild(tip)

		// break
		const break0 = document.createElement('div')
		break0.classList.add('badgeBreak')
		badges.appendChild(break0)

		const utec = document.createElement('a')
		utec.href = 'https://utec.edu.uy/'
		utec.target = '_blank'
		utec.id = 'magentaLink'
		utec.classList.add('badge')
		const imgHtmlUtec = '<div id="imgUtec"></div>'
		utec.innerHTML = imgHtmlUtec + '<div id="text"></div>'
		badges.appendChild(utec)

		/*const privacyAndTerms = document.createElement('div')
		privacyAndTerms.id = 'privacyAndTerms'
		privacyAndTerms.innerHTML = '<a target="_blank" href="https://www.google.com/intl/en/policies/privacy/">Privacy</a><span>&</span><a target="_blank" href="https://www.google.com/intl/en/policies/terms/">Terms</a>'
		splash.appendChild(privacyAndTerms)*/

	}

	get loaded(){
		return this._loader.loaded
	}

	isOpen(){
		return !this._clicked
	}

	show(){
		this._splash.classList.remove('disappear')
	}

	hide(){
		this._splash.classList.add('disappear')
	}
}

export {Splash}