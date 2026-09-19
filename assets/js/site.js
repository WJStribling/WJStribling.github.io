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

/* Inquiry form: submit in place so the visitor never leaves the page.
   Without JS the form still posts normally and lands on /thank-you/. */
(function () {
  var form = document.getElementById('inquiry');
  if (!form) return;
  var status = document.getElementById('inq-status');
  var button = form.querySelector('button[type=submit]');
  var ajax = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'x-p inq-status';
    status.textContent = 'Sending...';
    button.disabled = true;

    fetch(ajax, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (String(data.success) !== 'true') throw new Error(data.message || 'failed');
        form.reset();
        status.className = 'x-p inq-status ok';
        status.textContent = 'Thanks. That came through, and I will get back to you shortly.';
      })
      .catch(function () {
        status.className = 'x-p inq-status bad';
        status.innerHTML = 'Something went wrong on my end. Please email me directly at ' +
          '<a class="inline" href="mailto:williamjstribling@gmail.com">williamjstribling@gmail.com</a>.';
      })
      .then(function () { button.disabled = false; });
  });
})();
