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
}

// Toggle on click
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const role = btn.getAttribute('data-role');
    if (activeRoles.has(role)) {
      // Don't allow all to be toggled off
      if (activeRoles.size > 1) {
        activeRoles.delete(role);
      }
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

// Career Cliff Notes: horizontal depth-stacked card scroller
const stackScroller = document.querySelector('.stack-scroller');

if (stackScroller) {
  const stackStage = stackScroller.closest('.stack-stage');
  const experienceSection = stackScroller.closest('#experience');
  const stackEntries = Array.from(stackScroller.querySelectorAll('.stack-entry'));
  const prevBtn = stackStage.querySelector('.stack-nav.prev');
  const nextBtn = stackStage.querySelector('.stack-nav.next');
  const dots = Array.from(experienceSection.querySelectorAll('.stack-dot'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SCALE_FALLOFF = 0.12; // scale lost per card-width of distance
  const TRANSLATE_FALLOFF = 14; // px nudged down per card-width of distance
  const VISIBLE_RANGE = 2; // card-widths beyond which entries are hidden

  let currentIndex = 0;
  let ticking = false;

  function scrollToIndex(index, smooth = true) {
    const target = stackEntries[index];
    if (!target) return;
    const scrollerRect = stackScroller.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetOffset = targetRect.left - scrollerRect.left + stackScroller.scrollLeft;
    const centered = targetOffset - (stackScroller.clientWidth - target.clientWidth) / 2;
    stackScroller.scrollTo({
      left: centered,
      behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto',
    });
  }

  function updateStack() {
    const scrollerRect = stackScroller.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
    const cardWidth = stackEntries[0].getBoundingClientRect().width || 1;

    let closestIndex = 0;
    let closestDistance = Infinity;

    stackEntries.forEach((entry, i) => {
      const rect = entry.getBoundingClientRect();
      const entryCenter = rect.left + rect.width / 2;
      const relativeDistance = (entryCenter - scrollerCenter) / cardWidth;
      const absDistance = Math.abs(relativeDistance);

      if (absDistance < closestDistance) {
        closestDistance = absDistance;
        closestIndex = i;
      }

      if (absDistance > VISIBLE_RANGE) {
        entry.style.opacity = '0';
        entry.style.pointerEvents = 'none';
      } else {
        const scaleFalloff = prefersReducedMotion ? SCALE_FALLOFF * 0.3 : SCALE_FALLOFF;
        const translateFalloff = prefersReducedMotion ? 0 : TRANSLATE_FALLOFF;
        const scale = Math.max(1 - absDistance * scaleFalloff, 0.6);
        const translateY = absDistance * translateFalloff;
        const opacity = Math.max(1 - absDistance * 0.4, 0);

        entry.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        entry.style.opacity = String(opacity);
        entry.style.pointerEvents = 'auto';
        entry.style.zIndex = String(100 - Math.round(absDistance * 10));
      }
    });

    currentIndex = closestIndex;

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === stackEntries.length - 1;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      requestAnimationFrame(updateStack);
      ticking = true;
    }
  }

  function step(direction) {
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), stackEntries.length - 1);
    scrollToIndex(nextIndex);
  }

  stackScroller.addEventListener('scroll', requestUpdate);
  window.addEventListener('resize', requestUpdate);

  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => scrollToIndex(i));
  });

  stackScroller.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      step(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      step(1);
    }
  });

  updateStack();
}