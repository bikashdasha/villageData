'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/**
 * Hero Auto Image Slider - Clickable
 */
const heroSlider = document.getElementById('heroSlider');
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('sliderDots');
let currentSlide = 0;
let slideInterval;

// Create dots
function createDots() {
  dotsContainer.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[n].classList.add('active');
  
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === n);
  });
  currentSlide = n;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}

// Auto slide every 3 seconds
function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}

// Initialize
createDots();
startAutoSlide();

// Pause on hover
heroSlider.addEventListener('mouseenter', stopAutoSlide);
heroSlider.addEventListener('mouseleave', startAutoSlide);


//leader images are auto scroll
// Auto Scroll for "Presidents & Leaders" Section - Right to Left
document.addEventListener("DOMContentLoaded", function () {

    // Target the first shop section (Presidents & Leaders)
    const leadersSection = document.querySelector('.section.shop');
    if (!leadersSection) return;

    const scrollContainer = leadersSection.querySelector('.has-scrollbar');
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 300;        // How much to scroll each time (adjust if needed)
    const intervalTime = 2500;     // 2.5 seconds gap (change as you want)

    function autoScrollRightToLeft() {
        
        scrollAmount += scrollStep;

        // If reached the end, go back to start (loop)
        if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth + 10) {
            scrollAmount = 0;
        }

        scrollContainer.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });
    }

    // Start auto scrolling
    const scrollInterval = setInterval(autoScrollRightToLeft, intervalTime);

    // Optional: Pause when mouse is over the section
    scrollContainer.addEventListener('mouseenter', () => {
        clearInterval(scrollInterval);
    });

    // Optional: Resume when mouse leaves
    scrollContainer.addEventListener('mouseleave', () => {
        clearInterval(scrollInterval); // Clear old one
        setInterval(autoScrollRightToLeft, intervalTime); // Restart
    });

});