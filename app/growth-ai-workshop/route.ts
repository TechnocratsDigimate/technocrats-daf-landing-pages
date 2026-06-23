export async function GET() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Growth Operator Workshop — Gautam Punj</title>
<meta name="description" content="Learn to build real AI marketing systems with Claude. Live workshop by Gautam Punj — India's AI-Augmented Growth Operator. Limited seats.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* ── TOKENS ── */
:root {
  --red:    #F02D2B;
  --ink:    #040E18;
  --white:  #F5F5F5;
  --cgrey:  #D9D9D9;
  --slate:  #6B7280;
  --card:   #ffffff;
  --red-dim: rgba(240,45,43,0.09);
  --ink-dim: rgba(4,14,24,0.06);
}

/* ── RESET ── */
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
img{max-width:100%;display:block}

body {
  background: var(--white);
  color: var(--ink);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ── TYPE ── */
.display {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.label-eyebrow {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--red);
}

/* ── LAYOUT ── */
.wrap { max-width: 960px; margin: 0 auto; padding: 0 20px; }
.wrap-sm { max-width: 680px; margin: 0 auto; padding: 0 20px; }

/* ── ANNOUNCEMENT BAR ── */
.announce-bar {
  background: var(--red);
  color: #fff;
  text-align: center;
  padding: 10px 20px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.03em;
}
.announce-bar span { opacity: 0.8; margin: 0 8px; }

/* ── NAV ── */
nav {
  background: var(--ink);
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.nav-cursor {
  width: 28px;
  height: 28px;
  background: var(--red);
  clip-path: polygon(0 0, 60% 40%, 30% 50%, 50% 100%, 35% 100%, 15% 55%, 0 65%);
  flex-shrink: 0;
}
.nav-brand {
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  line-height: 1.2;
}
.nav-brand small {
  display: block;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
  font-family: 'Inter', sans-serif;
}
.nav-cta {
  background: var(--red);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 9px 18px;
  border-radius: 6px;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: opacity 0.15s;
  white-space: nowrap;
}
.nav-cta:hover { opacity: 0.88; }

/* ── HERO ── */
.hero {
  background: var(--ink);
  padding: 72px 20px 64px;
  position: relative;
  overflow: hidden;
}
.hero-bg-circle {
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: var(--red);
  opacity: 0.05;
  top: -180px; right: -160px;
  pointer-events: none;
}
.hero-bg-circle2 {
  position: absolute;
  width: 260px; height: 260px;
  border-radius: 50%;
  border: 1px solid rgba(240,45,43,0.12);
  bottom: -80px; left: -80px;
  pointer-events: none;
}
.hero-inner {
  max-width: 760px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}
.hero-date-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(240,45,43,0.12);
  border: 1px solid rgba(240,45,43,0.25);
  border-radius: 100px;
  padding: 6px 16px;
  margin-bottom: 28px;
}
.hero-date-badge .dot {
  width: 7px; height: 7px;
  background: var(--red);
  border-radius: 50%;
  animation: pulse 1.8s ease-in-out infinite;
}
@keyframes pulse {
  0%,100%{opacity:1;transform:scale(1)}
  50%{opacity:0.4;transform:scale(0.7)}
}
.hero-date-badge span {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.04em;
}
.hero h1 {
  font-size: clamp(32px, 6vw, 58px);
  color: #fff;
  margin-bottom: 10px;
  max-width: 680px;
}
.hero h1 .red { color: var(--red); }
.hero-sub {
  font-size: clamp(15px, 2vw, 18px);
  color: rgba(255,255,255,0.5);
  max-width: 540px;
  margin-bottom: 36px;
  line-height: 1.55;
}
.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  margin-bottom: 40px;
}
.hero-stat .num {
  font-family: 'Syne', sans-serif;
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}
.hero-stat .num em { color: var(--red); font-style: normal; }
.hero-stat .desc {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  margin-top: 3px;
  letter-spacing: 0.02em;
}
.hero-cta-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.btn-primary {
  display: inline-block;
  background: var(--red);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 15px 32px;
  border-radius: 8px;
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: transform 0.15s, opacity 0.15s;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
}
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
.hero-trust-note {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  display: flex;
  align-items: center;
  gap: 6px;
}
.hero-trust-note::before {
  content: '🔒';
  font-size: 11px;
}

