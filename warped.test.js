var assert = require('assert')
var vv = require('drainpipe')


var warped = require('./warped'),
    slice = warped.slice,
    rmAt = warped.rmAt,
    map = warped.map,
    deepMap = warped.deepMap,
    concatValues = warped.concatValues,
    repeat = warped.repeat,
    run = warped.run,
    exists = warped.exists,
    identity = warped.identity,
    random = warped.random,
    randInt = warped.randInt,
    randIdx = warped.randIdx,
    randVal = warped.randVal


describe("warped", function() {
  var randx

  function fakeRandom() {
    return randx
  }

  beforeEach(function() {
    randx = 0
    warped.random = fakeRandom
  })

  afterEach(function() {
    warped.random = random
  })


  describe("native functions", function() {
    it("should wrap native functions", function() {
      vv([1, 2, 3, 4])
        (slice)
        (assert.deepEqual, [1, 2, 3, 4])

      vv([1, 2, 3, 4])
        (slice, 1)
        (assert.deepEqual, [2, 3, 4])

      vv([1, 2, 3, 4])
        (slice, 1, 3)
        (assert.deepEqual, [2, 3])

      vv([1, 2, 3, 4])
        (slice, -2, 3)
        (assert.deepEqual, [3])

      vv([1, 2, 3, 4])
        (slice, 1, -1)
        (assert.deepEqual, [2, 3])
    })
  })


  describe(".map", function() {
    it("should map the values in the array", function() {
      vv([1, 2, 3, 4])
        (map, function(v) { return v + 1 })
        (assert.deepEqual, [2, 3, 4, 5])
    })

    it("should support extra args", function() {
      vv([1, 2, 3, 4])
        (map, function(a, b, c) { return a + b + c }, 2, 3)
        (assert.deepEqual, [6, 7, 8, 9])
    })

    it("should support single value mapping", function() {
      vv(23)
        (map, function(v) { return v + 1 })
        (assert.strictEqual, 24)
    })
  })


  describe(".deepMap", function() {
    it("should map the values in each array", function() {
      vv([1, [2, [3, 4]]])
        (deepMap, function(v) { return v + 1 })
        (assert.deepEqual, [2, [3, [4, 5]]])
    })

    it("should support extra args", function() {
      vv([1, [2, [3, 4]]])
        (deepMap, function(a, b, c) { return a + b + c }, 2, 3)
        (assert.deepEqual, [6, [7, [8, 9]]])
    })

    it("should support single value mapping", function() {
      vv(23)
        (deepMap, function(v) { return v + 1 })
        (assert.strictEqual, 24)
    })
  })


  describe(".repeat", function() {
    it("should repeat the given value", function() {
      vv(23)
        (repeat, 3)
        (assert.deepEqual, [23, 23, 23])
    })
  })


  describe(".concatValues", function() {
    it("should concat the values in the array", function() {
      vv([1, [2, [3, 4]], 5, [6]])
        (concatValues)
        (assert.deepEqual, [1, 2, [3, 4], 5, 6])
    })
  })


  describe(".run", function() {
    it("should return the result of the function invocation", function() {
      vv(function(a, b) { return a + b })
        (run, 11, 12)
        (assert.equal, 23)
    })

    it("should simply return non-array values", function() {
      var v = {}
      assert.strictEqual(run(v), v)
    })
  })


  describe(".exists", function() {
    it("should determine whether a value is null or undefined", function() {
      assert(exists(23))
      assert(!exists(null))
      assert(!exists(void 0))
    })
  })


  describe(".identity", function() {
    it("should simply return what it is given", function() {
      var v = {}
      assert.strictEqual(identity(v), v)
    })
  })


  describe(".rmAt", function() {
    it("should omit the value at the given index", function() {
      vv([1, 2, 3])
        (rmAt, 2)
        (assert.deepEqual, [1, 2])

      vv([1, 2, 3, 4])
        (rmAt, 2)
        (assert.deepEqual, [1, 2, 4])

      vv([1, 2, 3])
        (rmAt, -2)
        (assert.deepEqual, [1, 3])
    })

    it("should omit the values at the given indices", function() {
      vv([1, 2, 3, 4, 5, 6])
        (rmAt, 2, 4)
        (assert.deepEqual, [1, 2, 6])

      vv([1, 2, 3, 4, 5, 6])
        (rmAt, -5, -3)
        (assert.deepEqual, [1, 5, 6])
    })
  })


  describe(".randInt", function() {
    it("should generate a random integer between two numbers", function() {
      randx = 0.8
      assert.equal(randInt(2, 12), 10)
      assert.equal(randInt(4, 20), 17)
      assert.equal(randInt(3, 26), 22)
    })

    it("should generate a random integer between 0 and a number", function() {
      randx = 0.8
      assert.equal(randInt(10), 8)
      assert.equal(randInt(20), 16)
      assert.equal(randInt(30), 24)
    })
  })


  describe(".randIdx", function() {
    it("should pick a index", function() {
      randx = 0.8
      assert.equal(randIdx([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]), 8)
      assert.equal(randIdx([3, 2, 4, 9, 23, 2, 6]), 5)
    })
  })


  describe(".randVal", function() {
    it("should pick a random value", function() {
      randx = 0.8
      assert.equal(randVal([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]), 18)
      assert.equal(randVal([3, 2, 4, 8, 23, 2, 6]), 2)
    })
  })
})
