
const loadingScreen = document.getElementById('loadingScreen');
const loadingBar = document.getElementById('loadingBar');
const loadingPercent = document.getElementById('loadingPercent');
const rows = [...document.querySelectorAll('.loading-row')];

let progress = 0;
const timer = setInterval(() => {
  progress += Math.floor(Math.random() * 8) + 4;
  if (progress > 100) progress = 100;

  loadingBar.style.width = progress + '%';
  loadingPercent.textContent = progress + ' %';

  const step = progress < 25 ? 0 : progress < 50 ? 1 : progress < 78 ? 2 : 3;
  rows.forEach((row, index) => {
    row.classList.toggle('active', index === step);
    const status = row.querySelector('b');
    if (index < step) status.textContent = 'OK';
    else if (index === step) status.textContent = progress + ' %';
    else status.textContent = '—';
  });

  if (progress >= 100) {
    clearInterval(timer);
    rows.forEach(row => row.querySelector('b').textContent = 'OK');
    if (navigator.vibrate) navigator.vibrate([80, 40, 120]);
    setTimeout(() => loadingScreen.classList.add('done'), 550);
  }
}, 150);

const targetDate = new Date('2026-11-21T14:00:00+01:00').getTime();
function updateCountdown() {
  const diff = Math.max(0, targetDate - Date.now());
  const totalDays = Math.ceil(diff / 86400000);
  document.getElementById('daysLeft').textContent = 'J-' + totalDays;
  document.getElementById('days').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
  document.getElementById('hours').textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
  document.getElementById('minutes').textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  document.getElementById('seconds').textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const eventPass = document.getElementById('eventPass');
eventPass.addEventListener('click', () => {
  eventPass.classList.toggle('flipped');
  if (navigator.vibrate) navigator.vibrate(35);
});

const iosNotification = document.getElementById('iosNotification');
iosNotification.addEventListener('click', () => {
  iosNotification.classList.toggle('expanded');
  if (navigator.vibrate) navigator.vibrate([55, 35, 90]);
});

function updatePhoneTime() {
  const value = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  document.getElementById('statusTime').textContent = value;
  document.getElementById('iphoneClock').textContent = value;
}
updatePhoneTime();
setInterval(updatePhoneTime, 30000);

document.querySelectorAll('.bottom-nav button').forEach(button => {
  button.addEventListener('click', () => {
    const target = document.getElementById(button.dataset.target);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const sections = ['pass', 'emplacement', 'piste', 'programme', 'message']
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.bottom-nav button').forEach(button => {
        button.classList.toggle('active', button.dataset.target === entry.target.id);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => navObserver.observe(section));


// Premium gift reveal
const giftButton = document.getElementById('giftButton');
const posterModal = document.getElementById('posterModal');
const posterClose = document.getElementById('posterClose');

function openPoster() {
  posterModal?.classList.add('open');
  posterModal?.setAttribute('aria-hidden', 'false');
  document.body.classList.add('poster-open');
  if (navigator.vibrate) navigator.vibrate([45, 30, 85]);
}

function closePoster() {
  posterModal?.classList.remove('open');
  posterModal?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('poster-open');
  if (navigator.vibrate) navigator.vibrate(30);
}

giftButton?.addEventListener('click', openPoster);
posterClose?.addEventListener('click', closePoster);

// Clicking either the poster itself or the dark background returns to the site.
posterModal?.addEventListener('click', (event) => {
  if (event.target === posterModal || event.target.closest('.poster-modal-inner img')) {
    closePoster();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && posterModal?.classList.contains('open')) {
    closePoster();
  }
});
