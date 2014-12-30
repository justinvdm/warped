;(function() {
  if (typeof module != 'undefined')
    module.exports = chemist
  else if (typeof define == 'function' && define.amd)
    define(function() { return chemist })
  else
    this.chemist = chemist
}).call(this);
