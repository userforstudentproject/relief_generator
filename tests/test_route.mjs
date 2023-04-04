import { Test } from './test.mjs'
import { Route, RoutePoint } from "../static/js/relief_gen/route.mjs";
import { Vec } from "../static/js/relief_gen/vec.mjs"


const testRoutePoint = new Test('RoutePoint')

testRoutePoint.test('constructor', () => {
	const p = new RoutePoint(new Vec(0, 0), new Vec(2, 2))
	testRoutePoint.assert(testRoutePoint.equalsIterables(p.firstDirectionPoint.axies, [2, 2]), 'assert firstDirectionPoint')
	testRoutePoint.assert(testRoutePoint.equalsIterables(p.secondDirectionPoint.axies, [0, 0]), 'assert firstDirectionPoint')
})

testRoutePoint.test('makeSimetricDirections', () => {
	const p = new RoutePoint(new Vec(0, 0), new Vec(2, 2))
	p.makeSimetricDirections()

	testRoutePoint.assert(testRoutePoint.equalsIterables(p.secondDirectionPoint.axies, [-2, -2]), 'assert secondDirectionPoint')
})


const testRoute = new Test('Route')

testRoute.test('findPlaceBeatweenTwoPoints', () => {
	const route = new Route(new RoutePoint(new Vec(1, 1)), new RoutePoint(new Vec(5, 3)), new RoutePoint(new Vec(9, 2)))

	const place = route.findPlaceBeatweenTwoPoints(0.5, 0, 1)
	testRoute.assert(testRoute.equalsIterables(place.axies, [3, 2]), 'assert found place')
})


export {testRoute, testRoutePoint}
