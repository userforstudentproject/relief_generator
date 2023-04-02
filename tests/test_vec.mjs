import { Vec } from '../static/js/relief_gen/vec.mjs'
import { Test } from './test.mjs'


const test = new Test('Vector')
export default test

test.test('test constructor', () => {
	const vec = new Vec(2, 2)
	test.assert(vec.axies instanceof Array, 'type of axies')
	test.assert(test.equalsIterables(vec.axies, [2, 2]), 'test content in axies Array')
})

test.test('test validate', () => {
	const vec = new Vec(2, 2)
	Vec.validateVec(vec)
	Vec.validateVecOpeartion(vec, vec)

	test.catchError(Vec.ValidateError, () => { Vec.validateVecOpeartion(vec, new Vec(2, 2, 2))}, 'vector with different length')
	test.catchError(Vec.ValidateError, () => { Vec.validateVec(new Vec(2)) }, 'vector with length < 2')
})

test.test('test add method', () => {
	const vec = new Vec(2, 2)
	const res = vec.add(vec)

	// is result instanceof Vec
	// add to vec
	test.assert(res instanceof Vec, 'assert instanceof Vec')
	test.assert(test.equalsIterables(res.axies, [4, 4]), 'assert result x, y')
	
	// add to number
	const res2 = vec.add(2)
	test.assert(test.equalsIterables(res2.axies, [4, 4]), 'assert result x, y when add 2')

	// add to not number or Vec
	test.catchError(Vec.ValueError, () => { vec.add(undefined) }, 'test catch error when add vector to undefined')
	test.catchError(Vec.ValueError, () => { vec.add('string') }, 'test catch error when add vector to String')
	test.catchError(Vec.ValueError, () => { vec.add(null) }, 'test catch error when add vector to null')
})


test.test('test sub method', () => {
	const vec = new Vec(2, 2)
	const res = vec.sub(vec)

	// is result instanceof Vec
	// sub vec
	test.assert(res instanceof Vec, 'assert instanceof Vec')
	test.assert(test.equalsIterables(res.axies, [0, 0]), 'assert result x, y')
	
	// sub number
	const res2 = vec.sub(2)
	test.assert(test.equalsIterables(res2.axies, [0, 0]), 'assert result x, y when add 2')

	// sub to not number or Vec
	test.catchError(Vec.ValueError, () => { vec.sub(undefined) }, 'test catch error when sub vector to undefined')
	test.catchError(Vec.ValueError, () => { vec.sub('string') }, 'test catch error when sub vector to String')
	test.catchError(Vec.ValueError, () => { vec.sub(null) }, 'test catch error when sub vector to null')
})


test.test('test mul method', () => {
	const vec = new Vec(2, 2)
	const res = vec.mul(vec)

	// is result instanceof Vec
	// mul to vec
	test.assert(typeof res === 'number', 'assert is number')
	test.assert(test.equals(res, 8), 'assert result of mul vectors')
	
	// mul to number
	const res2 = vec.mul(3)
	test.assert(res2 instanceof Vec, 'assert instanceof Vec')
	test.assert(test.equalsIterables(res2.axies, [6, 6]), 'assert result x, y when mul 3')

	// mul to not number or Vec
	test.catchError(Vec.ValueError, () => { vec.mul(undefined) }, 'test catch error when mul vector to undefined')
	test.catchError(Vec.ValueError, () => { vec.mul('string') }, 'test catch error when mul vector to String')
	test.catchError(Vec.ValueError, () => { vec.mul(null) }, 'test catch error when mul vector to null')
})


test.test('test vectorMulNotArithmetical', () => {
	const vec = new Vec(2, 2)
	const res = vec.vectorMulNotArithmetical(vec)

	// is result instanceof Vec
	// mul to vec
	test.assert(res instanceof Vec, 'assert instanceof Vec')
	test.assert(test.equalsIterables(res.axies, [4, 4]), 'assert result of mul vectors')
	
	// mul to not Vec
	test.catchError(Vec.ValueError, () => { vec.mul(undefined) }, 'test catch error when mul vector to undefined')
	test.catchError(Vec.ValueError, () => { vec.mul('string') }, 'test catch error when mul vector to String')
	test.catchError(Vec.ValueError, () => { vec.mul(null) }, 'test catch error when mul vector to null')
	test.catchError(Vec.ValueError, () => { vec.mul(5) }, 'test catch error when mul vector to number')
})


test.test('vector length', () => {
	const vec = new Vec(0, 5)
	test.assert(test.equals(vec.length, 5), 'assert length of vector')
})


test.test('vector norm', () => {
	let vec = new Vec(0, 5)
	test.assert(test.equalsIterables(vec.norm().axies, [0, 1]), 'assert norm of vector')
	
	vec = new Vec(5, 0)
	test.assert(test.equalsIterables(vec.norm().axies, [1, 0]), 'assert norm of vector')
})

test.test('toString', () => {
	test.assert(test.equals(new Vec(2, 2).toString(), 'Vec2(2, 2)'), 'assert convert to string')
	test.assert(test.equals(new Vec(2, 3).toString(), 'Vec2(2, 3)'), 'assert convert to string')
	test.assert(test.equals(new Vec(2, 3, 1).toString(), 'Vec3(2, 3, 1)'), 'assert convert to string')
})


test.test('test angle', () => {
	const vectrors = [
		[new Vec(0, 4), Math.PI / 2],
		[new Vec(1, 0), 0],
		[new Vec(-1, 0), Math.PI],
	]

	for(const vector of vectrors) {
		const vec = vector[0]
		const angle = vector[1]

		test.assert(test.equals(vec.angle(), angle), `assert angle on [${vector}]`)
	}
})


test.test('withAngle', () => {
	const vectrors = [
		[new Vec(0, 1), Math.PI / 2],
		[new Vec(1, 0), 0],
		[new Vec(-1, 0), Math.PI],
	]

	for(const vector of vectrors) {
		const vec = vector[0]
		const angle = vector[1]

		test.assert(test.equalsIterables(vec.withAngle(angle).axies.map((axis) => Math.round(axis)), vec.axies), `assert with angle on [${vector}]`)
	}
})


test.test('forAngle', () => {
	const vectrors = [
		[new Vec(0, 1), Math.PI / 2, new Vec(-1, 0)],
		[new Vec(1, 0), 0, new Vec(1, 0)],
		[new Vec(-1, 0), Math.PI, new Vec(1, 0)],
	]

	for(const vector of vectrors) {
		const vec = vector[0]
		const angle = vector[1]
		const newVec = vector[2]

		test.assert(
			test.equalsIterables(vec.forAngle(angle).axies.map((axis) => Math.round(axis)), newVec.axies),
			`assert with angle on [${vector}]`
		)
	}
})
