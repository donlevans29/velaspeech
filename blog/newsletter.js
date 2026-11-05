// Newsletter signup — submits to Netlify Forms ("newsletter") without a page reload.
document.querySelectorAll('form[name="newsletter"]').forEach(function (form) {
  var btn = form.querySelector('button[type="submit"]');
  var status = form.querySelector('.newsletter-status');
  var source = form.querySelector('input[name="source-page"]');
  if (source) source.value = location.pathname;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var email = form.querySelector('input[name="email"]');
    if (!email.value.trim() || !email.checkValidity()) {
      email.focus();
      status.textContent = 'Please enter a valid email address.';
      status.className = 'newsletter-status error';
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Signing you up…';
    try {
      var res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });
      if (!res.ok) throw new Error('Server error');
      form.querySelectorAll('input, button').forEach(function (el) { el.disabled = true; });
      btn.textContent = 'You’re subscribed';
      status.textContent = 'Thank you! Look for Velia’s next post in your inbox.';
      status.className = 'newsletter-status';
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
      status.textContent = 'Something went wrong. Please try again in a moment.';
      status.className = 'newsletter-status error';
    }
  });
});
