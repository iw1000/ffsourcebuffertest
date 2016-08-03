var ms;
var sb;
var video;
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var queue = [
  'fftest/10154354781949643-init.m4v',
  'fftest/10154354781949643-7894420.m4v',
  'fftest/10154354781949643-7895421.m4v',
  'fftest/10154354781949643-7896422.m4v',
];
 
function example() {
  ms = new MediaSource;
  video = document.querySelector('video');
  video.src = URL.createObjectURL(ms);
  ms.addEventListener('sourceopen', sourceOpen);
}

function sourceOpen(_) {
  console.log('sourceopen');
  sb = ms.addSourceBuffer(mimeCodec);
  fetch(queue.shift(), function(buf) {
    sb.addEventListener('updateend', function(_) {
      ms.endOfStream();
      video.play();
    });
    console.log('appendbuffer');
    sb.appendBuffer(buf);
  });
}

function fetch(url, cb) {
  var xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    cb(xhr.response);
  }
  xhr.send();
}

window.onload = example;
