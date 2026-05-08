// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const htmlElement = document.documentElement;

// Check for saved user preference, if any, on load of the website
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    htmlElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
}

themeToggle.addEventListener('click', () => {
    let theme = htmlElement.getAttribute('data-theme');
    if (theme === 'dark') {
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
});

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth reveal animation for elements on scroll is handled by revealObserver below
// Language Toggle Logic
const translations = {
    en: {
        nav_about: "About",
        nav_gallery: "Design",
        nav_contact: "Contact",
        hero_subtitle: "Exploring the boundaries of minimal and modern expression.",
        hero_btn: "View Work",
        gallery_title: "Selected Works",
        art_1_title: "Talisca - POTM Concept",
        art_1_desc: "A Fenerbahçe-themed 'Player of the Month' (POTM) concept design created using Canva, featuring typography and layered visual editing.",
        art_2_title: "Alperen Şengün: The Wizard",
        art_2_desc: "A digital sports poster created for NBA star Alperen Şengün, highlighting a dynamic color palette and modern fonts.",
        art_3_title: "Match Day Visual (3-1)",
        art_3_desc: "A digital score infographic created for the Fenerbahçe - Barcelona match, supported by corporate logos and a clear visual hierarchy.",
        art_4_title: "Event Poster Design",
        art_4_desc: "A hierarchy and information-focused 'The Voice of Football' conference poster designed for a Üsküdar University event.",
        art_5_title: "Champions League Matchday",
        art_5_desc: "A dynamic 'Matchday' design created for social media engagement, featuring visuals of Asensio and Pedri.",
        about_title: "About Me",
        about_text: "I am Muhammet Mert Aslan.<br>I am 20 years old and a New Media student at Üsküdar University. With my interest in the design world, I focus on developing creative solutions using digital media tools. I continue to improve myself in this field by blending my academic education with practical design projects.",
        contact_title: "Get In Touch",
        contact_text: "Interested in collaboration or learning more about my lecture?",
        contact_btn: "Contact Me",
        footer_text: "&copy; 2026 Muhammet Mert Aslan. All Rights Reserved."
    },
    tr: {
        nav_about: "Hakkımda",
        nav_gallery: "Tasarım",
        nav_contact: "İletişim",
        hero_subtitle: "Minimal ve modern ifadenin sınırlarını keşfetmek.",
        hero_btn: "Çalışmaları Gör",
        gallery_title: "Seçilmiş Çalışmalar",
        art_1_title: "Talisca - POTM Concept",
        art_1_desc: "Canva kullanarak hazırladığım, tipografi ve katmanlı görsel düzenleme içeren Fenerbahçe temalı 'Ayın Oyuncusu' (POTM) konsept tasarımı.",
        art_2_title: "Alperen Şengün: The Wizard",
        art_2_desc: "NBA yıldızı Alperen Şengün için hazırladığım, dinamik renk paleti ve modern yazı tiplerini vurgulayan dijital spor posteri.",
        art_3_title: "Match Day Visual (3-1)",
        art_3_desc: "Fenerbahçe - Barcelona maçı için kurguladığım, kurumsal logolar ve net bir görsel hiyerarşi ile desteklenen dijital skor bilgilendirme görseli.",
        art_4_title: "Event Poster Design",
        art_4_desc: "Üsküdar Üniversitesi etkinliği için hazırladığım, hiyerarşi ve bilgilendirme odaklı 'The Voice of Football' konferans afişi çalışması.",
        art_5_title: "Champions League Matchday",
        art_5_desc: "Sosyal medya etkileşimi için tasarlanmış, Asensio ve Pedri görsellerini içeren dinamik bir 'Matchday' tasarımı.",
        about_title: "Hakkımda",
        about_text: "Ben Muhammet Mert Aslan.<br>20 yaşındayım ve Üsküdar Üniversitesi'nde Yeni Medya öğrencisiyim. Tasarım dünyasına duyduğum ilgiyle, dijital medya araçlarını kullanarak yaratıcı çözümler geliştirmeye odaklanıyorum. Akademik eğitimimi pratik tasarım projeleriyle harmanlayarak kendimi bu alanda geliştirmeye devam ediyorum.",
        contact_title: "İletişime Geç",
        contact_text: "İşbirliği yapmak veya dersim hakkında daha fazla bilgi edinmek ister misiniz?",
        contact_btn: "Bana Ulaşın",
        footer_text: "&copy; 2026 Muhammet Mert Aslan. Tüm Hakları Saklıdır."
    }
};

const langToggle = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'en';

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    htmlElement.setAttribute('lang', lang);
    langToggle.textContent = lang === 'en' ? 'TR' : 'EN';
}

