import {Test} from './test.mjs'

import {Box} from '../static/js/relief_gen/box.mjs'
import {Vec} from '../static/js/relief_gen/vec.mjs'

const test = new Test('Box')
export default test


test.test('split horizontal', () => {
	const box = new Box(5, 5, new Vec(0, 0))
	let splitResult

	splitResult = box.split(0.4, false)
	test.assert(test.equals(splitResult[0].x, 5), 'assert x')
	test.assert(test.equals(splitResult[0].y, 2), 'assert x')
	test.assert(test.equalsIterables(splitResult[0].pos.axies, [0, 0]), 'assert pos')

	//other box
	
	test.assert(test.equals(splitResult[1].x, 5), 'assert x')
	test.assert(test.equals(splitResult[1].y, 3), 'assert x')
	test.assert(test.equalsIterables(splitResult[1].pos.axies, [0, 2]), 'assert pos')
})

test.test('split horizontal inv', () => {
	const box = new Box(5, 5, new Vec(0, 0))
	let splitResult

	splitResult = box.split(0.4, false, true)
	test.assert(test.equals(splitResult[0].x, 5), 'assert first x')
	test.assert(test.equals(splitResult[0].y, 3), 'assert first y')
	test.assert(test.equalsIterables(splitResult[0].pos.axies, [0, 0]), 'assert pos')

	//other box
	
	test.assert(test.equals(splitResult[1].x, 5), 'assert second x')
	test.assert(test.equals(splitResult[1].y, 2), 'assert second y')
	test.assert(test.equalsIterables(splitResult[1].pos.axies, [0, 3]), 'assert pos')
})

test.test('split vertical', () => {
	const box = new Box(5, 5, new Vec(0, 0))
	let splitResult

	splitResult = box.split(0.4, true)
	test.assert(test.equals(splitResult[0].x, 2), 'assert x')
	test.assert(test.equals(splitResult[0].y, 5), 'assert x')
	test.assert(test.equalsIterables(splitResult[0].pos.axies, [0, 0]), 'assert pos')

	//other box
	
	test.assert(test.equals(splitResult[1].x, 3), 'assert x')
	test.assert(test.equals(splitResult[1].y, 5), 'assert x')
	test.assert(test.equalsIterables(splitResult[1].pos.axies, [2, 0]), 'assert pos')
})

test.test('split vertical inv', () => {
	const box = new Box(5, 5, new Vec(0, 0))
	let splitResult

	splitResult = box.split(0.4, true, true)
	test.assert(test.equals(splitResult[0].x, 3), 'assert first x')
	test.assert(test.equals(splitResult[0].y, 5), 'assert first y')
	test.assert(test.equalsIterables(splitResult[0].pos.axies, [0, 0]), 'assert pos')

	//other box
	
	test.assert(test.equals(splitResult[1].x, 2), 'assert second x')
	test.assert(test.equals(splitResult[1].y, 5), 'assert second y')
	test.assert(test.equalsIterables(splitResult[1].pos.axies, [3, 0]), 'assert pos')
})


test.test('gen boxes', () => {
	const box = new Box(10, 10, new Vec(0, 0))
	const splitParams = [
		[0.3, 0, 0],
		[0.7, 0, 0],
		[0.4, 0, 0],
		[0.4, 1, 1],
		[0.7, 1, 1]
	]

	const result = box.generateBoxes(splitParams)
	test.assert(test.equals(result.length, 6), 'assert length')
	const squareSum = result.reduce((sum, box) => sum + box.x * box.y, 0)
	test.assert(test.equals(squareSum, 100), 'assert square')
})
