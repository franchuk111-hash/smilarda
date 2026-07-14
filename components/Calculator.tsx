'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

/* ================================================================
   █ АДМІНКА █ — редагуйте значення нижче. Без програміста.
   ================================================================ */
const CONFIG = {
  /* Базова ціна РОБІТ за 1 м², грн — узгоджено зі сторінкою /tsiny
     (косметичний від 1900, капітальний під ключ від 3200 грн/м²).
     Матеріали додаються окремо коефіцієнтом нижче. */
  basePrice: {
    cosmetic: 1900,  // Косметичний
    capital: 3200,   // Капітальний
    turnkey: 3600,   // Під ключ
    newbuild: 2800,  // Ремонт новобудови
    partial: 1400,   // Частковий
  } as Record<string, number>,

  roomCoef: { flat: 1.0, house: 1.1, office: 1.05, shop: 1.1, commercial: 1.15 } as Record<string, number>,

  worksInc: {
    demontazh: 0.05, elektryka: 0.12, santehnika: 0.12, shtukaturka: 0.1,
    shpaklivka: 0.06, farbuvannya: 0.05, shpalery: 0.05, plytka: 0.1,
    laminat: 0.05, stelya: 0.06, gipsokarton: 0.08, dveri: 0.05,
    prybyrannya: 0.02, smittya: 0.03,
  } as Record<string, number>,

  materialsFactor: { workonly: 0, mymaterials: 0, purchase: 0.6 } as Record<string, number>,
  urgencyCoef: { urgent: 1.1, week: 1.03, month: 1.0, justchecking: 1.0 } as Record<string, number>,

  rangeDown: 0.06,
  rangeUp: 0.05,
  minOrder: 15000,
  maxOrder: 4000000,
  area: { min: 20, max: 300, def: 62 },
  calcDelayMs: 2600,

  /* ── Куди йде заявка ──
     Впишіть токен бота й chat_id, щоб заявки падали у ваш Telegram.
     Отримати: @BotFather (токен) та @userinfobot (ваш chat_id). */
  telegram: { botToken: '8504240994:AAElemhmCwjLAsPjh3dB-Y5HaeuQBrJ0H6c', chatId: '-1004435833893' },

  company: { phoneDisplay: '+38 (097) 779 95 13', phoneHref: '+380977799513', telegram: 'https://t.me/' },

  trust: [
    { n: '10+ років', t: 'досвіду у Смілі' },
    { n: 'Договір', t: 'і гарантія на роботи' },
    { n: 'Безкоштовно', t: 'виїзд на замір' },
  ],
};

type Opt = { k: string; l: string; e?: string };
type Step = { key: string; title: string; sub?: string; type: 'radio' | 'checks' | 'area'; options?: Opt[] };

