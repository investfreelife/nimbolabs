# NIMBO — единый шаблон лендинга (ОБЯЗАТЕЛЬНО соблюдать дословно)

Цель: ВСЕ лендинги выглядят как ОДИН сайт Nimbo. Стиль задаёт `/assets/nimbo.css`. Свои цвета/шрифты НЕ вводить — только токены var(--…) и классы из nimbo.css. Можно добавить МИНИ `<style>` только для уникального блока (демо-календарь/калькулятор/схема), но цвета — строго var(--a1/--a2/--a3/--ink/--soft/--card/--line…).

## <head> — обязательно
- `<meta charset>`, viewport.
- `<link rel="stylesheet" href="/assets/nimbo.css">` (главный стиль).
- title/description/canonical (canonical = точный URL лендинга) + OG/Twitter + geo Москва (RU-MOW).
- СОХРАНИТЬ существующий сниппет Яндекс.Метрики 109998862 (ym init + webvisor + noscript) — НЕ удалять, НЕ менять id.
- JSON-LD: Service + BreadcrumbList + FAQPage (сохранить/собрать из контента).
- favicon: `<link rel="icon" type="image/png" href="/assets/favicon.png">` если есть; иначе опустить.

## ШАПКА — вставить ДОСЛОВНО (заменить {CRUMB} и {CTA})
```html
<header class="nheader"><div class="wrap"><nav>
  <a class="nbrand" href="/"><span class="dot"></span>Nimbo</a>
  <div class="ncrumbs"><a href="/">Главная</a><span class="sep">/</span><a href="/#napravleniya">Направления</a><span class="sep">/</span><span>{CRUMB}</span></div>
  <a class="nphone" href="tel:+79011479079">+7&nbsp;901&nbsp;147‑90‑79</a>
  <a class="btn btn-a" href="#zayavka">{CTA}</a>
</nav></div></header>
```

## HERO — паттерн (класс .nhero)
```html
<section class="nhero"><div class="wrap">
  <div class="eyebrow">{НАДЗАГОЛОВОК}</div>
  <h1>{H1, можно <em>слово</em> хром-курсивом}</h1>
  <p class="sub">{подзаголовок-выгода}</p>
  <div class="cta"><a class="btn btn-a" href="#zayavka">{CTA}</a><a class="btn btn-g" href="tel:+79011479079">Позвонить</a></div>
  <div class="chips"><span class="chip">{триггер1}</span><span class="chip">{триггер2}</span><span class="chip">{триггер3}</span></div>
</div></section>
```

## СЕКЦИИ — использовать классы nimbo.css
- Заголовок секции: `<div class="kick"><span class="num">NN</span> · {лейбл}</div>` + `<h2 class="h2">… <em>акцент</em></h2>` + `<p class="lead">…</p>`.
- Плитки услуг/болей/преимуществ: `<div class="grid g3">` (или g2/g4 / .pill-grid) из `<div class="ncard"><div class="ix">01</div><h3>…</h3><p>…</p></div>`.
- Шаги «как работаем»: `<div class="steps"><div class="step"><h3>…</h3><p>…</p></div>…</div>`.
- Пакеты/цены: `<div class="price-grid"><div class="price"><h3>…</h3><p>…</p><div class="amt">…<small>…</small></div><a class="btn btn-a" href="#zayavka">…</a></div></div>`. Цены НЕ выдумывать (сохранить как в исходнике; нет цены → «по аудиту»/«обсудим»).
- Чередование фона секций: добавлять класс `alt` на каждую вторую `<section class="alt">`.
- FAQ: `<div class="faq"><details class="qa"><summary>…</summary><p>…</p></details>…</div>`.
- Уникальные блоки (демо-календарь, калькулятор, схема каналов, data-viz) — СОХРАНИТЬ логику/JS, но перекрасить под токены var(--…), фон карточек var(--card), границы var(--line).

