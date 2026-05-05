/* ─── HAMBURGER ─── */
function toggleMenu() {
  document.getElementById('nav-links').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('nav-links').classList.remove('open');
}

/* ─── SCROLL REVEAL ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ─── STAGGER REVEAL ─── */
document.querySelectorAll('.projects-grid .project-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});

document.querySelectorAll('.skills-grid .skill-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.06) + 's';
});

/* ─── ACTIVE NAV LINK ─── */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) {
      current = s.getAttribute('id');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
  });
});

/* ─── DOWNLOAD CV (PDF) ─── */
function downloadCV(e) {
  e.preventDefault();

  const link = document.createElement("a");
  link.href = "./cv/Adham-Hossam-CV.pdf"; // تأكد إن الملف موجود هنا
  link.download = "Adham-Hossam-CV.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/* ─── CONTACT FORM ─── */
function submitForm() {
  const fname = document.getElementById('fname').value.trim();
  const lname = document.getElementById('lname').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');

  if (!fname || !email || !message) {
    status.style.color = '#f87171';
    status.textContent = '⚠ Please fill required fields.';
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.style.color = '#f87171';
    status.textContent = '⚠ Invalid email address.';
    return;
  }

  // Open email client
  const subject = document.getElementById('subject').value || 'Portfolio Contact';
  const body = `Hi Adham,\n\n${message}\n\nBest,\n${fname} ${lname}`;

  window.location.href = `mailto:adhamhossam112233@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  status.style.color = 'var(--purple-light)';
  status.textContent = '✓ Opening your email client...';

  // Reset after 3 seconds
  setTimeout(() => {
    document.getElementById('fname').value = '';
    document.getElementById('lname').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    document.getElementById('subject').value = '';
    status.textContent = '';
  }, 3000);
}