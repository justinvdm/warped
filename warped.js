;(function() {
  var isArray = Array.isArray
  var _slice = Array.prototype.slice


  var _concat = Array.prototype.concat
  var concat = fromNative(_concat)
  var slice = fromNative(Array.prototype.slice)
  var reverse = fromNative(Array.prototype.reverse)
  var random = Math.random
  var floor = Math.floor


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

    return floor(warped.random() * ((hi + 1) - lo)) + lo
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


  function concatValues(arr) {
    return _concat.apply([], arr)
  }


  function run(obj) {
    var args = slice(arguments, 1)

    return typeof obj == 'function'
      ? obj.apply(this, args)
      : obj
  }


  function exists(v) {
    return typeof v != 'undefined'
        && v !== null
  }


  function identity(v) {
    return v
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
    concatValues: concatValues,
    slice: slice,
    concat: concat,
    reverse: reverse,
    rmAt: rmAt,
    repeat: repeat,
    run: run,
    exists: exists,
    identity: identity,
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