const STEPS: Step[] = [
  { key: 'repair', title: 'Що потрібно зробити?', sub: 'Оберіть тип ремонту', type: 'radio', options: [
    { k: 'cosmetic', l: 'Косметичний ремонт', e: '🖌️' },
    { k: 'capital', l: 'Капітальний ремонт', e: '🔨' },
    { k: 'turnkey', l: 'Ремонт під ключ', e: '🔑' },
    { k: 'newbuild', l: 'Ремонт новобудови', e: '🏗️' },
    { k: 'partial', l: 'Частковий ремонт', e: '🧩' },
  ] },
  { key: 'room', title: 'Тип приміщення', sub: 'Де плануєте ремонт?', type: 'radio', options: [
    { k: 'flat', l: 'Квартира', e: '🏢' },
    { k: 'house', l: 'Будинок', e: '🏠' },
    { k: 'office', l: 'Офіс', e: '💼' },
    { k: 'shop', l: 'Магазин', e: '🛍️' },
    { k: 'commercial', l: 'Комерційне приміщення', e: '🏬' },
  ] },
  { key: 'area', title: 'Площа приміщення', sub: 'Пересуньте повзунок або введіть вручну', type: 'area' },
  { key: 'works', title: 'Що потрібно виконати?', sub: 'Можна обрати кілька пунктів', type: 'checks', options: [
    { k: 'demontazh', l: 'Демонтаж' }, { k: 'elektryka', l: 'Електрика' },
    { k: 'santehnika', l: 'Сантехніка' }, { k: 'shtukaturka', l: 'Штукатурка' },
    { k: 'shpaklivka', l: 'Шпаклівка' }, { k: 'farbuvannya', l: 'Фарбування' },
    { k: 'shpalery', l: 'Шпалери' }, { k: 'plytka', l: 'Плитка' },
    { k: 'laminat', l: 'Ламінат' }, { k: 'stelya', l: 'Натяжна стеля' },
    { k: 'gipsokarton', l: 'Гіпсокартон' }, { k: 'dveri', l: 'Двері' },
    { k: 'prybyrannya', l: 'Прибирання' }, { k: 'smittya', l: 'Вивіз сміття' },
  ] },
  { key: 'materials', title: 'Матеріали', sub: 'Хто забезпечує матеріали?', type: 'radio', options: [
    { k: 'workonly', l: 'Тільки робота', e: '🧑‍🔧' },
    { k: 'mymaterials', l: 'Робота + мої матеріали', e: '📦' },
    { k: 'purchase', l: 'Робота + закупівля матеріалів', e: '🛒' },
  ] },
  { key: 'urgency', title: 'Коли хочете почати?', type: 'radio', options: [
    { k: 'urgent', l: 'Терміново', e: '⚡' },
    { k: 'week', l: 'Протягом тижня', e: '📅' },
    { k: 'month', l: 'Протягом місяця', e: '🗓️' },
    { k: 'justchecking', l: 'Поки дізнаюсь вартість', e: '👀' },
  ] },
  { key: 'address', title: 'Адреса об’єкта', type: 'radio', options: [
    { k: 'smila', l: 'Сміла', e: '📍' },
    { k: 'cherkasy', l: 'Черкаська область', e: '🗺️' },
    { k: 'other', l: 'Інше', e: '🌐' },
  ] },
];

const REPAIR_LABEL: Record<string, string> = {
  cosmetic: 'Косметичний ремонт', capital: 'Капітальний ремонт', turnkey: 'Ремонт під ключ',
  newbuild: 'Ремонт новобудови', partial: 'Частковий ремонт',
};

const money = (n: number) => Math.round(n).toLocaleString('uk-UA').replace(/,/g, ' ');

function track(event: string, params: Record<string, unknown> = {}) {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void; dataLayer?: unknown[] };
  try { w.gtag?.('event', event, params); } catch {}
  try { w.dataLayer?.push({ event, ...params }); } catch {}
}

function formatUAPhone(v: string) {
  let d = (v || '').replace(/\D/g, '');
  if (d.startsWith('380')) d = d.slice(3);
  else if (d.startsWith('0')) d = d.slice(1);
  d = d.slice(0, 9);
  if (!d.length) return '';
  let out = '+380';
  if (d.length > 0) out += ' ' + d.slice(0, 2);
  if (d.length > 2) out += ' ' + d.slice(2, 5);
  if (d.length > 5) out += ' ' + d.slice(5, 7);
  if (d.length > 7) out += ' ' + d.slice(7, 9);
  return out;
}
function validPhone(v: string) {
  let d = (v || '').replace(/\D/g, '');
  if (d.startsWith('380')) d = d.slice(3); else if (d.startsWith('0')) d = d.slice(1);
  return d.length === 9;
}

type Answers = {
  repair?: string; room?: string; area?: number; works: string[];
  materials?: string; urgency?: string; address?: string;
};

