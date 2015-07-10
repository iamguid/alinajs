Alina.plugin(function (Alina, Animation) {

  Alina.time = function (duration, fps) {
    duration = duration || 1000;
    fps = fps || 16;

    var _;
    var timer;
    var startTime;
    var passedTime;
    var remaining = duration;
    var paused = true;
    var started = false;

    var isPaused = function () {
      return paused;
    };

    var isStarted = function () {
      return started;
    };

    var pause = function () {
      if (paused || !started) return;
      clearTimeout(timer);
      remaining -= passedTime;
      paused = true;
    };

    var resume = function () {
      if (!paused || !started) return;
      clearTimeout(timer);
      paused = false;
      run();
    };

    var start = function () {
      clearTimeout(timer);
      paused = false;
      started = true;
      remaining = duration;
      run();
    };

    var stop = function () {
      clearTimeout(timer);
      paused = true;
      started = false;
      remaining = duration;
    };

    var run = function () {
      startTime = Date.now();

      timer = setTimeout(function go () {
        passedTime = Date.now() - startTime;

        _.state = 1 / duration * (passedTime + (duration - remaining));

        if (_.state > 1) {
          _.state = 1;
        }

        if (_.state < 0) {
          _.state = 0;
        }

        _.update();

        if (passedTime < remaining) {
          timer = setTimeout(go);
        }
      }, fps);
    };

    var bind = function () {
      _ = this;
    };

    var unbind = function () {
      stop();
    };

    return {
      bind: bind,
      unbind: unbind,

      start: start,
      stop: stop,
      resume: resume,
      pause: pause,
      isPaused: isPaused,
      isStarted: isStarted
    };
  };

  Alina.force = function () {
    var _;

    var bind = function () {
      _ = this;
    };

    var unbind = function () {};

    var set = function (val) {
      _.state = val;
      _.update();
    };

    return {
      bind: bind,
      unbind: unbind,

      set: set
    };
  };

  Alina.interval = function (begin, end, current) {
    var _;

    current = current || begin;

    var calc = function () {
      var prc = (1 / Math.abs(end - begin))
      return (begin < end)
        ? prc * (current - begin)
        : prc * (begin - current);
    };

    var update = function () {
      _.state = calc();
      _.update();
    };

    var bind = function () {
      _ = this;
      update();
    };

    var unbind = function () {};

    var setBegin = function (val) {
      begin = val;
      update();
    };

    var setEnd = function (val) {
      end = val;
      update();
    };

    var setCurrent = function (val) {
      current = val;
      update();
    };

    return {
      bind: bind,
      unbind: unbind,

      setBegin: setBegin,
      setEnd: setEnd,
      setCurrent: setCurrent
    };
  };

  Alina.points = function (x1, y1, x2, y2) {
    var _;

    var calcLen = function (clientX, clientY) {
      var a = Math.pow(x - clientX, 2);
      var b = Math.pow(y - clientY, 2);

      return Math.sqrt(a + b);
    }

    var bind = function () {
      _ = this;

      element.onmousemove = function () {
        var length = calcLen(e.clientX, e.clientY)

        _.update();
      };
    };

    var unbind = function () {
      var _ = this;
      element.onmousemove = undefined;
    };

    return {
      bind: bind,
      unbind: unbind
    };
  };
});
