var ms;
var sb;
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var queue = [];
 
function example() {
  ms = new MediaSource;
  var video = document.querySelector('video');
  video.src = URL.createObjectURL(ms);
  ms.addEventListener('sourceopen', function() {
    console.log('open');
    sb = ms.addSourceBuffer(mimeCodec);
    fetch('fftest/check0.mp4');
    fetch('fftest/check1.mp4');
    // fetch('fftest/10154354781949643-7894420.m4v');
    // fetch('fftest/10154354781949643-7895421.m4v');
    // fetch('fftest/10154354781949643-7896422.m4v');
  }, false);
}

function fetch(url) {
  var xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    console.log('push');
    if (ms.readyState === 'open') {
      sb.appendBuffer(xhr.response);
      sb.addEventListener('updateend', function() {
        console.log(sb.buffered);
      });
    } else {
      ms.addEventListener('sourceopen', function() {
        console.log('openagain');
      });
    }
  };
  xhr.send();
}

window.onload = example;