## ФОРМА ЗАЯВКИ + КОНТАКТЫ (id="zayavka")
```html
<section class="alt" id="zayavka"><div class="wrap">
  <div class="kick"><span class="num">NN</span> · Заявка</div>
  <h2 class="h2">{финальный призыв}</h2>
  <p class="lead">{подводка}</p>
  <form class="nform" action="#" onsubmit="try{ym(109998862,'reachGoal','{GOAL}')}catch(e){};var n=this.querySelector('[name=name]').value,c=this.querySelector('[name=contact]').value;location.href='mailto:hello@nimbolabs.io?subject=Заявка%20{CRUMB}&body='+encodeURIComponent('Имя: '+n+'%0AКонтакт: '+c+'%0AСтраница: '+location.href);return false;">
    <input name="name" placeholder="Ваше имя" required>
    <input name="contact" placeholder="Телефон, e-mail или мессенджер" required>
    <input type="hidden" name="utm_source"><input type="hidden" name="utm_medium"><input type="hidden" name="utm_campaign"><input type="hidden" name="utm_content"><input type="hidden" name="utm_term">
    <button class="btn btn-a" type="submit">{CTA}</button>
    <span class="microcopy">Нажимая, вы соглашаетесь с <a href="/privacy/" style="color:var(--soft)">политикой</a>. Без обязательств.</span>
  </form>
</div></section>
<script>(function(){var p=new URLSearchParams(location.search);['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){var el=document.querySelector('[name='+k+']');if(el)el.value=p.get(k)||'';});try{if(p.get('lid'))ym(109998862,'params',{lid:p.get('lid')});}catch(e){}})();</script>
```

## ФУТЕР — вставить ДОСЛОВНО (заменить две {КРОСС-СЕЛЛ} ссылки опционально оставить как есть)
```html
<footer class="nfooter"><div class="wrap">
  <div class="cols">
    <div><div class="big">Nimbo</div><p style="color:var(--mut);margin-top:12px;max-width:34ch">Digital-агентство полного цикла. Сайты, боты, SEO и репутация — под одной крышей.</p></div>
    <div><h4>Направления</h4><a href="/bots/ai-assistant/">AI-консультант</a><a href="/bots/booking/">Онлайн-запись</a><a href="/bots/sales/">Бот продаж</a><a href="/sites/landing/">Лендинг</a><a href="/sites/corporate/">Сайт компании</a><a href="/seo/promotion/">SEO</a><a href="/seo/top/">Топ Яндекса</a><a href="/reputation/">Репутация</a></div>
    <div><h4>Связь</h4><a href="tel:+79011479079">+7 901 147‑90‑79</a><a href="mailto:hello@nimbolabs.io">hello@nimbolabs.io</a><a href="/">nimbolabs.io</a></div>
  </div>
  <div class="nimbo-credit"><span>© 2026 Nimbo — digital-агентство полного цикла</span><span class="nc-links"><a href="/privacy/">Политика конфиденциальности</a></span></div>
</div></footer>
<div class="ncallbar"><a class="c1" href="#zayavka">Оставить заявку</a><a class="c2" href="tel:+79011479079">Позвонить</a></div>
```

## Перед </body>
```html
<script src="/assets/cookie.js" defer></script>
<script>var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});</script>
```
+ добавить класс `reveal` к ключевым блокам (заголовки секций, сетки) для анимации появления.

## ЖЁСТКИЕ ПРАВИЛА
- НЕ выдумывать кейсы/цифры/отзывы/цены/Telegram. Сохранить честные формулировки из исходника.
- Сохранить ВЕСЬ смысловой контент исходного лендинга (H1, услуги, шаги, цены, FAQ, уникальные блоки).
- 1 интент = 1 цель: основной CTA везде ведёт на #zayavka.
- Только токены nimbo.css. Никаких своих палитр/градиентов кроме var(--chrome).
- Mobile-first, prefers-reduced-motion уважать (наследуется из nimbo.css).
