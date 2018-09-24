/**
 * Class representing cookie banner
 */
class CookieBanner {
  /**
   * Creates a cookie banner
   * @param {HTMLElement} banner 
   * @param {HTMLElement} closeBtn 
   * @param {string} activeClass 
   * @constructor
   */
  constructor(banner, closeBtn, activeClass) {
    this.banner = banner;
    this.closeBtn = closeBtn;
    this.activeClass = activeClass;

    this.closeBanner.bind(this);
    this.createCookie.bind(this);
    this.closeBtn.addEventListener('click', () => this.closeBanner());
  }

  /**
   * Initialise method
   * @return {method} checking for cookie
   */
  init() {
    return this.checkCookie()
  }

  /**
   * Adds the event listener for closing the banner
   * @return {}
   */
  closeBanner() {
    this.banner.classList.remove(this.activeClass);
    this.createCookie()
  }

  /**
   * Check if the cookie exists
   */
  checkCookie() {
    if (document.cookie.indexOf("visited=") >= 0) {
      return;
    }
    else {
      this.showCookieBanner()
    }
  }

  /**
   * Shows cookie banner
   */
  showCookieBanner() {
    this.banner.classList.add(this.activeClass);
  }

  /**
   * creates the cookie if not set already
   */
  createCookie() {
      // set a new cookie
      let expiry = new Date();
      expiry.setTime(expiry.getTime() + (8760*60*60*1000)); 
    
      // Date()'s toGMTSting() method will format the date correctly for a cookie
      document.cookie = "visited=1; expires=" + expiry.toGMTString();
  }
}

const banner = document.querySelector('.js-cookie-banner'),
      bannerCloseBtn = document.querySelector('.js-cookie-banner-close'),
      activeClass = 'is-active';

const cookieBanner = new CookieBanner(banner, bannerCloseBtn, activeClass);

cookieBanner.init();