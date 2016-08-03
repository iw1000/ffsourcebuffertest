var ms;

function example() {
  var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  ms = new MediaSource;
  var video = document.querySelector('video');
  video.src = URL.createObjectURL(ms);
  ms.addEventListener('sourceopen', function() {
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
    ms.appendBuffer(xhr.response);
    console.log(ms.buffered);
  };
  xhr.send();
}

window.onload = example;