/* ── SOCIAL PROOF BAR ── */
.proof-bar {
  background: var(--red);
  padding: 16px 20px;
  overflow: hidden;
}
.proof-bar-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 32px;
}
.proof-item {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}
.proof-item::before { content: '✓'; font-weight: 800; }

/* ── SECTION BASE ── */
.sec { padding: 64px 0; }
.sec-dark { background: var(--ink); }
.sec-alt { background: #fff; }
.sec-divider { border-top: 1px solid var(--cgrey); }

.sec-header { margin-bottom: 40px; }
.sec-header h2 {
  font-size: clamp(24px, 4vw, 36px);
  color: var(--ink);
  margin-top: 8px;
}
.sec-header.light h2 { color: #fff; }
.sec-header.light .label-eyebrow { color: var(--red); }
.sec-header p {
  color: var(--slate);
  font-size: 15px;
  max-width: 520px;
  margin-top: 10px;
}
.sec-header.light p { color: rgba(255,255,255,0.45); }

/* ── PROBLEM ── */
.problem-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.problem-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: #fff;
  border: 1px solid var(--cgrey);
  border-radius: 10px;
  padding: 18px 20px;
}
.problem-icon {
  font-size: 20px;
  flex-shrink: 0;
  margin-top: 1px;
}
.problem-item h4 {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 3px;
}
.problem-item p {
  font-size: 13.5px;
  color: var(--slate);
}

/* ── WHAT YOU BUILD ── */
.builds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.build-card {
  background: var(--card);
  border: 1px solid var(--cgrey);
  border-radius: 12px;
  padding: 24px 22px;
  position: relative;
  overflow: hidden;
}
.build-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--red);
}
.build-num {
  font-family: 'Syne', sans-serif;
  font-size: 40px;
  font-weight: 800;
  color: var(--ink-dim);
  line-height: 1;
  margin-bottom: 12px;
}
.build-card h3 {
  font-family: 'Syne', sans-serif;
  font-size: 16px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}
.build-card p {
  font-size: 13.5px;
  color: var(--slate);
  margin-bottom: 14px;
}
.build-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.build-tag {
  font-size: 11px;
  font-weight: 600;
  background: var(--red-dim);
  color: var(--red);
  padding: 3px 9px;
  border-radius: 4px;
}

/* ── AGENDA ── */
.agenda {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid var(--cgrey);
  border-radius: 12px;
  overflow: hidden;
  background: var(--card);
}
.agenda-row {
  display: flex;
  align-items: flex-start;
  gap: 0;
  border-bottom: 1px solid var(--cgrey);
  transition: background 0.12s;
}
.agenda-row:last-child { border-bottom: none; }
.agenda-row:hover { background: #fafafa; }
.agenda-time {
  min-width: 90px;
  padding: 18px 16px;
  font-size: 12px;
  font-weight: 700;
  color: var(--red);
  border-right: 1px solid var(--cgrey);
  letter-spacing: 0.04em;
  display: flex;
  align-items: flex-start;
  padding-top: 20px;
}
.agenda-content {
  padding: 18px 20px;
  flex: 1;
}
.agenda-content h4 {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 4px;
}
.agenda-content p {
  font-size: 13px;
  color: var(--slate);
}
.live-badge {
  display: inline-block;
  background: var(--ink);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 6px;
}

/* ── INSTRUCTOR ── */
.instructor-card {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  background: var(--ink);
  border-radius: 16px;
  padding: 40px 36px;
}
@media(max-width:600px){
  .instructor-card { flex-direction: column; gap: 20px; padding: 28px 22px; }
}
.instructor-avatar {
  width: 100px; height: 100px;
  border-radius: 50%;
  background: rgba(240,45,43,0.15);
  border: 3px solid var(--red);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Syne', sans-serif;
  font-size: 32px;
  font-weight: 800;
  color: var(--red);
}
.instructor-body .name {
  font-family: 'Syne', sans-serif;
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 4px;
}
.instructor-body .title {
  font-size: 13px;
  color: var(--red);
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 14px;
}
.instructor-body p {
  font-size: 14px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 20px;
  line-height: 1.6;
}
.cred-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.cred-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: rgba(255,255,255,0.65);
}
.cred-item::before {
  content: '▸';
  color: var(--red);
  flex-shrink: 0;
  margin-top: 1px;
}

