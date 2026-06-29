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

  // quote form -> mailto (each field on its own line, CRLF for mobile mail)
  var form=document.getElementById('quoteForm');
  if(form){
    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      function g(id){ var el=document.getElementById(id); return el?el.value.trim():''; }
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
