
$(document).ready(function () {
  var easings = [
    'linear',
    'easeInQuad',
    'easeOutQuad',
    'easeInOutQuad',
    'easeInCubic',
    'easeOutCubic',
    'easeInOutCubic',
    'easeInQuart',
    'easeOutQuart',
    'easeInOutQuart',
    'easeInQuint',
    'easeOutQuint',
    'easeInOutQuint'
  ];

  var animProgs = [];

  var buildAnimProg = function (easing, $wrapper) {
    var $template = $('#anim-template .anim').clone();
    $template.find('.anim-name').html(easing);

    var $mainTrack = $($template.find('.anim-prog-mainTrack'));
    var $lowTrack = $($template.find('.anim-prog-lowTrack'));
    var $overTrack = $($template.find('.anim-prog-overTrack'));

    $wrapper.append($template);

    return {
      node: $template,
      setProgress: function (val) {
        $mainTrack.css('width', '0%');
        $lowTrack.css('margin-left', '10%');
        $overTrack.css('margin-right', '10%');

        if (val < 0) {
          $lowTrack.css('margin-left', (val + 10) + '%');
        } else if (val > 100) {
          $mainTrack.css('width', '100%');
          $overTrack.css('margin-right', 10 - (val - 100) + '%');
        } else {
          $mainTrack.css('width', val + '%');
        }
      }
    }
  };

  $.each(easings, function (i, val) {
    var prog = buildAnimProg(val, $('.animations'));

    var binder = Alina.time(5000)
    var anim = Alina(0, 100, function (val) {
      prog.setProgress(val);
    }, binder, Alina[val]);
    binder.start();
  });
});
