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
  // метка источника лида по странице (для бота-роутера Nimbo)
  function nimboSlug(){var p=location.pathname;
    if(/\/bots\/ai-assistant/.test(p))return 'bots_ai';
    if(/\/bots\/booking/.test(p))return 'bots_booking';
    if(/\/bots\/sales/.test(p))return 'bots_sales';
    if(/\/sites\/landing/.test(p))return 'sites_landing';
    if(/\/sites\/corporate/.test(p))return 'sites_corp';
    if(/\/seo\/promotion/.test(p))return 'seo_promo';
    if(/\/seo\/top/.test(p))return 'seo_top';
    if(/\/reputation/.test(p))return 'reputation';
    return 'hub';}
  var TG='https://t.me/stolica_dostavka_bot?start=nimbo_'+nimboSlug();
  // самодостаточные стили FAB (на страницах без nimbo.css, напр. хаб, иначе SVG растягивается на весь экран)
  function injCss(){
    if(document.getElementById('nimbo-fab-css')) return;
    // если подключён nimbo.css — он уже стилизует .nfab, второй раз не нужно
    var links=document.querySelectorAll('link[rel=stylesheet]');
    for(var i=0;i<links.length;i++){ if(/nimbo\.css/.test(links[i].href)) return; }
    var st=document.createElement('style');st.id='nimbo-fab-css';
    st.textContent='.nfab{position:fixed;right:18px;bottom:18px;z-index:150;display:flex;flex-direction:column;gap:10px}'
      +'.nfab a{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;box-shadow:0 14px 34px -12px rgba(0,0,0,.6);transition:transform .2s;text-decoration:none}'
      +'.nfab a:hover{transform:translateY(-3px)}'
      +'.nfab .call{background:#e9edf6;color:#05060a}'
      +'.nfab .tg{background:#2AABEE;color:#fff}'
      +'.nfab .write{background:#171a24;color:#e7e9ee;border:1px solid rgba(255,255,255,.16)}'
      +'.nfab svg{width:23px;height:23px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}'
      +'.nfab .tg svg{fill:currentColor;stroke:none}'
      +'.tg-cta{display:inline-flex;align-items:center;justify-content:center}'
      +'@media(max-width:680px){.nfab{display:none}}';
    (document.head||document.documentElement).appendChild(st);
  }
  injCss();
  ready(function(){
    // 1) Плавающая кнопка контакта на всех страницах (звонок + Telegram + почта)
    if(!document.querySelector('.nfab')){
      var fab=document.createElement('div');fab.className='nfab';
      fab.innerHTML='<a class="call" href="tel:+79011479079" aria-label="Позвонить">'
        +'<svg viewBox="0 0 24 24"><path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg></a>'
        +'<a class="tg" href="'+TG+'" target="_blank" rel="noopener" aria-label="Telegram" onclick="try{ym(109998862,\'reachGoal\',\'cta_telegram\')}catch(e){}">'
        +'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M21.9 4.3l-3.3 15.6c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9-8.1c.4-.3-.1-.5-.6-.2L6.6 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.2 1.3z"/></svg></a>'
        +'<a class="write" href="mailto:hello@nimbolabs.io" aria-label="Написать">'
        +'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></a>';
      document.body.appendChild(fab);
    }
    // 1b) Кнопка «Обсудить в Telegram» рядом с формой заявки
    var lf=document.getElementById('leadForm')||document.getElementById('hubForm');
    if(lf && !document.querySelector('.tg-cta')){
      var a=document.createElement('a');a.className='btn tg-cta';a.href=TG;a.target='_blank';a.rel='noopener';
      a.style.cssText='background:#2AABEE;color:#fff;margin-top:10px';
      a.setAttribute('onclick',"try{ym(109998862,'reachGoal','cta_telegram')}catch(e){}");
      a.textContent='Обсудить в Telegram';
      lf.appendChild(a);
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

/* ===== Nimbo: калькулятор стоимости (на /sites/* и /bots/*) ===== */
(function(){
  var path=location.pathname, cfg=null;
  if(/\/sites\//.test(path)) cfg={title:'Рассчитайте стоимость сайта',
    base:[['Лендинг',25000],['Сайт компании',45000],['Интернет-магазин',90000],['Премиум 3D/WebGL',120000]],
    add:[['CRM-интеграция',15000],['Копирайтинг',10000],['SEO-настройка',15000],['Анимация / 3D',20000]]};
  else if(/\/bots\//.test(path)) cfg={title:'Рассчитайте бота под задачу',
    base:[['Бот заявок / FAQ',20000],['Бот продаж',50000],['AI-нейроконсультант',60000]],
    add:[['Интеграция CRM (amo/Bitrix)',15000],['Несколько каналов (TG/WA/VK)',10000],['Онлайн-оплата',10000],['Обучение на ваших данных',15000]]};
  if(!cfg) return;
  function ready(fn){if(document.readyState!=='loading')fn();else document.addEventListener('DOMContentLoaded',fn);}
  ready(function(){
    if(document.querySelector('.calc-section')) return;
    var anchor=document.getElementById('zayavka')||document.querySelector('.nfooter'); if(!anchor) return;
    var fmt=function(n){return n.toLocaleString('ru-RU')+' ₽';};
    var baseH=cfg.base.map(function(b,i){return '<label class="calc-opt'+(i===0?' on':'')+'"><input type="radio" name="cbase" value="'+b[1]+'"'+(i===0?' checked':'')+'><span>'+b[0]+'</span></label>';}).join('');
    var addH=cfg.add.map(function(a){return '<label class="calc-opt"><input type="checkbox" class="cadd" value="'+a[1]+'"><span>'+a[0]+' +'+fmt(a[1])+'</span></label>';}).join('');
    var sec=document.createElement('section'); sec.className='calc-section alt';
    sec.innerHTML='<div class="wrap"><div class="kick reveal"><span class="num">≈</span> · Калькулятор</div>'
      +'<h2 class="h2 reveal">'+cfg.title+'</h2>'
      +'<p class="lead reveal">Соберите конфигурацию — ориентир по цене покажем сразу, без формы. Точную смету посчитаем бесплатно после короткого брифа.</p>'
      +'<div class="calc-wrap reveal"><div class="calc-col">'
      +'<div class="calc-field"><label>Что нужно</label><div class="calc-opts">'+baseH+'</div></div>'
      +'<div class="calc-field"><label>Дополнительно</label><div class="calc-opts">'+addH+'</div></div></div>'
      +'<div class="calc-out"><div class="lbl">Ориентир стоимости</div><div class="amt" id="cAmt">от '+fmt(cfg.base[0][1])+'</div>'
      +'<div class="note">Точная смета — бесплатно после брифа</div>'
      +'<a class="btn btn-a" href="#zayavka" onclick="try{ym(109998862,\'reachGoal\',\'calc_use\')}catch(e){}">Получить точную смету</a></div></div></div>';
    anchor.parentNode.insertBefore(sec,anchor);
    function recalc(){var b=+((sec.querySelector('input[name=cbase]:checked')||{}).value||0),a=0;
      sec.querySelectorAll('.cadd:checked').forEach(function(c){a+=+c.value;});
      sec.querySelectorAll('.calc-opt').forEach(function(o){var i=o.querySelector('input');o.classList.toggle('on',i.checked);});
      var el=document.getElementById('cAmt'); if(el) el.textContent='от '+fmt(b+a);}
    sec.querySelectorAll('input').forEach(function(i){i.addEventListener('change',recalc);}); recalc();
    if(window.IntersectionObserver){var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io2.unobserve(e.target);}})},{threshold:.1});sec.querySelectorAll('.reveal').forEach(function(el){io2.observe(el);});}
  });
})();
