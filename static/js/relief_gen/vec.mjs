class VecValidateError extends Error {}
class VecValueError extends Error {}

class Vec {
	static ValidateError = VecValidateError
	static ValueError = VecValueError

	constructor(...axies) {
		this.axies = axies
		Vec.validateVec(this)
	}

	add(vecOrNumber) {
		if(vecOrNumber instanceof Vec) {
			Vec.validateVecOpeartion(this, vecOrNumber)
			return new Vec(...this.axies.map((axis, idx) => axis + vecOrNumber.axies[idx]))
		} else if (typeof vecOrNumber === 'number') {
			return new Vec(...this.axies.map((axis) => axis + vecOrNumber))
		}
		else
			throw new Vec.ValueError('vecOrNumber must be instanceof Vec or Number')
	}


	sub(vecOrNumber) {
		if(vecOrNumber instanceof Vec) {
			Vec.validateVecOpeartion(this, vecOrNumber)
			
			return new Vec(...this.axies.map((axis, idx) => axis - vecOrNumber.axies[idx]))
		} else if (typeof vecOrNumber === 'number') {
			return new Vec(...this.axies.map((axis) => axis - vecOrNumber))
		}
		else
			throw new Vec.ValueError('vecOrNumber must be instanceof Vec or Number')
	}


	mul(vecOrNumber) {
		if(vecOrNumber instanceof Vec) {
			Vec.validateVecOpeartion(this, vecOrNumber)

			const sums = this.axies.map((axis, idx) => axis * vecOrNumber.axies[idx])
			return sums.reduce((sum, val) => sum + val, 0)
		} else if (typeof vecOrNumber === 'number') {
			return new Vec(...this.axies.map((axis) => axis * vecOrNumber))
		}
		else
			throw new Vec.ValueError('vecOrNumber must be instanceof Vec or Number')
	}

	vectorMulNotArithmetical(vec) {
		if(vec instanceof Vec) {
			Vec.validateVecOpeartion(this, vec)
			return new Vec(...this.axies.map((axis, idx) => axis * vec.axies[idx]))
		} else
			throw new Vec.ValueError('vec must be instanceof Vec')
	}

	get length() {
		const sum = this.axies.map((axis) => axis ** 2).reduce((sum, val) => sum + val, 0)
		return Math.sqrt(sum)
	}

	norm() {
		const k = 1 / this.length
		return new Vec(...this.axies.map((axis) => axis * k))
	}
	
	static validateVec(vec) {
		if(vec.axies.length < 2)
			throw new this.ValidateError('vector must have 2 and more axies');
	}

	static validateVecOpeartion(vec, vec2) {
		this.validateVec(vec)
		this.validateVec(vec2)
		if(vec.axies.length !== vec2.axies.length)
			throw new this.ValidateError('different vectors');
	}

	toString() {
		const body = this.axies.join(', ')
		return `Vec${this.axies.length}(${body})`
	}

	angle(axis=0, crossAxis=1) {
		const normVec = this.norm()
		let angle = Math.acos(normVec.axies[axis])
		if(normVec.axies[crossAxis] < 0)
			angle = Math.PI * 2 - angle
		return angle
	}

	withAngle(angle, axis=0, crossAxis=1, norm=false) {
		let x = this.axies[axis]
		let y = this.axies[crossAxis]

		const k = 1 / Math.sqrt(x**2 + y**2)
		x = Math.cos(angle)
		y = Math.sin(angle)

		const res = this.mul(k)
		res.axies[axis] = x
		res.axies[crossAxis] = y
		return norm ? res.norm() : res
	}

	forAngle(angle, axis=0, crossAxis=1, norm=false) {
		const nowAngle = this.angle(axis, crossAxis)
		const newAngle = (nowAngle + angle) % (Math.PI * 2)
		return this.withAngle(newAngle, axis, crossAxis, norm)
	}
}


export { Vec }
