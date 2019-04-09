import Stickyfill from './vendor/polyfill.sticky'

import CookieBanner from './components/cookie-notice'
import Accordion from './components/accordion'
import imgObserver from './components/lazy-load-imgs'
import heroBanner from './components/hero-banner'
import SiteHeader from './components/site-header'
import DropDownAjax from './components/dropdown-fetch-results'

/**
 * Sticky Polyfill
 */
var stickyElems = document.querySelectorAll('.js-sticky');
  
if (stickyElems) {
  Stickyfill.add(stickyElems);
}

/**
 * Cookie Banner
 */
const banner = document.querySelector('.js-cookie-banner'),
  bannerCloseBtn = document.querySelector('.js-cookie-banner-close'),
  activeClass = 'is-active';

new CookieBanner(banner, bannerCloseBtn, activeClass);

/**
 * Hero Banner Component
 */
heroBanner();

/**
 * Site Header Component
 */
SiteHeader();

/**
 * Accordion
 */
const accordBtn = document.querySelectorAll('.js-accordion-btn');
const accordActiveClass = 'is-active';

new Accordion(accordBtn, accordActiveClass);

/**
 * DropDownAjax
 */
const dropDown = document.querySelector('.js-blog-dropdown');
const articlesArea = document.querySelector('.js-blog-articles');

new DropDownAjax(dropDown, articlesArea);

/**
 * Lazy Loading Images 
 */
const lazyImgs = document.querySelectorAll('.js-lazy-img');

lazyImgs.forEach(img => {
  imgObserver.observe(img);
});