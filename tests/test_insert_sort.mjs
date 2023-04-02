import {Test} from './test.mjs'
import {InsertSort} from '../static/js/relief_gen/sort.mjs'

const test = new Test('Insert Sort')
export default test

test.test('insert with default key', () => {
	const sort = new InsertSort()

	sort.insert(5)
	test.assert(test.equalsIterables(sort.items, [5]), 'assert items after first insert')
	
	sort.insert(5)
	test.assert(test.equalsIterables(sort.items, [5, 5]), 'assert items after second equal insert')
	
	sort.insert(10)
	test.assert(test.equalsIterables(sort.items, [5, 5, 10]), 'assert items after insert in the end')


	sort.insert(3)
	test.assert(test.equalsIterables(sort.items, [3, 5, 5, 10]), 'assert items after insert in the start')
	
	sort.insert(6)
	test.assert(test.equalsIterables(sort.items, [3, 5, 5, 6, 10]), 'assert items after insert pre-last')

	sort.insert(1)
	test.assert(test.equalsIterables(sort.items, [1, 3, 5, 5, 6, 10]), 'assert items after insert in the start')
})

test.test('extend with default key', () => {
	const sort = new InsertSort()
	sort.extend(5, 5, 10, 3, 6, 1)
	test.assert(test.equalsIterables(sort.items, [1, 3, 5, 5, 6, 10]), 'assert items after extend')
})

test.test('insert with key', () => {
	const sort = new InsertSort()
	const key = (obj) => obj.attr
	sort.key = key

	sort.insert({attr: 5})
	test.assert(test.equalsIterables(sort.items.map(key), [5]), 'assert items after first insert')
	
	sort.insert({attr: 5})
	test.assert(test.equalsIterables(sort.items.map(key), [5, 5]), 'assert items after second equal insert')
	
	sort.insert({attr: 10})
	test.assert(test.equalsIterables(sort.items.map(key), [5, 5, 10]), 'assert items after insert in the end')


	sort.insert({attr: 3})
	test.assert(test.equalsIterables(sort.items.map(key), [3, 5, 5, 10]), 'assert items after insert in the start')
	
	sort.insert({attr: 6})
	test.assert(test.equalsIterables(sort.items.map(key), [3, 5, 5, 6, 10]), 'assert items after insert pre-last')

	sort.insert({attr: 1})
	test.assert(test.equalsIterables(sort.items.map(key), [1, 3, 5, 5, 6, 10]), 'assert items after insert in the start')
})