// Initial application
applyLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'tr' : 'en';
    localStorage.setItem('lang', currentLang);
    applyLanguage(currentLang);
});

// Lightbox Logic
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxDownload = document.getElementById('lightbox-download');

function resetZoom() {
    stopMagnifier();
}

document.querySelectorAll('.grid-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.card-content h4');
        
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = title.innerHTML;
        lightboxDownload.href = img.src;
        
        resetZoom();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    resetZoom();
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg && e.target !== document.getElementById('magnifier-lens') && !e.target.closest('.lightbox-tools')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        resetZoom();
    }
});

// Magnifier Logic
const lens = document.getElementById('magnifier-lens');
let zoomRatio = 2.5; // magnification level
let isMagnifying = false;

function moveMagnifier(e) {
    if (!isMagnifying) return;
    
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    const bounds = lightboxImg.getBoundingClientRect();
    let x = clientX - bounds.left;
    let y = clientY - bounds.top;
    
    if (x > lightboxImg.width) x = lightboxImg.width;
    if (x < 0) x = 0;
    if (y > lightboxImg.height) y = lightboxImg.height;
    if (y < 0) y = 0;

    lens.style.left = (x - lens.offsetWidth / 2) + "px";
    lens.style.top = (y - lens.offsetHeight / 2) + "px";
    
    lens.style.backgroundPosition = "-" + ((x * zoomRatio) - lens.offsetWidth / 2) + "px -" + ((y * zoomRatio) - lens.offsetHeight / 2) + "px";
}

function startMagnifier(e) {
    e.preventDefault();
    isMagnifying = true;
    lens.style.display = "block";
    lens.style.backgroundImage = "url('" + lightboxImg.src + "')";
    lens.style.backgroundSize = (lightboxImg.width * zoomRatio) + "px " + (lightboxImg.height * zoomRatio) + "px";
    moveMagnifier(e);
}

function stopMagnifier() {
    isMagnifying = false;
    lens.style.display = "none";
}

lightboxImg.addEventListener("mousedown", startMagnifier);
lightboxImg.addEventListener("mousemove", moveMagnifier);
window.addEventListener("mouseup", stopMagnifier);

lightboxImg.addEventListener("touchstart", startMagnifier);
lightboxImg.addEventListener("touchmove", moveMagnifier);
window.addEventListener("touchend", stopMagnifier);

// Back to Top Logic
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Page Loader & Reveal Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.getElementById('hero').classList.add('active');
        document.querySelectorAll('#hero .reveal').forEach(el => el.classList.add('active'));
    }, 500);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05, rootMargin: "0px 0px -20px 0px" });

document.querySelectorAll('.reveal, .grid-item, section').forEach(el => {
    if (el.id !== 'hero' && !el.closest('#hero')) {
        revealObserver.observe(el);
    }
});

// Aesthetic: Ethereal Glow Mouse Follow
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.clientX + 'px');
    document.documentElement.style.setProperty('--mouse-y', e.clientY + 'px');
});

// Aesthetic: Anti-gravity Floating Particles
const heroSection = document.getElementById('hero');
for (let i = 0; i < 25; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    
    const size = Math.random() * 2 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    heroSection.appendChild(particle);
}
