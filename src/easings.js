// Use it if you want to costamizable
// easing functions based on beaier curves
// https://github.com/gre/bezier-easing

Alina.plugin(function (Alina, Animation) {

  // simple linear easing
  Alina.linear = function (t) {
    return t;
  };

  // accelerating from zero velocity
  Alina.easeInQuad = function (t) {
    return t * t;
  };

  // decelerating to zero velocity
  Alina.easeOutQuad = function (t) {
    return t * (2 - t);
  };

  // acceleration until halfway, then deceleration
  Alina.easeInOutQuad = function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // accelerating from zero velocity
  Alina.easeInCubic = function (t) {
    return t * t * t;
  };

  // decelerating to zero velocity
  Alina.easeOutCubic = function (t) {
    return (--t) * t * t + 1;
  };

  // acceleration until halfway, then deceleration
  Alina.easeInOutCubic = function (t) {
    return t < 0.5
      ? 4 * t * t * t
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  // accelerating from zero velocity
  Alina.easeInQuart = function (t) {
    return t * t * t * t;
  };

  // decelerating to zero velocity
  Alina.easeOutQuart = function (t) {
    return 1 - (--t) * t * t * t;
  };

  // acceleration until halfway, then deceleration
  Alina.easeInOutQuart = function (t) {
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - 8 * (--t) * t * t * t;
  };

  // accelerating from zero velocity
  Alina.easeInQuint = function (t) {
    return t * t * t * t * t;
  };

  // decelerating to zero velocity
  Alina.easeOutQuint = function (t) {
    return 1 + (--t) * t * t * t * t;
  };

  // acceleration until halfway, then deceleration
  Alina.easeInOutQuint = function (t) {
    return t < 0.5
      ? 16 * t * t * t * t * t
      : 1 + 16 * (--t) * t * t * t * t;
  };
});
