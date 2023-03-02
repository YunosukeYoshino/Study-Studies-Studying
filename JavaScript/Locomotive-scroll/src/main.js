import "./css/main.css";
import "./scss/style.scss";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  multiplier: 0.4,
  getDirection: true,
  smooth: true,

  mobile: {
    breakpoint: 0,
    smooth: false,
    getDirection: true,
  },
  tablet: {
    breakpoint: 0,
    smooth: false,
    getDirection: true,
  },
});




