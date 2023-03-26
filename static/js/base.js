class Popup {
	constructor(popup, openTriggers, closeTriggers, openModificatorClassName) {
		/**
		* popup: HTMLElement
		* openTriggers: Array(HTMLElement, ...)
		* closeTriggers: Array(HTMLElement, ...)
		* openModificatorClassName: String
		*/
		this.popup = popup
		this.openTriggers = openTriggers
		this.closeTriggers = closeTriggers
		this.modificator = openModificatorClassName
		this.opened = false

		for(const openTrigger of this.openTriggers) {
			openTrigger.addEventListener('click', (e) => {
				this.open(e.timeStamp)
			})
		}
		
		for(const closeTrigger of this.closeTriggers) {
			closeTrigger.addEventListener('click', (e) => {
				this.close(e.timeStamp)
			})
		}
	}

	open(time) {
		/**
		* time: number
		* time it is timeStamp of Event
		*/
		if(this.opened)
			return;

		this.opened = true
		this.time = time
		this.popup.classList.add(this.modificator)
	}

	close(time) {
		/**
		* time: number
		* time it is timeStamp of Event
		*/
		if(!this.opened || time <= this.time)
			return;

		this.opened = false
		this.popup.classList.remove(this.modificator)
	}

	static createPopups(popupClassName, openTriggerClassNames, closeTriggerClassNames, openModificatorClassName) {
		/**
		* createPopups static method which create Popup objects from class names of html elements
		*
		* popupClassName: String
		* openTriggerClassNames: Array(String, ...) | String
		* closeTriggerClassNames: Array(String, ...) | String
		* openModificatorClassName: String
		*/
		const popupsHTML = document.getElementsByClassName(popupClassName)
		const popups = Array()
		const getByClassNames = (fromHTMLElement, classNames) => {
			classNames = (classNames instanceof Array) ? classNames : [classNames]
			let res = Array()
			for(const className of classNames) {
				const elementsOfClassName = fromHTMLElement.getElementsByClassName(className)
				res = res.concat(Array.from(elementsOfClassName))
			}
			return res
		}

		for(const popupHTML of popupsHTML) {
			const openTriggers = getByClassNames(popupHTML, openTriggerClassNames)
			const closeTriggers = getByClassNames(popupHTML, closeTriggerClassNames)
			const popup = new Popup(popupHTML, openTriggers, closeTriggers, openModificatorClassName)
			popups.push(popup)
		}

		return popups
	}

	static createPullToClosePopups(popups, eventTargetHTML) {
		/**
		 * createPullToClosePopups it is static method which create global event(on eventTargetHTML) to close popups
		 * when you click out of popup
		 */

		eventTargetHTML.addEventListener('click', (e) => {
			const openedPopups = popups.filter((popup) => {
				return popup.opened
			})

			for(const popup of openedPopups) {
				if(!popup.popup.contains(e.target))
					popup.close(e);
			}
		})
	}
}


class Lang {
	static langs = new Map()

	static createLang(langName, translationNameTranslateMap) {
		/** createLang create Lang Map
		 * <teg translation-id="some-id"></teg>
		 * you need named your lang map: For exmaple "en"
		 * translationNameTranslateMap: [['some-id', 'text of HTMLElement with attr translation-id'], ...]
		 */
		this.langs.set(langName, new Map(translationNameTranslateMap))
	}

	static changeLang(langName) {
		/** this method change content of html elements with translation-id attr
		 * for lang map that named langName
		 * langName: String
		 */
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
