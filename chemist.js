;(function() {
  var _slice = Array.prototype.slice


  var slice = fromNative(Array.prototype.slice)
  var concat = fromNative(Array.prototype.concat)
  var round = Math.round
  var floor = Math.floor
  var ceil = Math.ceil
  var random = Math.random


  function fromNative(nativeFn) {
    return function(target) {
      return nativeFn.apply(target, _slice.call(arguments, 1))
    }
  }


  function randint(lo, hi) {
    if (arguments.length < 2) {
      hi = lo
      lo = 0
    }

    return floor(chemist.random() * (hi - lo)) + lo
  }


  var chemist = {
    slice: slice,
    concat: concat,
    floor: floor,
    round: round,
    ceil: ceil,
    random: random,
    randint: randint
  }


  if (typeof module != 'undefined')
    module.exports = chemist
  else if (typeof define == 'function' && define.amd)
    define(function() { return chemist })
  else
    this.chemist = chemist
}).call(this);
