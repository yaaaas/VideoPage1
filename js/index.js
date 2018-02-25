jQuery(document).ready(function() {
  $('.bg-video-wrapper video').bind("loadedmetadata", function() {
    var vidRatio = this.videoWidth/this.videoHeight;

    // set css on video wrapper and parent
    var $videoWrapper = $('.bg-video-wrapper');
    $videoWrapper.css({
      'position': 'absolute',
      //'z-index': '2'
    });
    $videoWrapper.parent().css({
      'overflow': 'hidden',
      'position': 'relative',
      //'z-index': '1'
    });

    // reposition video and reposition on resize
    positionVid($videoWrapper, vidRatio);
    $(window).on('resize', function() {
      positionVid($videoWrapper, vidRatio);
    });
  });
});

function positionVid($videoWrapper, vidRatio) {
  var $videoWrapper = $videoWrapper,
      $video        = $videoWrapper.find('video'),
      $cont         = $videoWrapper.parent(),
      contWidth     = $cont.outerWidth(),
      contHeight    = $cont.outerHeight(),
      contRatio     = contWidth / contHeight;

  // remove previous styles for resizing
  $video.css({
    display: 'block',
    width: '',
    height: ''
  });

  if (vidRatio === contRatio) {
    $video.outerWidth('100%');
  }
  
  // When container is wider then the video width, make full width & vertically centered
  else if (vidRatio < contRatio) {
    $video.outerWidth('100%');
    $videoWrapper.css({
      top: 'unset',
      bottom: 'unset',
      left: 0,
      right: 0
    });
    var vidVertclPos = ($video.outerHeight() - contHeight) / 2;
    $videoWrapper.css('bottom', '-'+vidVertclPos+'px');
  }
  
  // When container is narrower then the video width, make full height & horizontally centered
  else if (vidRatio > contRatio) {
    $video.outerHeight('100%');
    $videoWrapper.css({
      left: 'unset',
      right: 'unset',
      top: 0,
      bottom: 0
    });
    var vidHorizntlPos = ($video.outerWidth() - contWidth) / 2;
    $videoWrapper.css('right', '-'+vidHorizntlPos+'px');
  }
}


//PLyr svg ajax load
(function(d, p){
    var a = new XMLHttpRequest(),
        b = d.body;
    a.open("GET", p, true);
    a.send();
    a.onload = function(){
        var c = d.createElement("div");
        c.style.display = "none";
        c.innerHTML = a.responseText;
        b.insertBefore(c, b.childNodes[0]);
    }
})(document, "https://cdn.plyr.io/1.3.6/sprite.svg");

//Setup plyr
plyr.setup({
  tooltips: true
});