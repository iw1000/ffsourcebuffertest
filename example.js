function example() {
  var mimeCodec = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
  var ms = new MediaSource;
  var video = document.querySelector('video');
  console.log(window.URL.createObjectURL(ms));
  video.src = URL.createObjectURL(ms);
  ms.addEventListener('sourceopen', function() {
    console.log('open');
  });
}

window.onload = example;