/* ── WHO IS THIS FOR ── */
.for-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
@media(max-width:560px){ .for-grid { grid-template-columns: 1fr; } }
.for-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--card);
  border: 1px solid var(--cgrey);
  border-radius: 10px;
  padding: 18px;
}
.for-card .icon { font-size: 22px; flex-shrink: 0; margin-top: 1px; }
.for-card h4 {
  font-family: 'Syne', sans-serif;
  font-size: 14px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 3px;
}
.for-card p { font-size: 13px; color: var(--slate); }
.not-for {
  margin-top: 20px;
  padding: 16px 20px;
  background: rgba(107,114,128,0.07);
  border-radius: 8px;
  border-left: 3px solid var(--cgrey);
}
.not-for p {
  font-size: 13px;
  color: var(--slate);
}
.not-for strong { color: var(--ink); }

/* ── OFFER BLOCK ── */
.offer-block {
  background: var(--ink);
  border-radius: 16px;
  padding: 48px 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.offer-block::before {
  content: '';
  position: absolute;
  width: 400px; height: 400px;
  border-radius: 50%;
  background: var(--red);
  opacity: 0.05;
  top: -150px; right: -100px;
}
.offer-block .price-row {
  margin: 20px 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.offer-block .old-price {
  font-size: 18px;
  color: rgba(255,255,255,0.3);
  text-decoration: line-through;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
}
.offer-block .new-price {
  font-family: 'Syne', sans-serif;
  font-size: 52px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}
.offer-block .new-price sup {
  font-size: 22px;
  vertical-align: super;
  color: var(--red);
}
.offer-block .price-note {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 28px;
}
.offer-includes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
  max-width: 420px;
  margin: 0 auto 32px;
}
.offer-include-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: rgba(255,255,255,0.7);
}
.offer-include-item .check {
  width: 20px; height: 20px;
  background: var(--red);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #fff;
  flex-shrink: 0;
}
.seats-left {
  font-size: 12px;
  color: rgba(255,255,255,0.35);
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.seats-bar {
  width: 120px;
  height: 4px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
}
.seats-fill {
  height: 100%;
  width: 68%;
  background: var(--red);
  border-radius: 2px;
}

/* ── FORM ── */
.form-wrapper {
  background: var(--card);
  border: 1px solid var(--cgrey);
  border-radius: 16px;
  padding: 36px 32px;
  max-width: 480px;
  margin: 0 auto;
}
@media(max-width:520px){ .form-wrapper { padding: 24px 18px; } }
.form-wrapper h3 {
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 6px;
  text-align: center;
}
.form-wrapper .form-sub {
  font-size: 13px;
  color: var(--slate);
  text-align: center;
  margin-bottom: 24px;
}
.form-group {
  margin-bottom: 14px;
}
.form-group label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 6px;
  letter-spacing: 0.03em;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 13px 16px;
  border: 1.5px solid var(--cgrey);
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: var(--ink);
  background: var(--white);
  outline: none;
  transition: border-color 0.15s;
  appearance: none;
}
.form-group input:focus,
.form-group select:focus {
  border-color: var(--red);
}
.form-group input::placeholder { color: var(--cgrey); }
.form-submit {
  width: 100%;
  background: var(--red);
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  margin-top: 6px;
  transition: opacity 0.15s, transform 0.15s;
  letter-spacing: 0.03em;
}
.form-submit:hover { opacity: 0.9; transform: translateY(-1px); }
.form-disclaimer {
  font-size: 11px;
  color: var(--cgrey);
  text-align: center;
  margin-top: 12px;
  line-height: 1.5;
}
.form-success {
  display: none;
  text-align: center;
  padding: 30px 0;
}
.form-success .big { font-size: 40px; margin-bottom: 12px; }
.form-success h3 {
  font-family: 'Syne', sans-serif;
  font-size: 20px;
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 8px;
}
.form-success p { font-size: 14px; color: var(--slate); }

