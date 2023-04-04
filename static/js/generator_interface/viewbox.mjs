class ViewBox {
	static ViewBoxObj = class {
		isHover = false
		
		constructor(onclick, pos, size) {
			this.onclick = onclick
			this.pos = pos
			this.size = size
		}

		isPointIntersectSelf(point) {
		}
	}

	static Box = class extends ViewBox.ViewBoxObj {
		drow(canvas: CanvasRenderingContext2D) {
			canvas.fillStyle = '#ace60027'
			canvas.fillRect(...this.pos.axies, ...this.size.axies)
			canvas.strokeRect(...this.pos.axies, ...this.size.axies)
		}

		drowHover(canvas: CanvasRenderingContext2D) {
			canvas.fillStyle = '#ace600bb'
			canvas.fillRect(...this.pos.axies, ...this.size.axies)
			canvas.strokeRect(...this.pos.axies, ...this.size.axies)
		}
	}

	constructor(canvasHTML) {
		this.canvasHTML = canvasHTML
		this.canvas = canvasHTML.getContext('2d')
		this.objects = Array()
		this.size = new Vec(parseInt(this.canvasHTML.getAttribute('width')), parseInt(this.canvasHTML.getAttribute('height')))
	}

	addObj(obj) {
		this.objects.push(obj)
	}
	
	drow(withOutIdx) {
		this.objects.forEach((obj, idx) => {
			if(idx !== withOutIdx)
				obj.drow()
		})
	}

	clear() {
		this.canvas.clearRect(0, 0, ...this.size.axies)
	}

	onHoverScene(e: MouseEvent) {
		const screenSize = document.body.getBoundingClientRect()
		const canvasSize = this.canvasHTML.getBoundingClientRect()

		const hoverPosOnCanvas = new Vec(e.clientX - screenSize.x + canvasSize.x, e.clientY - screenSize.y + canvasSize.y)
		
		for(const viewBoxObj of this.objects) {
			if(viewBoxObj.isPointIntersectSelf(hoverPosOnCanvas)) {
				viewBoxObj.isHover = true
				this.clear()

			}
		}
	}

}
