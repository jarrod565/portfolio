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

  // Show/hide case studies
  caseStudyCards.forEach(card => {
    const disciplines = card.getAttribute('data-discipline').split(' ');
    const visible = disciplines.some(d => activeRoles.has(d));
    card.classList.toggle('hidden', !visible);
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