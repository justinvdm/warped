var assert = require('assert')
var vv = require('drainpipe')


var chemist = require('./chemist'),
    slice = chemist.slice


describe("chemist", function() {
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
})
