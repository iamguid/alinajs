var Alina = (function (root) {

  var animations = {};
  var animationsLength = 0;

  /**
   * Creates and return an instance of Animation.
   *
   * @constructor
   * @param {number|number[]} from - Slave number of animation.
   * @param {number|number[]} to - Slave number of animation.
   * @param {function} setter - Step callback.
   * @param {object} binder - Mixin object who changed state.
   * @param {function} easing
   * @returns {Animation} - instance of Animation.
   */
  function Alina (from, to, setter, binder, easing) {
    binder = +binder
      ? Alina.time(+binder)
      : binder || Alina.time();

    easing = Alina.utils.is(easing, 'array')
      || Alina.utils.is(easing, 'function')
      ? easing : Alina.linear;

    var anim = new Animation(from, to, setter, binder, easing);
    anim.bind();

    animations[anim.guid] = anim;
    animationsLength++;

    return anim;
  };

  /**
   * Animation Class
   */
  function Animation (from, to, setter, binder, easing) {
    var _ = this;

    _.guid = Alina.utils.iamGuid();
    _.from = from;
    _.to = to;
    _.res = from;
    _.state = 0;
    _.setter = setter;
    _.binder = binder;
    _.easing = easing;

    _.update = function () {
      requestAnimationFrame(function () {
        update.call(_);
      });
    };

    _.forceUpdate = function () {
      update.call(_);
    };

    _.bind = function () {
      _.update();
      _.binder.bind.call(_);
    };

    _.unbind = function () {
      _.binder.unbind.call(_);
    };

    _.remove = function () {
      _.unbind();
      delete animations[_.guid];
      animationsLength--;
    };
  };

  /**
   * Update animation values by state
   */
  function update () {
    var _ = this;

    var easing = _.state;
    if (Alina.utils.is(_.easing, 'array')) {
      for (var i = 0, ii = _.easing.length; i < ii; i++) {
        easing = _.easing[i](easing);
      }
    } else {
      easing = _.easing(_.state);
    }

    if (Alina.utils.is(_.res, 'array')) {
      for (var i = 0, ii = _.from.length; i < ii; i++) {
        _.res[i] = +_.from[i] +
          (_.to[i] - _.from[i]) * easing;
      }
    } else {
      _.res = +_.from + (_.to - _.from) * easing;
    }

    _.setter(_.res);
  };

  /**
   * Utils and helpers functions
   *
   * @type {Object}
   */
  Alina.utils = {};

  /**
   * Determine type of object
   *
   * @param  {*}      o - Object
   * @param  {String} type - An expected type of object
   * @return {Boolean}
   */
  Alina.utils.is = function (o, type) {
    type = String.prototype.toLowerCase.call(type);

    if (type == 'finite') {
      return isFinite(o);
    }

    if (type == 'array' &&
      (o instanceof Array || Array.isArray && Array.isArray(o))) {
      return true;
    }

    return (type == 'null' && o === null) ||
           (type == typeof o && o !== null) ||
           (type == 'object' && o === Object(o)) ||
           Object.prototype.toString.call(o).slice(8, -1).toLowerCase() == type;
  }

  /**
   * Support of requestAnimationFrame for different browsers
   * @see https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame
   */
  Alina.utils.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimationFrame ||
           function (callback) {
             setTimeout(callback, 16);
           };
  })();

  /**
   * Generate general unique id
   * @return {String} new random guid
   */
  Alina.utils.iamGuid = function () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
                 .toString(16)
                 .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() +
           '-' + s4() + '-' + s4() + s4() + s4();
  };

  /**
   * Get instance of animation by guid.
   * @param  {String} guid
   * @return {animation} instance of animation
   */
  Alina.getByGuid = function (guid) {
    return animations[guid] || null;
  };

  /**
   * This allow you to extend anything you want.
   * @param  {function} p - Plugin function
   */
  Alina.plugin = function (p) {
    p(Alina, Animation);
  };

  return Alina;
}(window || this));
