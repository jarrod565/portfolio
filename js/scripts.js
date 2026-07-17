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

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Show/hide case studies
    caseStudyCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-discipline') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

window.addEventListener('scroll', debounce(checkSlide));