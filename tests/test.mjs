class Test {
	constructor(testName) {
		this.name = testName
		this.testItems = Array()
	}

	test(testName, callbackfn) {
		this.testItems.push(() => {
			this.nowTest = testName
			callbackfn()
			console.log(`    Test item [${this.nowTest}] passed`)
		})
	}

	assert(condition, assertName='someAssert') {
		if(!condition) {
			let assertMsg = `Assert fail at [${assertName}]\nin Test [${this.name}] -> [${this.nowTest}]`
			
			if(this.help_msg) {
				assertMsg = `${assertMsg}\n${this.help_msg}`
				this.help_msg = null
			}
			
			throw new Error(assertMsg);
		}
	}

	catchError(errorType, callbackfn, catchErrorName='someCatchError') {
		try {
			callbackfn()
		} catch (e) {
			if(!(e instanceof errorType))
				throw new Error(`catchError fail at [${catchErrorName}]\nin Test [${this.name}] -> [${this.nowTest}]\ncatched error: ${e}`);
		}
	}

	equals(a, b) {
		if(a !== b) {
			this.help_msg = `${a} not equal ${b}`
			return false
		}

		return true
	}

	equalsIterables(a, b) {
		const arrayA = Array(...a)
		const arrayB = Array(...b)
		const notEqualContent = arrayA.map((val, idx) => val === arrayB[idx]).includes(false)

		if(arrayA.length !== arrayB.length || notEqualContent) {
			this.help_msg = `iterable [${arrayA}] not equal iterable [${arrayB}]`
			return false
		}

		return true
	}

	start() {
		console.log(`Start test [${this.name}]`)
		this.testItems.forEach((test) => {
			test()
		})
	}
}

export { Test }
