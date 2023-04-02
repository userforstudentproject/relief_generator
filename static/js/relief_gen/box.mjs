import {Vec} from './vec.mjs'
import { InsertSort } from './sort.mjs'

class Box {
	constructor(x, y, pos) {
		this.x = x
		this.y = y
		this.pos = pos
	}

	split(k, splitDirection=false, inv=false) {
		const size = splitDirection ? this.x : this.y
		k = inv ? 1 - k : k

		const mainSize = k * size
		const friendSize = size - mainSize

		const friendPos = mainSize
		
		if(splitDirection) {
			const mainBox = new Box(mainSize, this.y, new Vec(...this.pos.axies))
			const friendBox = new Box(friendSize, this.y, new Vec(friendPos, 0).add(this.pos))
			return [mainBox, friendBox]
		} else {
			const mainBox = new Box(this.x, mainSize, new Vec(...this.pos.axies))
			const friendBox = new Box(this.x, friendSize, new Vec(0, friendPos).add(this.pos))
			return [mainBox, friendBox]
		}
	}

	generateBoxes(splitParams) {
		/**
		 * splitParams: [[args for split method], ...]
		 */
		const arrSorted = new InsertSort()
		arrSorted.key = (box) => box.x * box.y
		arrSorted.insert(this)

		for(const splitParam of splitParams) {
			const boxForSplit = arrSorted.items.pop()
			const splitResult = boxForSplit.split(...splitParam)
			arrSorted.extend(...splitResult)
		}

		return arrSorted.items
	}
}

export {Box}
