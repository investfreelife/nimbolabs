/* Nimbo — cookie-уведомление (152-ФЗ / Яндекс.Метрика). Самодостаточно, без зависимостей. */
(function(){
  try{ if(localStorage.getItem('nimbo-cookie-consent')==='1') return; }catch(e){}
  function mk(){
    if(document.getElementById('nimbo-cookie')) return;
    var b=document.createElement('div');
    b.id='nimbo-cookie';
    b.setAttribute('role','dialog');
    b.setAttribute('aria-label','Уведомление об использовании cookie');
    b.style.cssText='position:fixed;left:16px;right:16px;bottom:16px;z-index:99999;max-width:760px;margin:0 auto;'
      +'background:#0f1118;color:#e7e9ee;border:1px solid rgba(255,255,255,.14);border-radius:14px;'
      +'padding:16px 18px;box-shadow:0 18px 50px -16px rgba(0,0,0,.6);'
      +'font:14px/1.55 -apple-system,Segoe UI,Inter,system-ui,sans-serif;'
      +'display:flex;gap:14px 18px;align-items:center;flex-wrap:wrap';
    b.innerHTML='<span style="flex:1;min-width:230px">Мы используем cookie и сервис Яндекс.Метрика, чтобы сайт работал и становился удобнее. '
      +'Оставаясь на сайте, вы соглашаетесь с обработкой данных в соответствии с '
      +'<a href="/privacy/" style="color:#8b9cff;text-decoration:underline">Политикой конфиденциальности</a>.</span>'
      +'<span style="display:flex;gap:10px;flex-wrap:wrap">'
      +'<a href="/privacy/" style="color:#aeb4c2;text-decoration:none;padding:10px 14px;border:1px solid rgba(255,255,255,.2);border-radius:9px;font-weight:600">Подробнее</a>'
      +'<button type="button" id="nimbo-cookie-ok" style="cursor:pointer;border:0;border-radius:9px;padding:10px 18px;font-weight:700;'
      +'background:linear-gradient(120deg,#6d7cff,#8b5cff);color:#fff">Принять</button>'
      +'</span>';
    document.body.appendChild(b);
    document.getElementById('nimbo-cookie-ok').addEventListener('click',function(){
      try{ localStorage.setItem('nimbo-cookie-consent','1'); }catch(e){}
      b.style.transition='opacity .25s,transform .25s'; b.style.opacity='0'; b.style.transform='translateY(8px)';
      setTimeout(function(){ b.remove(); },260);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',mk); else mk();
})();

/* ===== Nimbo UX: плавающий контакт + блок реальных работ (общий для всех) ===== */
(function(){
  function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
  ready(function(){
    // 1) Плавающая кнопка контакта на всех страницах
    if(!document.querySelector('.nfab')){
      var fab=document.createElement('div');fab.className='nfab';
      fab.innerHTML='<a class="call" href="tel:+79011479079" aria-label="Позвонить">'
        +'<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg></a>'
        +'<a class="write" href="mailto:hello@nimbolabs.io" aria-label="Написать">'
        +'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>';
      document.body.appendChild(fab);
    }
    // 2) Блок «Наши работы» (реальные сайты) — только на лендингах (есть .nheader), перед футером
    var foot=document.querySelector('.nfooter');
    if(foot && document.querySelector('.nheader') && !document.querySelector('.proof')){
      var works=[
        {n:'Автоклимат',d:'Автоклимат-сервис',u:'https://investfreelife.github.io/avtoklimatcom-192/modern-v2/'},
        {n:'Avtoclean',d:'Детейлинг',u:'https://investfreelife.github.io/avtoclean/liquid-chrome/'},
        {n:'Айрон Дьюк',d:'Реставрация классики',u:'https://investfreelife.github.io/ayron-dyuk-304/heritage-garage/'},
        {n:'Авто КД',d:'Автосервис',u:'https://investfreelife.github.io/avto-kd-303/technical-precision/'},
        {n:'DeLars',d:'Автосервис',u:'https://investfreelife.github.io/delars-36/neo-brutalist/'}
      ];
      var s=document.createElement('section');s.className='proof alt';
      var html='<div class="wrap"><div class="kick"><span class="num">★</span> · Наши работы</div>'
        +'<h2 class="h2">Реальные сайты, которые мы <em>сделали</em></h2>'
        +'<p class="lead">Не обещания — живые проекты Nimbo. Откройте и оцените уровень дизайна.</p>'
        +'<div class="pf-grid">';
      works.forEach(function(w){html+='<a class="pf" href="'+w.u+'" target="_blank" rel="noopener"><b>'+w.n+'</b><span>'+w.d+'</span><span class="ar">Открыть ↗</span></a>';});
      html+='</div></div>';
      s.innerHTML=html;
      foot.parentNode.insertBefore(s,foot);
    }
  });
})();
