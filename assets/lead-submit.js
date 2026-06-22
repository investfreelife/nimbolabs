/* Nimbo lead-submit — единый обработчик форм для всех 9 лендингов.
 *
 * Каждая форма должна иметь:
 *   <form data-lead-slug="hub">
 *     <input name="name"     required>
 *     <input name="contact"  required>
 *     <input name="task">     (опц.)
 *     <input name="website" type="text" tabindex="-1" autocomplete="off"
 *            style="position:absolute;left:-9999px;width:0;height:0;opacity:0" aria-hidden="true">  (honeypot)
 *     <input type="hidden" name="utm_source"> <input type="hidden" name="utm_medium">
 *     <input type="hidden" name="utm_campaign"> <input type="hidden" name="utm_content">
 *     <input type="hidden" name="utm_term"> <input type="hidden" name="lid">
 *     <button type="submit">…</button>
 *   </form>
 *
 * Поведение submit:
 *   1. Цель Яндекс.Метрики `lead_<slug>` (счётчик 109998862) — ВСЕГДА первой.
 *   2. POST в endpoint (Edge на Vercel-CRM).
 *   3. 200 → показать «Спасибо, свяжемся» (заменяет форму).
 *   4. !ok / сетевая ошибка → fallback на mailto:hello@nimbolabs.io (заявка не теряется).
 *   5. Honeypot заполнен → НИЧЕГО не делаем (тихий ok).
 */
(function () {
  'use strict';

  var ENDPOINT  = 'https://metallportal-crm2.vercel.app/api/public/lead';
  var YM_ID     = 109998862;
  var EMAIL     = 'hello@nimbolabs.io';
  var UTM_KEYS  = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'lid'];

  function reachGoal(slug) {
    try { window.ym && ym(YM_ID, 'reachGoal', 'lead_' + slug); } catch (e) { /* noop */ }
  }

  function hydrateUtm(form) {
    var p = new URLSearchParams(location.search);
    UTM_KEYS.forEach(function (k) {
      var el = form.querySelector('[name="' + k + '"]');
      if (el && !el.value) el.value = p.get(k) || '';
    });
  }

  function readPayload(form, slug) {
    var get = function (n) {
      var el = form.querySelector('[name="' + n + '"]');
      return el ? (el.value || '').trim() : '';
    };
    var payload = {
      slug:     slug,
      name:     get('name'),
      contact:  get('contact'),
      task:     get('task'),
      brand:    get('brand'),
      package:  get('package'),
      website:  get('website'),    // honeypot — должен быть пустой
      page:     location.href,
    };
    UTM_KEYS.forEach(function (k) { payload[k] = get(k); });
    return payload;
  }

  function buildMailto(payload, slug) {
    var lines = ['Заявка с лендинга Nimbo (' + slug + ')'];
    if (payload.name)    lines.push('Имя: '     + payload.name);
    if (payload.contact) lines.push('Контакт: ' + payload.contact);
    if (payload.task)    lines.push('Задача: '  + payload.task);
    if (payload.brand)   lines.push('Бренд: '   + payload.brand);
    if (payload.package) lines.push('Пакет: '   + payload.package);
    lines.push('Страница: ' + payload.page);
    var subj = 'Заявка — ' + (payload.name || 'Nimbo · ' + slug);
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subj) +
           '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function showThanks(form) {
    var box = document.createElement('div');
    box.setAttribute('role', 'status');
    box.style.cssText = 'padding:18px 20px;border:1px solid currentColor;border-radius:14px;font:15px/1.5 Inter,system-ui,sans-serif;color:inherit;background:rgba(0,180,120,.08)';
    box.innerHTML = '<strong>Спасибо!</strong> Заявка принята — свяжемся в ближайшее время.';
    form.replaceWith(box);
  }

  function falbackMailto(payload, slug) {
    location.href = buildMailto(payload, slug);
  }

  function attach(form) {
    var slug = form.getAttribute('data-lead-slug');
    if (!slug) return;
    hydrateUtm(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var payload = readPayload(form, slug);

      reachGoal(slug);

      // Honeypot: бот → имитируем успех, ничего не шлём.
      if (payload.website) { showThanks(form); return; }

      // Мин. валидация: имя + контакт обязательны.
      if (!payload.name || !payload.contact) {
        if (form.reportValidity) form.reportValidity();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var btnText = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Отправляем…'; }

      // 12-секундный таймаут — иначе фолбэк.
      var ctrl, timer;
      try {
        ctrl  = new AbortController();
        timer = setTimeout(function () { ctrl.abort(); }, 12000);
      } catch (e) { ctrl = null; }

      fetch(ENDPOINT, {
        method:  'POST',
        mode:    'cors',
        credentials: 'omit',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
        signal:  ctrl ? ctrl.signal : undefined,
      })
        .then(function (r) {
          if (timer) clearTimeout(timer);
          if (!r.ok) throw new Error('http_' + r.status);
          return r.json().catch(function () { return {}; });
        })
        .then(function () { showThanks(form); })
        .catch(function () {
          if (btn) { btn.disabled = false; btn.textContent = btnText; }
          falbackMailto(payload, slug);
        });
    });
  }

  function init() {
    document.querySelectorAll('form[data-lead-slug]').forEach(attach);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
