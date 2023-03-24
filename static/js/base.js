class Popup {
	constructor(popup, trigger, modificator) {
		this.popup = popup
		this.trigger = trigger
		this.opened = false
		this.modificator = modificator
	}

	open(time) {
		if(this.opened)
			return;

		this.opened = true
		this.time = time
		this.popup.classList.add(this.modificator)
	}

	close(time) {
		if(!this.opened || time <= this.time)
			return;

		this.opened = false
		this.popup.classList.remove(this.modificator)
	}
}

class PopupGroup {
	static popupGroups = Array()

	constructor(popupClass, triggerClass, popupModificatorClass) {
		this.popups = Array(...document.getElementsByClassName(popupClass)).map((popup) => {
			return new Popup(popup, popup.getElementsByClassName(triggerClass)[0], popupModificatorClass)
		})
		
		console.log(Array(...document.getElementsByClassName(popupClass)))
		console.log(this.popups)

		for(const popup of this.popups) {
			popup.trigger.addEventListener('click', (e) => {
				popup.open(e.timeStamp)
			})
		}

		PopupGroup.popupGroups.push(this);
	}

	static closePopup(e) {
		for(const popupG of this.popupGroups) {
			for(const popup of popupG.popups) {
				if(!popup.opened)
					continue;

				if(!popup.popup.contains(e.target) || e.target === popup.trigger)
					popup.close(e.timeStamp);
			}
		}
	}
}


document.addEventListener('click', (e) => {
	PopupGroup.closePopup(e)
})


class Lang {
	static langs = new Map()

	static createLang(langName, translationNameTranslateMap) {
		this.langs.set(langName, new Map(translationNameTranslateMap))
	}

	static changeLang(langName) {
		const translateMap = this.langs.get(langName)
		translateMap.forEach((val, key) => {
			const elementToTranslate = document.querySelector(`[translation-id="${key}"]`)
			// elementsToTranslate.forEach((element) => {element.innerHtml = val})
			if(elementToTranslate)
				elementToTranslate.innerHTML = val;
		})

		this.nowLangName = langName
		const langNames = Array(...this.langs.keys())
		const nextLang = langNames[langNames.indexOf(this.nowLangName) + 1]
		
		if(!nextLang)
			this.nextLangName = langNames[0];
		else
			this.nextLangName = nextLang;
	}
}
