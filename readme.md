# warped

high-level functions for pattern manipulation in javascript

```javascript
var vv = require('drainpipe'),
    warped = require('warped'),
    stringify = JSON.stringify,
    log = console.log,
    slice = warped.slice,
    repeat = warped.repeat,
    deepMap = warped.deepMap,
    randInt = warped.randInt


vv([1, [2, [3, [4], [6, 7, 8]]]])
  (slice, -1)
  (deepMap, function(v) {
    return v % 2
      ? repeat(v, randInt(2, 3))
      : v * randInt(1, 10)
  })
  (stringify)
  (log)


//[[6,[[3,3],[20],[24,[7,7],56]]]]
```

The use case driving warped's development is manipulating array-based patterns that are to be turned into music or visualised, so any functions it exposes are intended to be used for this purpose. If you are looking for an all-purpose utility library, libraries like [lodash](https://lodash.com/) would make more sense. At the moment, warped is pretty bare and still needs some work before it'll be useful enough.


## install

node:

```
$ npm install warped
```

```
var warped = require('warped')
```

browser:

```
$ bower install warped
```

```html
<script src="/bower_components/warped/warped.js"></script>
```


## api

### map(arr, fn[, arg2[, ...]])

Maps the values in array `arr` through a function `fn`. If extra arguments are given, they are used as extra arguments to each call to `fn` when mapping the values. This does, however, mean that the index value of each item isn't available as it is with the [native `.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

```javascript
map([1, 2], add, 3)
// => [4, 5]

function add(a, b) {
  return a + b
}
```

### deepMap(arr, fn[, arg2[, ...]])

Walks a nested array data structure `arr`, mapping each non-array value through a function `fn`. If extra arguments are given, they are used as extra arguments to each call to `fn` when mapping the values.

```
deepMap([1, [2, [3, 4]]], function(v) {
  return v + 1
})

// => [2, [3, [4, 5]]]
```


### rmAt(arr, i)

Returns a shallow copy of array `arr` with the value at index `i` removed.

```
rmAt([1, 2, 3, 4], 2)
// => [1, 2, 4]
```

If `i` is negative, it is resolved relative to the array's length. For example, if `-1` is given for an array with length `3`, `i` is resolved to index `2`.

### rmAt(arr, start, end)

Returns a shallow copy of array `arr` with the values between indexes `start` and `end` removed.

```
rmAt([1, 2, 3, 4, 5, 6], 2, 4)
// => [1, 2, 4]
```

Similar to [`rmAt(arr, i)`](#rmAtarr-i), `start` and `end` can be negative values.

### repeat(v, n)

Returns an array containing value `v` repeated `n` times.

```javascript
repeat(23, 3)
// => [23, 23, 23]
```

### run(v[, arg1[, arg2[, ...]]])

If `v` is a function, it is called with the given arguments and the `this` value `run` is called with. If `v` is not a function, it is simply returned.


```javascript
map([identity, 23, identity], run, 3)
// => [3, 23, 3]
```

### exists(v)

Returns `false` if `v` is `undefined` or `null`, and `true` if it is not.

```javascript
exists(null)  // => false
exists(void 0)  // => false
exists(23)  // => true
```

### identity(v)

Simply returns `v`.

```javascript
identity(23)
// => 23
```

### random

Identical to [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

```javascript
random()
// => 0.029231984401121736
```

### randInt(n)

Returns a random integer between `0` and `n`.

```javascript
randInt(10)
// => 8
```

### randInt(lo, hi)

Returns a random integer between `lo` and `hi`.

```javascript
randInt(10, 20)
// => 13
```

### randIdx(arr)

Returns a random index value in array `arr`.

```javascript
randIdx([4, 5, 6])
// => 2
```

### randVal(arr)

Returns a random value in array `arr`.

```javascript
randVal([4, 5, 6])
// => 5
```

### wrappers

warped exposes wrappers around some of the native `Array` functions to allow arrays to be given as the first argument instead of as the `this` value. For example, [`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) is wrapped to work like this:

```javascript
slice([1, 2, 3], 0, -1)
// => [2, 3]
```

List of the wrapped methods:

[`Array.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
[`Array.prototype.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)
[`Array.prototype.reverse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
