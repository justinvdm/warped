;(function() {
  var _slice = Array.prototype.slice


  var slice = fromNative(Array.prototype.slice)
  var concat = fromNative(Array.prototype.concat)
  var round = Math.round
  var abs = Math.abs
  var floor = Math.floor
  var ceil = Math.ceil
  var random = Math.random


  function repeat(v, n) {
    n = n || 1
    var results = []
    while (n--) results.push(v)
    return results
  }


  function rmAt(arr, start, end) {
    start = idx(arr, start)

    end = arguments.length > 2
      ? idx(arr, end)
      : start

    var results = []
    var n = arr.length
    var i = -1

    while (++i < start) results.push(arr[i])
    i = end
    while (++i < n) results.push(arr[i])

    return results
  }


  function randInt(lo, hi) {
    if (arguments.length < 2) {
      hi = lo
      lo = 0
    }

    return floor(warped.random() * (hi - lo)) + lo
  }


  function randIdx(arr) {
    return randInt(arr.length - 1)
  }


  function randVal(arr) {
    return arr[randIdx(arr)]
  }


  function idx(arr, i) {
    if (i > 0) return i
    var n = arr.length
    return n + (i % n)
  }


  function fromNative(nativeFn) {
    return function(target) {
      return nativeFn.apply(target, _slice.call(arguments, 1))
    }
  }


  var warped = {
    slice: slice,
    concat: concat,
    abs: abs,
    floor: floor,
    round: round,
    ceil: ceil,
    rmAt: rmAt,
    repeat: repeat,
    random: random,
    randInt: randInt,
    randIdx: randIdx,
    randVal: randVal
  }


  if (typeof module != 'undefined')
    module.exports = warped
  else if (typeof define == 'function' && define.amd)
    define(function() { return warped })
  else
    this.warped = warped
}).call(this);
