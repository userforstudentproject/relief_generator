class RoutePoint {
	constructor(pos, ...directionPoint) {
		/**
		* pos: Vec
		* directionPoint: Vec
		*/

		this.pos = pos
		this.firstDirectionPoint = directionPoint[0] ? directionPoint[0] : pos
		this.secondDirectionPoint = directionPoint[1] ? directionPoint[1] : pos
	}

	makeSimetricDirections() {
		let direction = this.firstDirectionPoint.sub(this.pos)
		direction = direction.mul(-1)
		this.secondDirectionPoint = direction.add(this.pos)
	}
}


class Route {
	constructor(...points) {
		/**
		 * points: RoutePoint
		 * points must include two or more points
		 */

		this.points = points
	}

	inserPoint(idx, point) {
		/**
		 * point: routepoint
		 */
		this.points.splice(idx, 1, point)
	}

	deletePoint(idx) {
		/**
		 * point: routepoint
		 */
		this.points.splice(idx, 1)
	}

	findPlaceBeatweenTwoPoints(k, firstIdxOfPoint, secondIdxOfPoint) {
		/**
		 * k in range [0, 1]
		 * return: Vec
		 */

		const point1 = this.points[firstIdxOfPoint]
		const point2 = this.points[secondIdxOfPoint]

		const a = point1.pos.mul((1 - k)**3)
		const b = point1.secondDirectionPoint.mul(3 * k * (1 - k)**2)
		const c = point2.firstDirectionPoint.mul(3 * k**2 * (1 - k))
		const d = point2.pos.mul(k**3)

		const targetPoint = a.add(b).add(c).add(d)
		return targetPoint
	}
}

export {Route, RoutePoint}
