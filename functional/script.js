import projects from '../data/projects.js'
import certificates from '../data/certificate.js';

//CONNECT BUTTON
  (function connectButton() {
    const btn = document.querySelector('.about-me button');
    if (!btn) return;
    const linkedInUrl = 'https://www.linkedin.com/in/aido-nayaka-9847a1293'; // ganti punyamu

    btn.addEventListener('click', () => {
      btn.disabled = true;
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';
      setTimeout(() => {
        window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
        btn.disabled = false;
        btn.innerHTML = original;
      }, 500);
    });
  })();

   //PROJECTS: RENDER + FILTER
  (function projectsRenderAndFilter() {
    const projectWrap = document.querySelector('.project');
    if (!projectWrap) return;

    // Buat container filter di atas list project (dinamis)
    const titleH1 = projectWrap.previousElementSibling; // <h1>Project</h1>
    const filterBar = document.createElement('div');
    filterBar.className = 'project-filter';
    titleH1.insertAdjacentElement('afterend', filterBar);

    // Kumpulkan bahasa unik
    const langs = ['All', ...Array.from(new Set(projects.map(p => p.language)))];

    // Render tombol filter
    langs.forEach(l => {
      const b = document.createElement('button');
      b.textContent = l;
      b.dataset.lang = l;
      if (l === 'All') b.classList.add('active');
      filterBar.appendChild(b);
    });

    function render(list) {
    projectWrap.innerHTML = '';
    list.forEach(p => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
        <h3>${p.title}</h3>
        <div class="language-icon">
            <div class="dot" style="background-color: ${p.color};"></div>
            <p>${p.language}</p>
        </div>
        `;
        projectWrap.appendChild(card);
    });
    }

    // Render awal
    render(projects);

    // Event filter
    filterBar.addEventListener('click', e => {
      if (e.target.tagName !== 'BUTTON') return;
      filterBar.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const key = e.target.dataset.lang;
      if (key === 'All') return render(projects);
      const filtered = projects.filter(p => p.language === key);
      render(filtered);
    });
  })();

  //HEADER SHADOW ON SCROLL
  (function headerShadow() {
    const header = document.querySelector('header');
    if (!header) return;
    const handler = () => {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
  })();

 (function certificateModal(){
  const modal = document.getElementById('cert-modal');
  const img = modal.querySelector('img');
  const closeBtn = modal.querySelector('.modal-close');
  const backdrop = modal.querySelector('.modal-backdrop');

  function openModal(src) {
    img.src = src;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // disable scroll background
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    img.src = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.certificate-btn');
    if (btn) {
      const src = btn.dataset.cert;
      if (src) openModal(src);
    }

    if (
      e.target === backdrop ||
      e.target.closest('.modal-close')
    ) {
      closeModal();
    }
  });

  // Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal();
    }
  });
})();


// LICENSES: RENDER CERTIFICATES
(function renderCertificates() {
  const licenseWrap = document.querySelector('.license');
  if (!licenseWrap) return;

  licenseWrap.innerHTML = ''; // Kosongkan dulu

  certificates.forEach(cert => {
    const card = document.createElement('article');
    card.className = 'license-card';
    card.innerHTML = `
      <div class="license-title">
        <img src="${cert.logo_img}" alt="">
        <div>
          <h4>${cert.title}</h4>
          <p>${cert.institution}</p>
        </div>
      </div>
      <button
        class="certificate-btn"
        data-cert="${cert.certificates_img}"
      >
        Show Credential <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </button>
    `;
    licenseWrap.appendChild(card);
  });
})();

document.querySelector('nav').addEventListener('click', function(e) {
  if (e.target.matches('a[href="#"]')) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (e.target.matches('a[href="#contact"]')) {
    e.preventDefault();
    const footer = document.getElementById('contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  }
});
