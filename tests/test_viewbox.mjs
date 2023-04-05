import { ViewBox } from "../static/js/generator_interface/viewbox.mjs";
import { Vec } from '../static/js/relief_gen/vec.mjs'

import { Test } from './test.mjs'



export const viewBoxObjTest = new Test('ViewBoxObj')

viewBoxObjTest.test('ifThePointBelongsToMe', () => {
	const viewBoxObj = new ViewBox.ViewBoxObj(() => {}, new Vec(20, 20), new Vec(50, 50))

	viewBoxObjTest.assert(viewBoxObj.ifThePointBelongsToMe(new Vec(20, 20)), 'assert in')
	viewBoxObjTest.assert(viewBoxObj.ifThePointBelongsToMe(new Vec(25, 20)), 'assert in')
	viewBoxObjTest.assert(viewBoxObj.ifThePointBelongsToMe(new Vec(50, 50)), 'assert in')
	viewBoxObjTest.assert(viewBoxObj.ifThePointBelongsToMe(new Vec(40, 40)), 'assert in')
	viewBoxObjTest.assert(viewBoxObj.ifThePointBelongsToMe(new Vec(60, 60)), 'assert in')

	viewBoxObjTest.assert(!viewBoxObj.ifThePointBelongsToMe(new Vec(10, 40)), 'assert out')
	viewBoxObjTest.assert(!viewBoxObj.ifThePointBelongsToMe(new Vec(10, 10)), 'assert out')
	viewBoxObjTest.assert(!viewBoxObj.ifThePointBelongsToMe(new Vec(100, 100)), 'assert out')
})