/* ── FAQ ── */
.faq-list { display: flex; flex-direction: column; gap: 0; }
.faq-item {
  border-bottom: 1px solid var(--cgrey);
  overflow: hidden;
}
.faq-item:first-child { border-top: 1px solid var(--cgrey); }
.faq-q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  cursor: pointer;
  gap: 16px;
}
.faq-q h4 {
  font-family: 'Syne', sans-serif;
  font-size: 15px;
  font-weight: 800;
  color: var(--ink);
}
.faq-arrow {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: var(--ink-dim);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
  transition: transform 0.2s, background 0.2s;
  color: var(--slate);
}
.faq-item.open .faq-arrow {
  transform: rotate(45deg);
  background: var(--red-dim);
  color: var(--red);
}
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.25s ease, padding 0.2s;
}
.faq-item.open .faq-a { max-height: 300px; padding-bottom: 18px; }
.faq-a p { font-size: 14px; color: var(--slate); }

/* ── FINAL CTA ── */
.final-cta {
  background: var(--red);
  padding: 64px 20px;
  text-align: center;
}
.final-cta h2 {
  font-size: clamp(26px, 5vw, 42px);
  color: #fff;
  margin-bottom: 12px;
}
.final-cta p {
  font-size: 15px;
  color: rgba(255,255,255,0.7);
  margin-bottom: 32px;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
}
.btn-white {
  display: inline-block;
  background: #fff;
  color: var(--red);
  font-size: 15px;
  font-weight: 700;
  padding: 15px 36px;
  border-radius: 8px;
  text-decoration: none;
  letter-spacing: 0.03em;
  transition: transform 0.15s, opacity 0.15s;
}
.btn-white:hover { transform: translateY(-1px); opacity: 0.94; }

/* ── FOOTER ── */
footer {
  background: var(--ink);
  padding: 32px 20px;
  text-align: center;
}
footer p {
  font-size: 12px;
  color: rgba(255,255,255,0.25);
}
footer strong { color: rgba(255,255,255,0.5); }
footer .footer-brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}
.footer-cursor {
  width: 18px; height: 18px;
  background: var(--red);
  clip-path: polygon(0 0, 60% 40%, 30% 50%, 50% 100%, 35% 100%, 15% 55%, 0 65%);
}

/* ── RESPONSIVE ── */
@media(max-width:640px){
  .hero { padding: 52px 20px 48px; }
  .hero-stats { gap: 16px 28px; }
  .offer-block { padding: 36px 22px; }
  .instructor-card { padding: 28px 20px; }
}

/* ── UTILITY ── */
.red-rule {
  width: 36px; height: 3px;
  background: var(--red);
  border-radius: 2px;
  margin: 10px 0 24px;
}
.center { text-align: center; }
.center .red-rule { margin: 10px auto 24px; }
</style>
</head>
<body>

<!-- ANNOUNCEMENT BAR -->
<div class="announce-bar">
  🔴 Live Workshop · Limited to 60 Seats <span>·</span> Early Bird Price Ends Soon
</div>

<!-- NAV -->
<nav>
  <div class="nav-logo">
    <div class="nav-cursor"></div>
    <div class="nav-brand">
      Gautam Punj
      <small>Technocrats Digimate</small>
    </div>
  </div>
  <a href="#register" class="nav-cta">Reserve Seat →</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg-circle"></div>
  <div class="hero-bg-circle2"></div>
  <div class="hero-inner">
    <div class="hero-date-badge">
      <div class="dot"></div>
      <span>Live Workshop · [DATE] · 10 AM – 1:30 PM IST</span>
    </div>
    <h1 class="display">
      Stop Using Claude<br>as a Chatbot.<br>
      <span class="red">Build a System.</span>
    </h1>
    <p class="hero-sub">
      A 3.5-hour live workshop where you build a real AI marketing system using Claude — the same stack running 40-branch lead generation, ₹multi-crore ad campaigns, and real estate pipelines.
    </p>
    <div class="hero-stats">
      <div class="hero-stat">
        <div class="num">40<em>+</em></div>
        <div class="desc">Branches managed<br>with Claude systems</div>
      </div>
      <div class="hero-stat">
        <div class="num">₹<em>20Cr+</em></div>
        <div class="desc">Ad spend experience<br>across verticals</div>
      </div>
      <div class="hero-stat">
        <div class="num">3<em>.5h</em></div>
        <div class="desc">Live hands-on<br>workshop</div>
      </div>
    </div>
    <div class="hero-cta-row">
      <a href="#register" class="btn-primary">Reserve My Seat — ₹1,999</a>
      <div class="hero-trust-note">Secure payment · Instant WhatsApp confirmation</div>
    </div>
  </div>