export default function Calculator() {
  const [phase, setPhase] = useState<'quiz' | 'calc' | 'result' | 'thanks'>('quiz');
  const [idx, setIdx] = useState(0);
  const [a, setA] = useState<Answers>({ works: [], area: CONFIG.area.def });
  const [calcStep, setCalcStep] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', tg: '', hp: '' });
  const [err, setErr] = useState(false);
  const [sending, setSending] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);

  // Фокус на заголовок при зміні кроку/фази (крім найпершого показу)
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; return; }
    headingRef.current?.focus({ preventScroll: true });
  }, [idx, phase]);

  const total = STEPS.length;
  const step = STEPS[idx];

  function goNext() {
    if (idx < total - 1) setIdx(idx + 1);
    else startCalc();
  }
  function goBack() { if (idx > 0) setIdx(idx - 1); }

  function pickRadio(key: string, val: string) {
    setA((p) => ({ ...p, [key]: val }));
    setTimeout(() => { if (idx < total - 1) setIdx(idx + 1); else startCalc(); }, 180);
  }
  function toggleWork(k: string) {
    setA((p) => {
      const w = p.works.includes(k) ? p.works.filter((x) => x !== k) : [...p.works, k];
      return { ...p, works: w };
    });
  }

  function startCalc() {
    setPhase('calc'); setCalcStep(0);
    const d = CONFIG.calcDelayMs;
    setTimeout(() => setCalcStep(1), d * 0.2);
    setTimeout(() => setCalcStep(2), d * 0.5);
    setTimeout(() => setCalcStep(3), d * 0.8);
    setTimeout(() => { setPhase('result'); track('calculator_result_view'); }, d);
    track('calculator_calc_done');
  }

  function compute() {
    const c = CONFIG;
    const area = a.area || c.area.def;
    const base = c.basePrice[a.repair || 'cosmetic'] ?? c.basePrice.cosmetic;
    const room = c.roomCoef[a.room || 'flat'] ?? 1;
    const urg = c.urgencyCoef[a.urgency || 'month'] ?? 1;
    let wmult = 1;
    a.works.forEach((k) => (wmult += c.worksInc[k] || 0));
    const works = area * base * room * urg * wmult;
    const materials = works * (c.materialsFactor[a.materials || 'workonly'] ?? 0);
    let totalCost = works + materials;
    totalCost = Math.max(c.minOrder, Math.min(c.maxOrder, totalCost));
    return { area, works, materials, total: totalCost, low: totalCost * (1 - c.rangeDown), high: totalCost * (1 + c.rangeUp) };
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    if (form.hp.trim()) { track('calculator_lead_spam'); setPhase('thanks'); return; } // honeypot
    if (form.name.trim().length < 2 || !validPhone(form.phone)) { setErr(true); return; }
    setSending(true);
    const r = compute();
    const payload = {
      name: form.name.trim(), phone: form.phone.trim(), telegram: form.tg.trim(),
      repair: REPAIR_LABEL[a.repair || ''] || a.repair, room: a.room, area: r.area, works: a.works,
      materials: a.materials, urgency: a.urgency, address: a.address,
      total: Math.round(r.total), low: Math.round(r.low), high: Math.round(r.high),
      page: typeof location !== 'undefined' ? location.href : '', ts: new Date().toISOString(),
    };
    try { await sendLead(payload); } catch (err2) { console.warn('lead send failed', err2); }
    track('calculator_lead', { value: payload.total, currency: 'UAH' });
    setSending(false); setPhase('thanks');
  }

  async function sendLead(p: Record<string, unknown>) {
    const { botToken, chatId } = CONFIG.telegram;
    if (botToken && chatId) {
      const text =
        `🆕 Заявка з калькулятора smilarda.org.ua\n\n👤 ${p.name}\n📞 ${p.phone}` +
        (p.telegram ? `\n✈️ ${p.telegram}` : '') +
        `\n\n🔧 ${p.repair}\n📐 ${p.area} м²\n💰 Орієнтовно: ${money(p.total as number)} грн` +
        `\n📊 Діапазон: ${money(p.low as number)}–${money(p.high as number)} грн\n📍 ${p.address || '—'} · ${p.urgency || '—'}`;
      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    } else {
      console.info('LEAD (демо, впишіть CONFIG.telegram у Calculator.tsx):', p);
    }
  }

  /* ─────────── Рендер ─────────── */
  if (phase === 'thanks') {
    return (
      <div className="calc-wrap">
        <div className="calc-card calc-thanks">
          <div className="ic">✅</div>
          <h2 tabIndex={-1} ref={headingRef}>Дякуємо!</h2>
          <p>Ми вже отримали вашу заявку. Наш спеціаліст зв’яжеться з вами протягом <b>15–30 хвилин</b> і надішле детальний кошторис.</p>
          <div className="call">Питання? Телефонуйте: <a href={`tel:${CONFIG.company.phoneHref}`}>{CONFIG.company.phoneDisplay}</a></div>
        </div>
      </div>
    );
  }

  if (phase === 'calc') {
    const steps = ['Аналізуємо вартість матеріалів…', 'Підбираємо вартість робіт…', 'Порівнюємо з поточними цінами…'];
    return (
      <div className="calc-wrap">
        <div className="calc-card calc-loading">
          <div className="calc-spinner" />
          <h2 tabIndex={-1} ref={headingRef} className="calc-q" style={{ textAlign: 'center' }}>Іде розрахунок…</h2>
          <div className="calc-steps">
            {steps.map((s, i) => (
              <div key={i} className={calcStep > i ? 'on' : ''}>
                <span className="tick">{calcStep > i ? '✓' : '⏳'}</span>{s}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const r = compute();
    return (
      <div className="calc-wrap">
        <div className="calc-card">
          <h2 tabIndex={-1} ref={headingRef} className="calc-q">Ваш попередній розрахунок</h2>
          <p className="calc-subq">{REPAIR_LABEL[a.repair || '']} · {r.area} м²</p>
          <div className="calc-est">
            <div className="line"><span>Площа</span><b>{r.area} м²</b></div>
            <div className="line"><span>Тип ремонту</span><b>{REPAIR_LABEL[a.repair || ''] || '—'}</b></div>
            <div className="line"><span>Вартість робіт</span><b>{money(r.works)} грн</b></div>
            <div className="line"><span>Матеріали</span><b>{r.materials > 0 ? money(r.materials) + ' грн' : '—'}</b></div>
            <div className="line tot"><span>Орієнтовно разом</span><b>{money(r.total)} грн</b></div>
          </div>
          <div className="calc-diap">Діапазон: <b>{money(r.low)}</b> – <b>{money(r.high)} грн</b></div>
          <div className="calc-note">Це орієнтовна вартість за середніми цінами Черкаської області. Остаточний кошторис — після безкоштовного виїзду майстра на об’єкт.</div>
          <div className="calc-editrow"><button type="button" onClick={() => { setPhase('quiz'); setIdx(total - 1); }}>← Змінити параметри</button></div>
        </div>

        <div className="calc-trust">
          {CONFIG.trust.map((x, i) => (<div className="t" key={i}><b>{x.n}</b><span>{x.t}</span></div>))}
        </div>

        <div className="calc-gate">
          <h3>Ваш детальний кошторис готовий 🎉</h3>
          <p className="lead">Щоб отримати повний розрахунок — залиште номер телефону:</p>
          <ul>
            <li><span className="c">✅</span> Детальний кошторис по роботах</li>
            <li><span className="c">✅</span> Список матеріалів</li>
            <li><span className="c">✅</span> Терміни виконання ремонту</li>
            <li><span className="c">✅</span> Безкоштовний виїзд майстра на замір</li>
          </ul>
          <form className={`calc-form${err ? ' showerr' : ''}`} onSubmit={submitLead} noValidate>
            <input className="calc-hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
              value={form.hp} onChange={(e) => setForm({ ...form, hp: e.target.value })} />
            <input type="text" placeholder="Ваше ім’я" autoComplete="name"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input type="tel" placeholder="Телефон, напр. 067 123 45 67" autoComplete="tel" inputMode="tel"
              value={form.phone} onChange={(e) => setForm({ ...form, phone: formatUAPhone(e.target.value) })} />
            <input type="text" placeholder="Telegram (необов’язково)"
              value={form.tg} onChange={(e) => setForm({ ...form, tg: e.target.value })} />
            <div className="calc-err">Будь ласка, вкажіть ім’я та коректний номер телефону.</div>
            <button type="submit" className="btn lg" disabled={sending}>{sending ? 'Надсилаємо…' : 'Отримати кошторис'}</button>
          </form>
          <div className="calc-privacy">Натискаючи кнопку, ви погоджуєтесь на обробку даних згідно з <a href="/polityka-konfidentsiynosti">Політикою конфіденційності</a>.</div>
        </div>
      </div>
    );
  }

  // phase === 'quiz'
  const pct = Math.round(((idx + 1) / total) * 100);
  const area = a.area || CONFIG.area.def;
  const fill = ((Math.max(CONFIG.area.min, Math.min(CONFIG.area.max, area)) - CONFIG.area.min) / (CONFIG.area.max - CONFIG.area.min)) * 100;

  return (
    <div className="calc-wrap">
      <div className="calc-progress">
        <div className="prow"><span>Крок <b>{idx + 1}</b> із {total}</span><span>{pct}%</span></div>
        <div className="calc-bar"><span style={{ width: pct + '%' }} /></div>
      </div>

      <div className="calc-card" key={idx}>
        <h2 tabIndex={-1} ref={headingRef} className="calc-q">{step.title}</h2>
        {step.sub && <p className="calc-subq">{step.sub}</p>}

        {step.type === 'radio' && (
          <div className="calc-opts" role="radiogroup" aria-label={step.title}>
            {step.options!.map((o) => (
              <label className="calc-opt" key={o.k}>
                <input type="radio" name={`q_${step.key}`} value={o.k}
                  checked={(a as Record<string, unknown>)[step.key] === o.k}
                  onChange={() => pickRadio(step.key, o.k)} />
                {o.e && <span className="em">{o.e}</span>}<span className="dot" /><span>{o.l}</span>
              </label>
            ))}
          </div>
        )}

        {step.type === 'checks' && (
          <div className="calc-checks">
            {step.options!.map((o) => (
              <label className="calc-chk" key={o.k}>
                <input type="checkbox" value={o.k} checked={a.works.includes(o.k)} onChange={() => toggleWork(o.k)} />
                <span className="box" /><span>{o.l}</span>
              </label>
            ))}
          </div>
        )}

        {step.type === 'area' && (
          <div className="calc-area">
            <div className="val">{area} <small>м²</small></div>
            <input className="calc-range" type="range" min={CONFIG.area.min} max={CONFIG.area.max} value={Math.max(CONFIG.area.min, Math.min(CONFIG.area.max, area))}
              aria-label="Площа, м²"
              style={{ background: `linear-gradient(90deg, var(--accent) ${fill}%, var(--soft2) ${fill}%)` }}
              onChange={(e) => setA({ ...a, area: +e.target.value })} />
            <div className="calc-scale"><span>{CONFIG.area.min} м²</span><span>{CONFIG.area.max} м²</span></div>
            <div className="calc-manual">
              <label htmlFor="calcAreaInput">або введіть точну площу</label>
              <input id="calcAreaInput" type="number" min={1} max={2000} value={area}
                onChange={(e) => setA({ ...a, area: Math.max(1, Math.min(2000, +e.target.value || CONFIG.area.def)) })} /> <small style={{ color: 'var(--muted)' }}>м²</small>
            </div>
          </div>
        )}

        <div className="calc-nav">
          {idx > 0 && <button type="button" className="btn ghost" onClick={goBack}>← Назад</button>}
          {(step.type === 'checks' || step.type === 'area') && <button type="button" className="btn" onClick={goNext}>Далі →</button>}
        </div>
        {step.type === 'radio' && <div className="calc-hint">Оберіть варіант — і ми перейдемо далі автоматично</div>}
      </div>
    </div>
  );
}
