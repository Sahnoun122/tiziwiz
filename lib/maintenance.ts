// Maintenance mode: while `true`, every page request is answered by the
// maintenance page below instead of the site. Set to `false` to restore the
// site — no other file needs to change.
export const MAINTENANCE_MODE = true

// Hint for browsers and crawlers on when to retry (seconds).
const RETRY_AFTER_SECONDS = 3600

// Neutral favicon so the tab doesn't show the brand logo during maintenance.
const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0f172a"/><circle cx="16" cy="16" r="5" fill="none" stroke="#f59e0b" stroke-width="2.5"/><path d="M16 6v3M16 23v3M6 16h3M23 16h3M8.9 8.9l2.1 2.1M21 21l2.1 2.1M8.9 23.1l2.1-2.1M21 11l2.1-2.1" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  )

const MAINTENANCE_HTML = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Site en maintenance</title>
<link rel="icon" href="${FAVICON}">
<style>
  :root {
    --bg: #f8fafc;
    --bg-accent: #eef2f7;
    --card: #ffffff;
    --text: #0f172a;
    --muted: #475569;
    --subtle: #94a3b8;
    --border: #e2e8f0;
    --accent: #d97706;
    --accent-soft: #fef3c7;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: #0b1120;
      --bg-accent: #111a2e;
      --card: #111827;
      --text: #f1f5f9;
      --muted: #cbd5e1;
      --subtle: #64748b;
      --border: #1f2937;
      --accent: #f59e0b;
      --accent-soft: rgba(245, 158, 11, 0.12);
    }
  }
  * { box-sizing: border-box; }
  html, body { height: 100%; }
  body {
    margin: 0;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px 20px;
    background:
      radial-gradient(1200px 600px at 50% -10%, var(--bg-accent), transparent 70%),
      var(--bg);
    color: var(--text);
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6;
  }
  main {
    width: 100%;
    max-width: 560px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 48px 40px 40px;
    text-align: center;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 40px rgba(15, 23, 42, 0.06);
  }
  .icon {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 18px;
    background: var(--accent-soft);
    color: var(--accent);
    display: grid;
    place-items: center;
  }
  .icon svg { width: 36px; height: 36px; animation: spin 8s linear infinite; }
  .status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 12px;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 1.8s ease-in-out infinite;
  }
  h1 {
    margin: 0 0 14px;
    font-size: clamp(1.5rem, 4vw, 1.95rem);
    line-height: 1.25;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  p { margin: 0; color: var(--muted); font-size: 1rem; }
  p + p { margin-top: 10px; }
  .progress {
    position: relative;
    height: 4px;
    margin: 32px auto 0;
    max-width: 220px;
    border-radius: 999px;
    background: var(--border);
    overflow: hidden;
  }
  .progress::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 40%;
    border-radius: inherit;
    background: var(--accent);
    animation: slide 1.6s ease-in-out infinite;
  }
  .translations {
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    display: grid;
    gap: 14px;
  }
  .translations p { font-size: 0.9rem; color: var(--subtle); }
  .translations strong { color: var(--muted); font-weight: 600; }
  [dir="rtl"] { font-family: "Segoe UI", Tahoma, "Noto Sans Arabic", Arial, sans-serif; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
  @keyframes slide { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }
  @media (prefers-reduced-motion: reduce) {
    .icon svg, .dot, .progress::after { animation: none; }
  }
  @media (max-width: 480px) {
    main { padding: 36px 24px 28px; border-radius: 16px; }
  }
</style>
</head>
<body>
<main>
  <div class="icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  </div>

  <div class="status"><span class="dot" aria-hidden="true"></span>Maintenance en cours</div>

  <h1>Site en maintenance</h1>
  <p>Notre site fait actuellement l’objet d’une opération de maintenance planifiée afin d’améliorer la qualité et la performance de nos services.</p>
  <p>Nous serons de retour très prochainement. Merci de votre patience et de votre compréhension.</p>

  <div class="progress" role="presentation"></div>

  <div class="translations">
    <p lang="en"><strong>Under maintenance.</strong> Our website is currently undergoing scheduled maintenance. We will be back online shortly — thank you for your patience.</p>
    <p lang="ar" dir="rtl"><strong>الموقع قيد الصيانة.</strong> نقوم حاليًا بأعمال صيانة مبرمجة لتحسين خدماتنا. سنعود قريبًا، شكرًا على صبركم وتفهمكم.</p>
  </div>
</main>
</body>
</html>`

export function maintenanceResponse(): Response {
  // 503 + Retry-After tells search engines the outage is temporary, so the
  // site's existing rankings are kept.
  return new Response(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": String(RETRY_AFTER_SECONDS),
      "Cache-Control": "no-store",
    },
  })
}