</section>

<!-- SOCIAL PROOF BAR -->
<div class="proof-bar">
  <div class="proof-bar-inner">
    <div class="proof-item">All India Head of Digital Marketing, Canam Consultants</div>
    <div class="proof-item">Founder, Technocrats Digimate</div>
    <div class="proof-item">27-person marketing team led across 40 branches</div>
    <div class="proof-item">Live MCP + Claude Code deployments in production</div>
  </div>
</div>

<!-- PROBLEM -->
<section class="sec sec-alt sec-divider">
  <div class="wrap">
    <div class="sec-header">
      <div class="label-eyebrow">The Real Problem</div>
      <h2 class="display">You're using AI like it's 2023.</h2>
      <div class="red-rule"></div>
      <p>Most marketers are still copy-pasting from Claude, repeating the same prompts, and manually doing the work AI was supposed to replace. That's not AI adoption — that's expensive autocomplete.</p>
    </div>
    <div class="problem-list">
      <div class="problem-item">
        <div class="problem-icon">😩</div>
        <div>
          <h4>You prompt Claude 30 times a day and still do everything manually</h4>
          <p>Writing ad copy, reformatting reports, sending follow-ups — Claude gives you text, you still do all the actual work.</p>
        </div>
      </div>
      <div class="problem-item">
        <div class="problem-icon">💸</div>
        <div>
          <h4>Generic AI courses taught you prompting, not systems</h4>
          <p>You've watched 10 YouTube videos and done 2 courses. You know ChatGPT better than your client. But nothing is actually automated.</p>
        </div>
      </div>
      <div class="problem-item">
        <div class="problem-icon">📊</div>
        <div>
          <h4>You're opening 5 dashboards every morning instead of one</h4>
          <p>Meta Ads Manager. Google Analytics. WhatsApp. CRM. Each one manually. Meanwhile someone else's Claude pulls it all in 2 minutes.</p>
        </div>
      </div>
      <div class="problem-item">
        <div class="problem-icon">🔁</div>
        <div>
          <h4>Your leads are falling through the cracks between tools</h4>
          <p>Lead comes in → someone manually qualifies → someone manually follows up → half the pipeline is dead before anyone calls.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHAT YOU BUILD -->
<section class="sec">
  <div class="wrap">
    <div class="sec-header center">
      <div class="label-eyebrow">What You'll Build</div>
      <h2 class="display">Four live builds.<br>One working system.</h2>
      <div class="red-rule"></div>
      <p>This is not a slideshow workshop. You build alongside me, in real time. Your system is ready before the session ends.</p>
    </div>
    <div class="builds-grid">
      <div class="build-card">
        <div class="build-num">01</div>
        <h3>Your Claude Workspace</h3>
        <p>4-folder Pipeline Method setup. CLAUDE.md brand file for your vertical — real estate, study abroad, or agency. Claude stops being generic and starts working for your exact business.</p>
        <div class="build-tags">
          <span class="build-tag">CLAUDE.md</span>
          <span class="build-tag">Pipeline Method</span>
        </div>
      </div>
      <div class="build-card">
        <div class="build-num">02</div>
        <h3>Your First Custom Skill</h3>
        <p>Build a Skill file for your workflow — ad script writer, WhatsApp follow-up generator, or lead audit tool. Claude executes it on demand, every time, with zero prompt repetition.</p>
        <div class="build-tags">
          <span class="build-tag">Custom Skill</span>
          <span class="build-tag">Skill.md</span>
        </div>
      </div>
      <div class="build-card">
        <div class="build-num">03</div>
        <h3>Claude + Live Data</h3>
        <p>Connect Claude to your Meta Ads data via MCP. One morning prompt → campaign health report across all active ads. No dashboard. No manual pull. Done in under 2 minutes.</p>
        <div class="build-tags">
          <span class="build-tag">MCP</span>
          <span class="build-tag">Meta Ads</span>
          <span class="build-tag">Live Data</span>
        </div>
      </div>
      <div class="build-card">
        <div class="build-num">04</div>
        <h3>Your First AI Agent</h3>
        <p>Upload a raw leads CSV → Claude qualifies each lead → outputs WhatsApp follow-up messages per lead tier. This is the moment you stop using AI and start deploying it.</p>
        <div class="build-tags">
          <span class="build-tag">AI Agent</span>
          <span class="build-tag">Lead Qualification</span>
          <span class="build-tag">WhatsApp</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- AGENDA -->
