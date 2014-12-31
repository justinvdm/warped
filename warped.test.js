var assert = require('assert')
var vv = require('drainpipe')


var warped = require('./warped'),
    slice = warped.slice,
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

  describe(".randInt", function() {
    it("should generate a random integer between two numbers", function() {
      randx = 0.8
      assert.equal(randInt(2, 12), 10)
      assert.equal(randInt(4, 20), 16)
      assert.equal(randInt(3, 26), 21)
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
      assert.equal(randIdx([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]), 7)
      assert.equal(randIdx([3, 2, 4, 9, 23, 2, 6]), 4)
    })
  })

  describe(".randVal", function() {
    it("should pick a random value", function() {
      randx = 0.8
      assert.equal(randVal([2, 4, 6, 8, 10, 12, 14, 16, 18, 20]), 16)
      assert.equal(randVal([3, 2, 4, 8, 23, 2, 6]), 23)
    })
  })

  describe
})
