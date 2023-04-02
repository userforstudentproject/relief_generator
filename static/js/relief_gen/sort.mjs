class InsertSort {
	constructor() {
		this.items = Array()
		this.key = (item) => item
	}

	insert(element) {
		const numTarget = this.key(element)

		if(!this.items.length) {
			this.items.push(element)
			return
		}

		const numLast = this.key(this.items[this.items.length - 1])
		
		if(numTarget >= numLast) {
			this.items.push(element)
			return
		}

		let insertIdx
		for(let idx = 0; idx < this.items.length; idx += 1) {
			const nowNum = this.key(this.items[idx])
			if(numTarget <= nowNum) {
				insertIdx = idx
				break
			}
		}

		// split array
		const left = this.items.slice(0, insertIdx)
		const right = this.items.slice(insertIdx)
		left.push(element)
		this.items = left.concat(right)
	}

	extend(...elements) {
		elements.forEach((val) => {
			this.insert(val)
		})
	}
}

export {InsertSort}
