/* Clean Cut Canterbury — shared JS */
(function(){
  // year
  var yr=document.getElementById('yr'); if(yr) yr.textContent=new Date().getFullYear();

  // sticky header shadow
  var hdr=document.getElementById('hdr');
  function onScroll(){ if(hdr) hdr.classList.toggle('scrolled', window.scrollY>40); }
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // mobile menu
  var burger=document.getElementById('burger');
  if(burger){ burger.addEventListener('click',function(){ document.body.classList.toggle('menu-open'); }); }

  // mobile dropdown toggle
  document.querySelectorAll('.dd>button').forEach(function(b){
    b.addEventListener('click',function(e){
      if(window.innerWidth<=680){ e.preventDefault(); b.parentElement.classList.toggle('open'); }
    });
  });
  // close menu on link click
  document.querySelectorAll('.navlinks a').forEach(function(a){
    a.addEventListener('click',function(){ document.body.classList.remove('menu-open'); });
  });

  // reveal on scroll
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // counters
  var cio=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      var el=e.target, target=+el.dataset.count, suffix=el.dataset.suffix||'';
      var dur=1300, t0=performance.now();
      function tick(t){ var p=Math.min((t-t0)/dur,1), ease=1-Math.pow(1-p,3);
        el.textContent=Math.round(target*ease)+suffix; if(p<1) requestAnimationFrame(tick); }
      requestAnimationFrame(tick); cio.unobserve(el);
    });
  },{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){ cio.observe(el); });

  // quote form -> validate, then mailto (CRLF line breaks for mobile mail)
  var form=document.getElementById('quoteForm');
  if(form){
    function g(id){ var el=document.getElementById(id); return el?el.value.trim():''; }
    function wrap(id){ var el=document.getElementById(id); return el?el.closest('.fld'):null; }
    function showErr(id,msg){
      var w=wrap(id); if(!w) return;
      w.classList.add('error');
      var e=w.querySelector('.field-err');
      if(!e){ e=document.createElement('div'); e.className='field-err'; e.setAttribute('aria-live','polite'); w.appendChild(e); }
      e.textContent=msg;
      var el=document.getElementById(id); if(el){ el.setAttribute('aria-invalid','true'); }
    }
    function clearErr(id){
      var w=wrap(id); if(!w) return;
      w.classList.remove('error');
      var e=w.querySelector('.field-err'); if(e) e.textContent='';
      var el=document.getElementById(id); if(el){ el.removeAttribute('aria-invalid'); }
    }
    function validField(id){
      var el=document.getElementById(id); if(!el) return true;
      var v=el.value.trim();
      if(el.hasAttribute('required') && !v){ showErr(id, 'This field is required'); return false; }
      if(id==='email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){ showErr(id, 'Please enter a valid email'); return false; }
      clearErr(id); return true;
    }
    ['name','phone','email'].forEach(function(id){
      var el=document.getElementById(id);
      if(el) el.addEventListener('blur', function(){ validField(id); });
    });
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      var ok=true, firstBad=null;
      ['name','phone','email'].forEach(function(id){
        if(!validField(id)){ ok=false; if(!firstBad) firstBad=id; }
      });
      if(!ok){ var b=document.getElementById(firstBad); if(b) b.focus(); return; }

      var subject='Quote request — '+g('service')+' ('+(g('name')||'Website')+')';
      var lines=[
        'Hi Clean Cut Canterbury team,','',
        'I would like to request a free quote. My details are below:','',
        'Service needed: '+g('service'),
        'Property type: '+g('type'),
        'Name: '+g('name'),
        'Phone: '+g('phone'),
        'Email: '+g('email'),
        'Suburb/Town: '+g('suburb'),'',
        'Details:', g('msg'),'',
        'Thanks!'
      ];
      var body=lines.join('\r\n');
      window.location.href='mailto:cleancutcanterbury@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);

      // success confirmation
      var s=form.querySelector('.form-success');
      if(!s){ s=document.createElement('div'); s.className='form-success'; s.setAttribute('role','status'); form.appendChild(s); }
      s.textContent='Thanks'+(g('name')?', '+g('name'):'')+'! Your email app should open with your request ready to send. If it doesn’t, email us at cleancutcanterbury@gmail.com or call Mani on 021 147 1573.';
      s.style.display='block';
    });
  }

  // floating leaves over a .hero or .page-hero
  var host=document.querySelector('.hero') || document.querySelector('.page-hero');
  if(host){
    var colors=['#5cba47','#7fd05f','#3fa12f'];
    for(var i=0;i<6;i++){
      var l=document.createElement('span'); l.className='leaf';
      var s=8+Math.random()*10;
      l.style.cssText='left:'+(Math.random()*100)+'%;width:'+s+'px;height:'+(s*1.3)+'px;background:'+colors[i%3]+
        ';border-radius:0 100% 0 100%;animation-duration:'+(9+Math.random()*8)+'s;animation-delay:'+(-Math.random()*10)+'s;opacity:'+(0.25+Math.random()*0.35);
      host.appendChild(l);
    }
  }
})();
