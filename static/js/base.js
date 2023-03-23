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
