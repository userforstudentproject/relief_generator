import {Vec} from '../relief_gen/vec.mjs'


class ViewBox {
	static ViewBoxObj = class {
		constructor(onclick, pos, size) {
			this.onclick = onclick
			this.pos = pos
			this.size = size
			this.setNormal()
		}

		ifThePointBelongsToMe(point) {
			const end = this.pos.add(new Vec(this.size.axies[0], this.size.axies[1]))

			let condition = point.axies[0] <= end.axies[0] && point.axies[0] >= this.pos.axies[0]
			condition = condition && point.axies[1] <= end.axies[1] && point.axies[1] >= this.pos.axies[1]
			return condition
		}

		setHover() {
			if(this.drow !== this.drowClick)
				this.drow = this.drowHover ? this.drowHover : () => {}
		}

		setNormal() {
			this.drow = this.drowNormal ? this.drowNormal : () => {}
		}

		setClick() {
			this.drow = this.drowClick ? this.drowClick : () => {}
		}
	}

	static Box = class extends ViewBox.ViewBoxObj {
		drowNormal(canvas) {
			canvas.fillStyle = '#ace60027'
			canvas.fillRect(...this.pos.axies, ...this.size.axies)
			canvas.strokeRect(...this.pos.axies, ...this.size.axies)
		}

		drowHover(canvas) {
			canvas.fillStyle = '#ace600bb'
			canvas.fillRect(...this.pos.axies, ...this.size.axies)
			canvas.strokeRect(...this.pos.axies, ...this.size.axies)
		}

		drowClick(canvas) {
			this.drowHover(canvas)
			canvas.fillStyle = 'black'
			canvas.font = '17px serif'
			canvas.fillText('clicked', ...this.pos.add(new Vec(10, 20)).axies)
		}
	}

	constructor(canvasHTML) {
		this.canvasHTML = canvasHTML
		const canvasSize = this.canvasHTML.getBoundingClientRect()
		this.size = new Vec(canvasSize.width, canvasSize.height)
		this.pos = new Vec(canvasSize.x, canvasSize.y)
		this.canvasHTML.setAttribute('width', canvasSize.width)
		this.canvasHTML.setAttribute('height', canvasSize.height)

		this.canvas = canvasHTML.getContext('2d')
		this.objects = Array()

		this.canvasHTML.addEventListener('mousemove', (e) => {
			this.onMouseEventViewBox(e, 'mousemove')
		})
		
		this.canvasHTML.addEventListener('click', (e) => {
			this.onMouseEventViewBox(e, 'click')
		})
	}

	addObj(obj) {
		this.objects.push(obj)
		this.clear()
		this.drow()
	}
	
	drow() {
		this.objects.forEach((obj) => {
			obj.drow(this.canvas)
		})
	}

	clear() {
		this.canvas.clearRect(0, 0, ...this.size.axies)
	}

	onMouseEventViewBox(e, eventType) {
		/**
		 * eventType: 'click' | 'mousemove'
		 */

		const hoverPosOnCanvas = new Vec(e.clientX - this.pos.axies[0], e.clientY - this.pos.axies[1])
		
		this.objects.forEach((obj) => {
			if(obj.ifThePointBelongsToMe(hoverPosOnCanvas) && eventType === 'mousemove')
				obj.setHover()
			else if(obj.ifThePointBelongsToMe(hoverPosOnCanvas) && eventType === 'click') {
				obj.setClick()
				obj.onclick()
			}
			else
				obj.setNormal()
		})
		
		this.clear()
		this.drow()
		this.drowCursorRect(hoverPosOnCanvas)
	}

	drowCursorRect(pos) {
		this.canvas.strokeRect(...pos.sub(10).axies, 20, 20)
	}
}


export {ViewBox}
