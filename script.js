// =================== MATRIX RAIN ===================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|!@#$%^&*()';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#22c55e';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

window.addEventListener('resize', () => {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
});

// =================== TYPING EFFECT ===================
const phrases = [
    'Cyber Security Specialist',
    'Ethical Hacker',
    'Penetration Tester',
    'Digital Forensics Expert',
    'Network Security Analyst',
    'Privacy Advocate'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typed-text');

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let timeout = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        timeout = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timeout = 500;
    }

    setTimeout(typeEffect, timeout);
}
typeEffect();

// =================== COUNTER ANIMATION ===================
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const increment = target / 60;
        let current = 0;

        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        }
        updateCounter();
    });
}

// =================== SCROLL REVEAL ===================
const revealElements = document.querySelectorAll('.reveal');

function handleReveal() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add('visible');
        }
    });
}

// =================== SKILL BAR ANIMATION ===================
function animateSkillBars() {
    const fills = document.querySelectorAll('.skill-fill');
    fills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            fill.style.width = fill.dataset.width + '%';
        }
    });
}

// =================== NAVBAR & SCROLL ===================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.borderBottomColor = 'rgba(34,197,94,0.15)';
    } else {
        navbar.style.borderBottomColor = 'rgba(34,197,94,0.08)';
    }

    // Active nav link
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (currentScroll >= top && currentScroll < bottom) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });

    handleReveal();
    animateSkillBars();
});

// Initial triggers
handleReveal();
animateCounters();

// =================== MOBILE MENU ===================
const mobileToggle = document.getElementById('mobile-toggle');
const mobileClose = document.getElementById('mobile-close');
const mobileMenu = document.getElementById('mobile-menu');

mobileToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// =================== SMOOTH SCROLL ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =================== CONTACT FORM ===================
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    showToast('Message sent successfully! // Pesan terkirim');
    this.reset();
});

// =================== TOAST NOTIFICATION ===================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = '> ' + message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// =================== KONAMI CODE EASTER EGG ===================
const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            showToast('ACCESS GRANTED // You found the Easter egg!');
            document.body.style.transition = 'filter 0.5s';
            document.body.style.filter = 'hue-rotate(120deg)';
            setTimeout(() => document.body.style.filter = '', 2000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// =================== CONSOLE EASTER EGG ===================
console.log('%c⚡ iam.bravo.id ⚡', 'color: #22c55e; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(34,197,94,0.5);');
console.log('%cIf you can read this, you might be the kind of person I want to work with.', 'color: #4ade80; font-size: 12px;');
console.log('%c// Drop me a message → contact section', 'color: #666; font-size: 11px; font-style: italic;');
