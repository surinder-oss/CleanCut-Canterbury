/* Clean Cut Canterbury — shared JS */
(function () {
  'use strict';

  /* ---------- mobile drawer ---------- */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('mobileMenu');
  var close = document.getElementById('mobileClose');

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (burger) burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (burger) burger.addEventListener('click', function () { setMenu(true); });
  if (close) close.addEventListener('click', function () { setMenu(false); });
  if (menu) {
    // click the backdrop (but not the panel) to dismiss
    menu.addEventListener('click', function (e) { if (e.target === menu) setMenu(false); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  /* ---------- WhatsApp: choose Mani or Tiger ---------- */
  var waToggle = document.getElementById('waToggle');
  var waOptions = document.getElementById('waOptions');
  var waWidget = document.getElementById('waWidget');

  function setWa(open) {
    if (!waOptions || !waToggle) return;
    waOptions.hidden = !open;
    waToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  if (waToggle) {
    waToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      setWa(waOptions.hidden);
    });
    // clicking anywhere else closes it
    document.addEventListener('click', function (e) {
      if (waWidget && !waWidget.contains(e.target)) setWa(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setWa(false);
    });
    // picking a person closes it too
    waOptions.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setWa(false); });
    });
  }

  /* ---------- quote form -> pre-filled email ---------- */
  var form = document.getElementById('quoteForm');
  if (!form) return;

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }
  function field(id) {
    var el = document.getElementById(id);
    return el ? el.parentElement : null;
  }
  function showErr(id, msg) {
    var w = field(id); if (!w) return;
    var e = w.querySelector('.field-err');
    if (!e) {
      e = document.createElement('div');
      e.className = 'field-err';
      e.setAttribute('aria-live', 'polite');
      e.style.cssText = 'color:#c0392b;font-size:.82rem;margin-top:6px';
      w.appendChild(e);
    }
    e.textContent = msg;
    var el = document.getElementById(id);
    if (el) { el.setAttribute('aria-invalid', 'true'); el.style.borderColor = '#c0392b'; }
  }
  function clearErr(id) {
    var w = field(id); if (!w) return;
    var e = w.querySelector('.field-err'); if (e) e.textContent = '';
    var el = document.getElementById(id);
    if (el) { el.removeAttribute('aria-invalid'); el.style.borderColor = ''; }
  }
  function check(id) {
    var el = document.getElementById(id); if (!el) return true;
    var v = el.value.trim();
    if (el.hasAttribute('required') && !v) { showErr(id, 'This field is required'); return false; }
    if (id === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      showErr(id, 'Please enter a valid email'); return false;
    }
    clearErr(id); return true;
  }

  ['name', 'phone', 'email'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) el.addEventListener('blur', function () { check(id); });
  });

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    var ok = true, firstBad = null;
    ['name', 'phone', 'email'].forEach(function (id) {
      if (!check(id)) { ok = false; if (!firstBad) firstBad = id; }
    });
    if (!ok) {
      var b = document.getElementById(firstBad);
      if (b) b.focus();
      return;
    }

    var subject = 'Quote request — ' + val('service') + ' (' + (val('name') || 'Website') + ')';
    var body = [
      'Hi Clean Cut Canterbury team,', '',
      'I would like to request a free quote. My details are below:', '',
      'Service needed: ' + val('service'),
      'Name: ' + val('name'),
      'Phone: ' + val('phone'),
      'Email: ' + val('email'),
      'Suburb/Town: ' + val('suburb'), '',
      'Details:', val('msg'), '',
      'Thanks!'
    ].join('\r\n');

    window.location.href = 'mailto:cleancutcanterbury@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    var s = form.querySelector('.form-success');
    if (!s) {
      s = document.createElement('div');
      s.className = 'form-success';
      s.setAttribute('role', 'status');
      s.style.cssText = 'margin-top:18px;padding:16px 18px;border-radius:12px;' +
        'background:#e9f4d9;color:#256f33;font-size:.92rem';
      form.appendChild(s);
    }
    s.textContent = 'Thanks' + (val('name') ? ', ' + val('name') : '') +
      '! Your email app should open with the request ready to send. If it does not, ' +
      'email cleancutcanterbury@gmail.com or call Mani on 021 147 1573.';
  });
})();
