(function() {
  var html = document.documentElement;
  var sWidth = html.getBoundingClientRect().width;
  if (sWidth > 414) {
    sWidth = 414;
  }
  console.log(sWidth);
  html.style.fontSize = sWidth / 15 + 'px';
})();