const panels = document.querySelectorAll('.panel');

function toggleOpen() {
  this.classList.toggle('open');
}

function toggleActive(e) {
  console.log(e.propertyName);
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open-active');
  }
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
const sliderImages = document.querySelectorAll('.slide-up');
function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.offsetHeight / 2;
    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.offsetHeight;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}

const caseStudies = [
  { title: "Beyond the Login", slug: "beyond-the-login", thumb: "login.jpg" },
  { title: "Platform One", slug: "platform-one", thumb: "platform-one.jpg" },
  { title: "Know Your Audience", slug: "audience", thumb: "audience.jpg" },
  { title: "AI-Ready Backlog", slug: "ai-ready-backlog", thumb: "ai-ready.png" },
  { title: "Smart Launcher", slug: "smart-launcher", thumb: "launcher.png" },
  { title: "Online Claims", slug: "online-claims", thumb: "claims.jpg" },
  { title: "Password Resets", slug: "password", thumb: "password.jpg" },
  { title: "High Risk Queue", slug: "highrisk", thumb: "highrisk.jpg" },
  { title: "Carte Blanche UX", slug: "carte-blanche-ux", thumb: "carte-blanche.jpg" },
  { title: "Dinner Meets Tinder", slug: "dinner-meets-tinder", thumb: "dinder.jpg" },
];

function renderRelatedCaseStudies(currentSlug, containerSelector = ".flexTrio") {
  const others = caseStudies.filter(cs => cs.slug !== currentSlug);
  const shuffled = others.sort(() => 0.5 - Math.random()).slice(0, 3);

  const container = document.querySelector(containerSelector);
  container.innerHTML = shuffled.map(cs => `
    <figure class="case_thumb">
      <div>
        <img alt="${cs.title}" src="./img/thumbs/${cs.thumb}" />
        <a href="./${cs.slug}.html">
          <i class="material-icons" id="white-XL">touch_app</i>
        </a>
      </div>
      <figcaption><a href="./${cs.slug}.html">${cs.title}</a></figcaption>
    </figure>
  `).join('');
}

const testimonials = [
  { quote: "If you're looking for a flexible UX powerhouse, Jarrod’s the one to call.  Any company would be fortunate to have him on their team. As an added bonus, he's one of the funniest humans I've ever worked with.", source: "Brandon C." },
  { quote: "Jarrod Murray is not only one of the best UX guys in the biz but he’s also an awesome human.", source: "Zach H." },
  { quote: "His unique strength is the ability to bridge executives, product teams, engineering, and end users, translating complex operational challenges into practical, scalable solutions.", source: "Glenn A." },
  { quote: "If you're looking for a Product Designer or leader, I'd recommend talking with Jarrod.", source: "Wesley S." },
  { quote: "The best UX leader I’ve ever had the pleasure to work with.", source: "Clay A." },
  { quote: "I can't speak highly enough of him and his talent!", source: "Shane S." },
];

function renderTestimonials(containerSelector = "#testimonials") {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const shuffled = [...testimonials].sort(() => 0.5 - Math.random()).slice(0, 3);
  container.innerHTML = shuffled.map(t => `
    <blockquote class="testimonial">
      <p>${t.quote} <span class="source">${t.source}</span></p>
    </blockquote>
  `).join('');
}

renderTestimonials();

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const caseStudyCards = document.querySelectorAll('.case_study');
const deliverableCards = document.querySelectorAll('.deliverable');

// Read query param on load
const params = new URLSearchParams(window.location.search);
const roleParam = params.get('role');

// Determine initial active roles
const validRoles = ['designer', 'researcher', 'strategist'];
const activeRoles = new Set(
  roleParam && validRoles.includes(roleParam)
    ? [roleParam]
    : ['designer', 'researcher', 'strategist']
);

