// ── TELEGRAM INIT ──
const tg = window.Telegram?.WebApp;

if (tg) {
  tg.ready();
  tg.expand();
  tg.setHeaderColor('#0a0a0f');
  tg.setBackgroundColor('#0a0a0f');
}

// ── CONFIG ──
const CHANNEL = '@ваш_канал'; // замени на свой канал

// ── SUBSCRIPTION ──
function openChannel() {
  const link = `https://t.me/${CHANNEL.replace('@', '')}`;
  if (tg) tg.openTelegramLink(link);
  else window.open(link, '_blank');
}

function checkSub() {
  if (tg) {
    tg.sendData(JSON.stringify({ action: 'check_sub' }));
  }
  showContent();
}

function showContent() {
  document.getElementById('gate').style.display = 'none';
  document.getElementById('content').classList.add('visible');
}

// Автопоказ если пришёл из бота
if (tg && tg.initData) {
  showContent();
} else if (!tg) {
  // Браузер — для разработки
  showContent();
}

// ── NAVIGATION ──
function showPanel(name) {
  document.getElementById('home').style.display = 'none';
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + name).classList.add('active');
  if (tg) tg.BackButton.show();
}

function goHome() {
  document.getElementById('home').style.display = 'block';
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  if (tg) tg.BackButton.hide();
}

if (tg) {
  tg.BackButton.onClick(() => goHome());
}

// ── FAQ ACCORDION ──
function toggleFaq(el) {
  el.classList.toggle('open');
}

// ── SUPPORT ──
function genTicket() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '#';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function sendSupport() {
  const text = document.getElementById('supportText').value.trim();
  if (!text) {
    showToast('✏️ Напиши сообщение!');
    return;
  }

  const ticketId = genTicket();
  document.getElementById('ticketId').textContent = ticketId;
  document.getElementById('ticketBadge').classList.add('visible');
  document.getElementById('supportText').value = '';

  if (tg) {
    tg.sendData(JSON.stringify({
      action: 'support',
      ticket: ticketId,
      message: text
    }));
  }

  showToast('✅ Обращение отправлено!');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