<section class="sec sec-alt sec-divider">
  <div class="wrap-sm">
    <div class="sec-header center">
      <div class="label-eyebrow">Workshop Agenda</div>
      <h2 class="display">3.5 hours. Zero fluff.</h2>
      <div class="red-rule"></div>
    </div>
    <div class="agenda">
      <div class="agenda-row">
        <div class="agenda-time">00:00</div>
        <div class="agenda-content">
          <h4>Why Claude Is Different — And Why Now</h4>
          <p>The shift from prompting to delegating. What 70% automation actually means for your daily work. The 3 Claude products and which one you need first.</p>
        </div>
      </div>
      <div class="agenda-row">
        <div class="agenda-time">00:20</div>
        <div class="agenda-content">
          <h4>Build Your Claude Workspace</h4>
          <p>Pipeline Method setup. Writing your CLAUDE.md brand file live. Pick your vertical — real estate, study abroad, or agency.</p>
          <span class="live-badge">⚡ Live Build</span>
        </div>
      </div>
      <div class="agenda-row">
        <div class="agenda-time">00:50</div>
        <div class="agenda-content">
          <h4>Skills — Give Claude Intelligence for Your Niche</h4>
          <p>Build your first custom Skill file. See the difference between a Skill and a prompt. Real examples from study abroad and real estate campaigns.</p>
          <span class="live-badge">⚡ Live Build</span>
        </div>
      </div>
      <div class="agenda-row">
        <div class="agenda-time">01:30</div>
        <div class="agenda-content">
          <h4>MCP — Claude Talks to Your Tools</h4>
          <p>Connect Claude to live Meta Ads data. Build the morning report workflow. One question replaces 5 dashboards.</p>
          <span class="live-badge">⚡ Live Build</span>
        </div>
      </div>
      <div class="agenda-row">
        <div class="agenda-time">02:10</div>
        <div class="agenda-content">
          <h4>Your First AI Agent</h4>
          <p>CSV in → qualified leads + WhatsApp messages out. Build it live. This is the "I actually get it now" moment.</p>
          <span class="live-badge">⚡ Live Build</span>
        </div>
      </div>
      <div class="agenda-row">
        <div class="agenda-time">02:55</div>
        <div class="agenda-content">
          <h4>Q&A + What's Next</h4>
          <p>Open floor. Your questions answered by someone who's running these systems in production — not teaching from slides.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- INSTRUCTOR -->
<section class="sec sec-dark">
  <div class="wrap">
    <div class="instructor-card">
      <div class="instructor-avatar">GP</div>
      <div class="instructor-body">
        <div class="name">Gautam Punj</div>
        <div class="title">AI-Augmented Growth Operator · @sunnypunj / @gautampunj</div>
        <p>I don't teach AI from a slide deck. I build and run these systems every day — for a 40-branch international education firm, for real estate clients, and for my own agency. Everything in this workshop is live in production right now.</p>
        <div class="cred-list">
          <div class="cred-item">All India Head of Digital Marketing, Canam Consultants — 27-person team, 40 branches</div>
          <div class="cred-item">Founder, Technocrats Digimate — performance marketing agency, real estate & study abroad verticals</div>
          <div class="cred-item">₹20Cr+ in Meta Ads managed across clients and verticals</div>
          <div class="cred-item">Live Claude systems: multi-agent pipelines, MCP integrations, WhatsApp automation at scale</div>
          <div class="cred-item">Built Claude Code + Shopify multi-agent system for US e-commerce validation (Thalvify)</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- WHO IS THIS FOR -->
