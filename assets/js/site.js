/* Click-to-play: swap a thumbnail for the real player only when asked,
   so no third-party embed loads until the visitor wants it. */
(function () {
  document.querySelectorAll('a.play[data-embed]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var src = a.getAttribute('data-embed');
      var ap = a.getAttribute('data-ap');
      if (ap) src += (src.indexOf('?') > -1 ? '&' : '?') + ap;
      var f = document.createElement('iframe');
      f.src = src;
      f.title = (a.getAttribute('aria-label') || '').replace(/^Play /, '');
      f.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write');
      f.setAttribute('allowfullscreen', '');
      a.parentNode.replaceChild(f, a);
    });
  });
})();
