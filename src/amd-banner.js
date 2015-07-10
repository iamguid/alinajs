(function (glob, factory) {
  // AMD support
  if (typeof define == 'function' && define.amd) {
    // Define as an anonymous module
    define(function () {
      return factory(glob);
    });
  } else if (typeof exports != 'undefined') {
    module.exports = factory(glob);
  } else {
    glob.Alina = factory(glob);
  }
}(window || this, function (glob) {