<section class="sec">
  <div class="wrap">
    <div class="sec-header">
      <div class="label-eyebrow">Is This For You?</div>
      <h2 class="display">Yes — if you're one of these.</h2>
      <div class="red-rule"></div>
    </div>
    <div class="for-grid">
      <div class="for-card">
        <div class="icon">🏗️</div>
        <div>
          <h4>Agency Owner / Freelancer</h4>
          <p>Running 5–15 clients. Drowning in execution. Want to use AI to 3× output without hiring.</p>
        </div>
      </div>
      <div class="for-card">
        <div class="icon">📣</div>
        <div>
          <h4>Marketing Manager / Head</h4>
          <p>In-house at a brand or edu firm. Responsible for leads, ads, content. Want to stop doing everything manually.</p>
        </div>
      </div>
      <div class="for-card">
        <div class="icon">🏘️</div>
        <div>
          <h4>Real Estate Marketer</h4>
          <p>Running Meta Ads for property. Leads are expensive. Want AI to qualify and follow up before your competition does.</p>
        </div>
      </div>
      <div class="for-card">
        <div class="icon">🎓</div>
        <div>
          <h4>Digital Marketing Professional</h4>
          <p>2–5 years in. Sees AI changing everything. Wants to be the person who builds systems, not the one replaced by them.</p>
        </div>
      </div>
    </div>
    <div class="not-for">
      <p><strong>Not for you if:</strong> You've never run a Meta Ads campaign, have zero marketing experience, or are looking for a basic "what is ChatGPT" intro. This assumes you already work in digital marketing.</p>
    </div>
  </div>
</section>

<!-- REGISTER / OFFER -->
<section class="sec sec-dark" id="register">
  <div class="wrap">
    <div class="sec-header center light">
      <div class="label-eyebrow">Reserve Your Seat</div>
      <h2 class="display">Secure your spot now.</h2>
      <div class="red-rule" style="margin:10px auto 0;"></div>
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: start; margin-top: 36px;">

      <!-- Left: Offer details -->
      <div class="offer-block" style="text-align:left;">
        <div class="label-eyebrow" style="margin-bottom: 10px;">What's Included</div>
        <div class="offer-includes">
          <div class="offer-include-item"><div class="check">✓</div>3.5-hour live Zoom workshop with Gautam Punj</div>
          <div class="offer-include-item"><div class="check">✓</div>All 4 live builds — files yours to keep</div>
          <div class="offer-include-item"><div class="check">✓</div>Workshop recording (48-hour access)</div>
          <div class="offer-include-item"><div class="check">✓</div>CLAUDE.md starter template for your vertical</div>
          <div class="offer-include-item"><div class="check">✓</div>Custom Skill file template (ad script / lead qualify)</div>
          <div class="offer-include-item"><div class="check">✓</div>WhatsApp group access (30 days)</div>
          <div class="offer-include-item"><div class="check">✓</div>Early bird access to Cohort Batch 01</div>
        </div>
        <div class="price-row" style="justify-content:flex-start;">
          <div class="old-price">₹3,999</div>
          <div class="new-price"><sup>₹</sup>1,999</div>
        </div>
        <div class="price-note" style="color: rgba(255,255,255,0.35); font-size: 13px;">Early bird pricing · Ends when seats fill</div>
        <div class="seats-left">
          <div class="seats-bar"><div class="seats-fill"></div></div>
          <span>41 of 60 seats reserved</span>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="form-wrapper" id="reg-form-wrap">
        <h3>Claim Your Seat</h3>
        <p class="form-sub">You'll get WhatsApp confirmation within 5 minutes.</p>

        <div id="regForm">
          <div class="form-group">
            <label>Full Name *</label>
            <input type="text" id="fname" placeholder="Your name" required>
          </div>
          <div class="form-group">
            <label>WhatsApp Number *</label>
            <input type="tel" id="fphone" placeholder="+91 98765 43210" required>
          </div>
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="femail" placeholder="you@example.com" required>
          </div>
          <div class="form-group">
            <label>Your Current Role *</label>
            <select id="frole">
              <option value="" disabled selected>Select your role</option>
              <option>Agency Owner / Freelancer</option>
              <option>Marketing Manager / Head</option>
              <option>Digital Marketing Executive</option>
              <option>Real Estate Marketer</option>
              <option>Business Owner</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label>Industry / Vertical *</label>
            <select id="findustry">
              <option value="" disabled selected>Select your vertical</option>
              <option>Real Estate</option>
              <option>Study Abroad / Education</option>
              <option>Agency (Multiple Clients)</option>
              <option>Healthcare / Clinic</option>
              <option>E-commerce</option>
              <option>Other</option>
            </select>
          </div>
          <button type="button" class="form-submit" onclick="submitForm()">
            Pay ₹1,999 & Reserve Seat →
          </button>
          <p class="form-disclaimer">🔒 Secure payment via Razorpay · You'll be redirected to complete payment</p>
        </div>

        <div class="form-success" id="formSuccess">
          <div class="big">🎉</div>
          <h3>You're In!</h3>
          <p>Check WhatsApp in the next 5 minutes for your confirmation and pre-workshop prep guide.</p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- FAQ -->
