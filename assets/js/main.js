(function() {
  "use strict";
  /**
 * Init tsParticles Background
 */
window.addEventListener('load', () => {
  if (typeof tsParticles !== 'undefined' && document.querySelector('#vanta-bg')) { // Check if library loaded
    tsParticles.load("vanta-bg", { // Target your background div ID
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" }, // Particle color
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false, anim: { enable: false } },
        size: { value: 3, random: true, anim: { enable: false } },
        links: {
          color: "#ffffff", // Line color
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2, // Speed of particles
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "repulse" }, // Repel mouse
          onclick: { enable: true, mode: "push" },    // Push particles on click
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true,
      background: { // Set background color BEHIND particles
        color: "#040b14", // Match your desired dark background
        image: "",
        position: "50% 50%",
        repeat: "no-repeat",
        size: "cover"
      }
    });
  } else {
    console.error("tsParticles library not loaded or #vanta-bg not found");
  }
});

  /**
   * Corner Menu Button Click Logic
   */
  const cornerMenuButton = document.querySelector('.corner-menu-button');
  const header = document.querySelector('#header');
  const pageBody = document.querySelector('body');
  const listIcon = cornerMenuButton ? cornerMenuButton.querySelector('.bi-list') : null;
  const xIcon = document.createElement('i'); // Create 'X' icon element
  xIcon.className = 'bi bi-x'; // Assign Bootstrap classes

  if (cornerMenuButton && header && pageBody && listIcon) {

    // Add the 'X' icon to the button, initially hidden
    cornerMenuButton.appendChild(xIcon);

    cornerMenuButton.addEventListener('click', () => {
      header.classList.toggle('header-show');
      pageBody.classList.toggle('header-active'); // Toggle body class for margin push
      cornerMenuButton.classList.toggle('active'); // Toggle active class on button
    });

    // Optional: Close menu when clicking a nav link
    document.querySelectorAll('#navmenu a').forEach(navLink => {
      navLink.addEventListener('click', () => {
        if (header.classList.contains('header-show')) {
          header.classList.remove('header-show');
          pageBody.classList.remove('header-active');
          cornerMenuButton.classList.remove('active');
        }
      });
    });

     // Optional: Close menu when clicking outside the header (on page content)
     document.addEventListener('click', (event) => {
        const isClickInsideHeader = header.contains(event.target);
        const isClickOnButton = cornerMenuButton.contains(event.target);

        if (!isClickInsideHeader && !isClickOnButton && header.classList.contains('header-show')) {
             header.classList.remove('header-show');
             pageBody.classList.remove('header-active');
             cornerMenuButton.classList.remove('active');
        }
     });

  }

  /**
   * Header toggle (Mobile)
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const header = document.querySelector('#header');
    if (header) { // Check if header exists
        header.classList.toggle('header-show');
        headerToggleBtn.classList.toggle('bi-list');
        headerToggleBtn.classList.toggle('bi-x');
    }
  }
  if (headerToggleBtn) { // Check if button exists
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links click
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      const header = document.querySelector('#header');
      if (header && header.classList.contains('header-show')) { // Check if header exists and is shown
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns (Not used in current nav structure, but kept for template compatibility)
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) { // Check if button exists
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init (AOS)
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') { // Check if AOS exists
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') { // Check if element and Typed lib exist
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    if (typed_strings) { // Check if attribute has value
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
    }
  }

  /**
   * Initiate Pure Counter
   */
   if (typeof PureCounter !== 'undefined') { // Check if PureCounter exists
     new PureCounter();
   }

  /**
   * Animate the skills items on reveal (Waypoints)
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  if (skillsAnimation.length > 0 && typeof Waypoint !== 'undefined') { // Check if elements and Waypoint lib exist
    skillsAnimation.forEach((item) => {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    });
  }

  /**
   * Initiate glightbox
   */
   if (typeof GLightbox !== 'undefined') { // Check if GLightbox exists
     const glightbox = GLightbox({
       selector: '.glightbox'
     });
   }

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    if (typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') { // Check if libs exist
        let initIsotope;
        imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
          initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        });

        isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
          filters.addEventListener('click', function() {
            isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
            this.classList.add('filter-active');
            if (initIsotope) { // Check if isotope was initialized
                initIsotope.arrange({
                  filter: this.getAttribute('data-filter')
                });
            }
            if (typeof aosInit === 'function') {
              aosInit(); // Re-init AOS on filter change
            }
          }, false);
        });
    }
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper !== 'undefined') { // Check if Swiper exists
        document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
          let configEl = swiperElement.querySelector(".swiper-config");
          if (configEl) { // Check if config element exists
              let config = JSON.parse(configEl.innerHTML.trim());
              new Swiper(swiperElement, config);
          }
        });
    }
  }
  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      let section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop || '0'), // Added fallback for scrollMarginTop
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    let position = window.scrollY + 200;
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();