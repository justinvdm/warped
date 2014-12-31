;(function() {
  var _slice = Array.prototype.slice


  var slice = fromNative(Array.prototype.slice)
  var concat = fromNative(Array.prototype.concat)
  var round = Math.round
  var floor = Math.floor
  var ceil = Math.ceil
  var random = Math.random


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


  function fromNative(nativeFn) {
    return function(target) {
      return nativeFn.apply(target, _slice.call(arguments, 1))
    }
  }


  var warped = {
    slice: slice,
    concat: concat,
    floor: floor,
    round: round,
    ceil: ceil,
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