<section class="sec sec-alt sec-divider">
  <div class="wrap-sm">
    <div class="sec-header center">
      <div class="label-eyebrow">FAQ</div>
      <h2 class="display">Quick answers.</h2>
      <div class="red-rule"></div>
    </div>
    <div class="faq-list">
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          <h4>Do I need to know coding to attend?</h4>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a"><p>Zero coding required. Everything is built using Claude's interface, Claude Cowork, and Skill files — no terminal, no Python, no developer background needed. If you can use Google Docs, you can do this.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          <h4>Which Claude plan do I need?</h4>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a"><p>Claude Pro ($20/month) is enough for the workshop. You can start a free trial right before the session. We'll use Claude Chat and Claude Cowork primarily. Claude Code is demonstrated but not required on Day 1.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          <h4>Is the workshop recorded?</h4>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a"><p>Yes. You get 48-hour replay access after the live session. However, the real value is in building alongside the group — the live energy, Q&A, and troubleshooting in real time is what makes the system actually land.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          <h4>What verticals is this designed for?</h4>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a"><p>The core systems work for any marketing vertical. During the workshop, you'll choose your vertical — real estate, study abroad, or agency — and all builds will be customised to your context. Nothing is generic.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          <h4>What's the difference between this and a YouTube tutorial?</h4>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a"><p>YouTube gives you steps. This gives you a working system personalised to your business, live feedback when something doesn't work for your use case, and 30 days of WhatsApp access to implement after. You also get files you can use on Monday morning.</p></div>
      </div>
      <div class="faq-item">
        <div class="faq-q" onclick="toggleFaq(this)">
          <h4>What happens after the workshop?</h4>
          <div class="faq-arrow">+</div>
        </div>
        <div class="faq-a"><p>You'll get early bird access to the AI Growth Operator 4-Week Cohort — where you build the full system: ad creative pipeline, WhatsApp automation, reporting dashboard, and lead scoring. Workshop attendees get a ₹5,000 discount on cohort registration.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="final-cta">
  <div class="wrap">
    <h2 class="display">19 seats left.<br>Don't think too long.</h2>
    <p>Every day you wait, you're spending 3 more hours doing what Claude should be doing for you.</p>
    <a href="#register" class="btn-white">Reserve My Seat — ₹1,999</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-brand">
    <div class="footer-cursor"></div>
    <strong style="color: rgba(255,255,255,0.6); font-family: 'Syne', sans-serif; font-size: 13px;">Technocrats Digimate</strong>
  </div>
  <p>Digital-first growth systems. Always one step ahead.</p>
  <p style="margin-top: 6px;">© 2026 Technocrats Digimate Pvt. Ltd. · All rights reserved</p>
</footer>

<script>
// ── RESPONSIVE REGISTER SECTION ──
(function(){
  const grid = document.querySelector('#register .wrap > div[style*="grid"]');
  if(window.innerWidth < 720 && grid){
    grid.style.gridTemplateColumns = '1fr';
  }
  window.addEventListener('resize', function(){
    if(grid) grid.style.gridTemplateColumns = window.innerWidth < 720 ? '1fr' : '1fr 1fr';
  });
})();

// ── FAQ TOGGLE ──
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── FORM SUBMIT ──
function submitForm() {
  const name     = document.getElementById('fname').value.trim();
  const phone    = document.getElementById('fphone').value.trim();
  const email    = document.getElementById('femail').value.trim();
  const role     = document.getElementById('frole').value;
  const industry = document.getElementById('findustry').value;

  if (!name || !phone || !email || !role || !industry) {
    alert('Please fill in all fields before proceeding.');
    return;
  }
  // In production: replace with Razorpay integration or redirect
  // window.location.href = 'https://rzp.io/l/your-payment-link';
  document.getElementById('regForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.build-card, .problem-item, .for-card, .agenda-row').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
</script>
</body>
</html>
`;
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}
