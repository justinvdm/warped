;(function() {
  var _slice = Array.prototype.slice


  var slice = fromNative(Array.prototype.slice)
  var concat = fromNative(Array.prototype.concat)
  var round = Math.round
  var floor = Math.floor
  var ceil = Math.ceil
  var random = Math.random


  function randint(lo, hi) {
    if (arguments.length < 2) {
      hi = lo
      lo = 0
    }

    return floor(warped.random() * (hi - lo)) + lo
  }


  function randidx(arr) {
    return randint(arr.length - 1)
  }


  function randval(arr) {
    return arr[randidx(arr)]
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
    randint: randint,
    randidx: randidx,
    randval: randval
  }


  if (typeof module != 'undefined')
    module.exports = warped
  else if (typeof define == 'function' && define.amd)
    define(function() { return warped })
  else
    this.warped = warped
}).call(this);
