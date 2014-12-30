;(function() {
  var _slice = Array.prototype.slice


  var slice = fromNative(Array.prototype.slice)
  var concat = fromNative(Array.prototype.concat)


  function fromNative(nativeFn) {
    return function(target) {
      return nativeFn.apply(target, _slice.call(arguments, 1))
    }
  }


  var chemist = {
    slice: slice,
    concat: concat
  }


  if (typeof module != 'undefined')
    module.exports = chemist
  else if (typeof define == 'function' && define.amd)
    define(function() { return chemist })
  else
    this.chemist = chemist
}).call(this);
