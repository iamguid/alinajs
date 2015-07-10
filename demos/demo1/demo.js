var animationPresets = {

  moveX: function($object, binder, easing) {
    var currPos = $object.position();

    var anim = Alina(0, 300, function (val) {
      $object.css({
        'left': currPos.left + val,
      });
    }, binder, easing);

    return anim;
  },

  rotate: function($object, binder, easing) {
    var rotate = function (deg) {
      var str = '-ms-transform: rotate(' + deg + 'deg);';
      str += '-webkit-transform: rotate(' + deg + 'deg);';
      str += 'transform: rotate(' + deg + 'deg);';

      $object.attr('style', str);
    };

    var anim = Alina(0, 360, function (val) {
      rotate(val);
    }, binder, easing);

    return anim;
  },

  color: function($object, binder, easing) {
    var color = function (r, g, b) {
      r = Math.floor(r);
      g = Math.floor(g);
      b = Math.floor(b);

      return 'background: rgb(' + r + ', '+ g + ', '+ b + ')';
    };

    var anim = Alina([10, 20, 30], [255, 255, 255], function (val) {
      $object.attr('style', color(val[0], val[1], val[2]));
    }, binder, easing);

    return anim;
  }
};


$(document).ready(function () {
  var $object = $('.object');
  var $controls = $('.controls');
  var $easings = $('.easings');
  var $presets = $('.presets');

  var easingName = 'linear';
  var presetName = 'moveX';
  var anim;

  var objectReset = (function () {
    var width = 100;
    var height = 100;

    $object.attr('style', '');
    $object.css({
      'width': width,
      'height': height,
      'left': $(window).width() / 2 - width,
      'top':  $(window).height() / 2 - height
    });
  });

  var setAnim = function () {
    objectReset();
    if (anim) anim.remove();
    anim = animationPresets[presetName]($object, Alina.time(5000), Alina[easingName])
  };

  setAnim();

  $easings.on('change', function () {
    easingName = this.value;
    setAnim();
  });

  $presets.on('change', function () {
    presetName = this.value;
    setAnim();
  });

  $controls.click(function (e) {
    var $target = $(e.target);
    var action = $target.data('action');

    if (action == 'start') {
      anim.binder.start();
    } else if (action == 'stop') {
      anim.binder.stop();
    } else if (action == 'pause') {
      anim.binder.pause();
    } else if (action == 'resume') {
      anim.binder.resume();
    }
  });

});
