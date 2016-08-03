var ms;
var sb;
var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
var queue = [];
 
function example() {
  ms = new MediaSource;
  var video = document.querySelector('video');
  video.src = URL.createObjectURL(ms);
  ms.addEventListener('sourceopen', function() {
    sb = ms.addSourceBuffer(mimeCodec);
    fetch('fftest/10154354781949643-7894420.m4v');
    fetch('fftest/10154354781949643-7895421.m4v');
    fetch('fftest/10154354781949643-7896422.m4v');
  });
}

function fetch(url) {
  var xhr = new XMLHttpRequest;
  xhr.open('get', url);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function() {
    queue.push(xhr.response);
    sb.appendBuffer(xhr.response);
    sb.addEventListener('updateend', function() {
      console.log(sb.buffered, queue[0].byteLength);
    });
  };
  xhr.send();
}

window.onload = example;
