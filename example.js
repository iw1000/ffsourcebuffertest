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
    fetch('fftest/10154354781949643-7894420.m4v');
    fetch('fftest/10154354781949643-7895421.m4v');
    fetch('fftest/10154354781949643-7896422.m4v');
    while (true) {
      console.log('while loop');
      setTimeout(function() {
        if (queue.length > 0 && !sb.updating && ms.readyState === 'open') {
          console.log('append');
          sb.appendBuffer(queue.shift());
          console.log(sb.buffered);
        }
      }, 1000);
    }
  }, false);
}

function fetch(url) {
  var xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    console.log('push');
    queue.push(xhr.response);
  };
  xhr.send();
}

window.onload = example;