function applyFilter() {
  // Update button states
  filterBtns.forEach(btn => {
    const role = btn.getAttribute('data-role');
    if (activeRoles.has(role)) {
      btn.classList.remove('off');
    } else {
      btn.classList.add('off');
    }
  });

  // Swap icons based on state
  filterBtns.forEach(btn => {
    const icon = btn.querySelector('.filter-icon');
    if (btn.classList.contains('off')) {
      icon.textContent = 'toggle_off';
    } else {
      icon.textContent = 'toggle_on';
    }
  });

  // Sync H1 role word opacity with active roles
  const roleWords = {
    designer: document.querySelector('#welcome h1 .designer'),
    researcher: document.querySelector('#welcome h1 .researcher'),
    strategist: document.querySelector('#welcome h1 .strategist')
  };

  validRoles.forEach(role => {
    if (roleWords[role]) {
      if (activeRoles.has(role)) {
        roleWords[role].classList.remove('dimmed');
      } else {
        roleWords[role].classList.add('dimmed');
      }
    }
  });

  // Show/hide case studies
  caseStudyCards.forEach(card => {
    const disciplines = card.getAttribute('data-discipline').split(' ');
    const visible = disciplines.some(d => activeRoles.has(d));
    card.classList.toggle('hidden', !visible);
  });

  // Show/hide deliverables
  deliverableCards.forEach(card => {
    const discipline = card.getAttribute('data-discipline');
    if (!discipline) return;
    card.classList.toggle('hidden', !activeRoles.has(discipline));
  });

  const emptyState = document.querySelector('.filter-empty-state');
  if (emptyState) {
    emptyState.classList.toggle('visible', activeRoles.size === 0);
  }
}

// Toggle on click
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    if (activeRoles.has(role)) {
      activeRoles.delete(role);
    } else {
      activeRoles.add(role);
    }
    applyFilter();
  });
});

// Apply on load
applyFilter();

window.addEventListener('scroll', debounce(checkSlide));

// Hero photo pop into nav on scroll
const heroPhoto = document.getElementById('hero-photo');
const navIdentity = document.querySelector('.nav-identity');

if (heroPhoto && navIdentity) {
  function checkHeroScroll() {
    const navHeight = document.querySelector('nav').offsetHeight;
    const photoBottom = heroPhoto.getBoundingClientRect().bottom;

    if (photoBottom <= navHeight) {
      navIdentity.classList.add('visible');
    } else {
      navIdentity.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', debounce(checkHeroScroll, 10));
}

// Mobile nav hamburger menu
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const mainNav = document.querySelector('nav');

if (navToggle && navLinks) {
  const navToggleIcon = navToggle.querySelector('i');

  function openMenu() {
    navLinks.classList.add('open');
    document.body.appendChild(navLinks);
    navToggle.setAttribute('aria-expanded', 'true');
    if (navToggleIcon) navToggleIcon.textContent = 'close';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    mainNav.insertBefore(navLinks, navToggle);
    navToggle.setAttribute('aria-expanded', 'false');
    if (navToggleIcon) navToggleIcon.textContent = 'menu';
  }

  navToggle.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('open') &&
      !navToggle.contains(e.target) &&
      !navLinks.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

// Career Cliff Notes: GSAP ScrollTrigger pinned card stack (about.html only -
// gsap/ScrollTrigger are only loaded there, and this whole block is guarded
// on .card-wrapper existing, so it never runs on index.html).
const cardWrappers = document.querySelectorAll('.card-wrapper');

if (cardWrappers.length) {
  const experienceSection = cardWrappers[0].closest('#experience');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gsapAvailable = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (prefersReducedMotion || !gsapAvailable) {
    // Static fallback: plain stacked list, no pin/scrub/fade/scale.
    experienceSection.classList.add('no-scrolltrigger');
  } else {
    gsap.registerPlugin(ScrollTrigger);

    const experienceStage = experienceSection.querySelector('.experience-stage');
    if (experienceStage) {
      function checkStageBottom() {
        const atBottom = experienceStage.scrollTop + experienceStage.clientHeight >= experienceStage.scrollHeight - 1;
        experienceStage.classList.toggle('at-bottom', atBottom);
      }
      checkStageBottom();
      experienceStage.addEventListener('scroll', debounce(checkStageBottom, 10));
    }

    cardWrappers.forEach((wrapper, index) => {
      const card = wrapper.querySelector('.card');
      if (index === cardWrappers.length - 1) {
        ScrollTrigger.create({
          trigger: wrapper,
          scroller: '.experience-stage',
          start: 'top top',
          end: 'bottom top',
          pin: true,
          pinSpacing: false,
        });
        gsap.set(card, { opacity: 1, scale: 1 });
      } else {
        gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            scroller: '.experience-stage',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            pinSpacing: false,
          }
        })
        .set(card, { opacity: 1, scale: 1 })
        .to(card, { opacity: 0, scale: 0.6, ease: 'none' }, 0.01);
      }
    });
  }
}