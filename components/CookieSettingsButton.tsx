'use client';

export default function CookieSettingsButton() {
  function reopen() {
    try { localStorage.removeItem('smilarda_cookie_consent'); } catch {}
    window.dispatchEvent(new Event('open-cookie-settings'));
  }
  return (
    <button type="button" className="btn ghost" onClick={reopen}>Змінити налаштування cookie</button>
  );
}
