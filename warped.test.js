var assert = require('assert')
var vv = require('drainpipe')


var warped = require('./warped'),
    slice = warped.slice,
    random = warped.random,
    randint = warped.randint


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

  describe(".randint", function() {
    it("should generate a random integer between two numbers", function() {
      randx = 0.8
      assert.equal(randint(2, 12), 10)
      assert.equal(randint(4, 20), 16)
      assert.equal(randint(3, 26), 21)
    })

    it("should generate a random integer between 0 and a number", function() {
      randx = 0.8
      assert.equal(randint(10), 8)
      assert.equal(randint(20), 16)
      assert.equal(randint(30), 24)
    })
  })
})
