;(function() {
  var isArray = Array.isArray
  var _slice = Array.prototype.slice


  var slice = fromNative(Array.prototype.slice)
  var concat = fromNative(Array.prototype.concat)
  var reverse = fromNative(Array.prototype.reverse)
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


  function map(obj, fn) {
    fn = prime(slice(arguments, 2), fn)
    if (!isArray(obj)) return fn(obj)

    var results = []
    var i = -1
    var n = obj.length
    while (++i < n) results.push(fn(obj[i]))
    return results
  }


  function deepMap(obj, fn) {
    fn = prime(slice(arguments, 2), fn)
    if (!isArray(obj)) return fn(obj)

    var results = []
    var n = obj.length
    var i = -1
    while (++i < n) { results.push(deepMap(obj[i], fn)) }

    return results
  }


  function run(obj) {
    var args = slice(arguments, 1)

    return typeof obj == 'function'
      ? obj.apply(this, args)
      : obj
  }


  function when(v, truthFn, doFn) {
    return truthFn(v)
      ? doFn(v)
      : v
  }


  function exists(v) {
    return typeof v != 'undefined'
        && v !== null
  }


  function idx(arr, i) {
    if (i > 0) return i
    var n = arr.length
    return n + (i % n)
  }


  function prime(args, fn) {
    if (!args.length) return fn

    return function(x) {
      return fn.apply(this, [x].concat(args))
    }
  }


  function fromNative(nativeFn) {
    return function(target) {
      return nativeFn.apply(target, _slice.call(arguments, 1))
    }
  }


  var warped = {
    map: map,
    deepMap: deepMap,
    slice: slice,
    concat: concat,
    reverse: reverse,
    abs: abs,
    floor: floor,
    round: round,
    ceil: ceil,
    rmAt: rmAt,
    repeat: repeat,
    run: run,
    when: when,
    exists: exists,
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
