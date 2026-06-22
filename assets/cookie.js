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
