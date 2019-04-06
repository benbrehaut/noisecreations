"use strict";
'use strict';

(function () {

  var elem = {
    heading: document.querySelectorAll('.js-accordion-heading'),
    btn: document.querySelectorAll('.js-accordion-btn'),
    panel: document.querySelectorAll('.js-accordion-panel'),
    activeClass: 'is-active'
  };

  elem.btn.forEach(function (accordion) {
    accordion.addEventListener('click', function (event) {
      event.preventDefault();

      var btn = event.target;
      var panel = btn.parentNode.nextElementSibling;

      if (btn.classList.contains(elem.activeClass)) {
        btn.classList.remove(elem.activeClass);
        panel.classList.remove(elem.activeClass);

        btn.setAttribute('aria-expanded', false);
        panel.setAttribute('aria-hidden', true);
      } else {
        btn.classList.add(elem.activeClass);
        panel.classList.add(elem.activeClass);

        btn.setAttribute('aria-expanded', true);
        panel.setAttribute('aria-hidden', false);
      }
    });
  });
})();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class representing cookie banner
 */
var CookieBanner = function () {
  /**
   * Creates a cookie banner
   * @param {HTMLElement} banner 
   * @param {HTMLElement} closeBtn 
   * @param {string} activeClass 
   * @constructor
   */
  function CookieBanner(banner, closeBtn, activeClass) {
    var _this = this;

    _classCallCheck(this, CookieBanner);

    this.banner = banner;
    this.closeBtn = closeBtn;
    this.activeClass = activeClass;

    this.closeBanner.bind(this);
    this.createCookie.bind(this);
    this.closeBtn.addEventListener('click', function () {
      return _this.closeBanner();
    });
  }

  /**
   * Initialise method
   * @return {method} checking for cookie
   */


  _createClass(CookieBanner, [{
    key: "init",
    value: function init() {
      return this.checkCookie();
    }

    /**
     * Adds the event listener for closing the banner
     * @return {}
     */

  }, {
    key: "closeBanner",
    value: function closeBanner() {
      this.banner.classList.remove(this.activeClass);
      this.createCookie();
    }

    /**
     * Check if the cookie exists
     */

  }, {
    key: "checkCookie",
    value: function checkCookie() {
      if (document.cookie.indexOf("visited=") >= 0) {
        return;
      } else {
        this.showCookieBanner();
      }
    }

    /**
     * Shows cookie banner
     */

  }, {
    key: "showCookieBanner",
    value: function showCookieBanner() {
      this.banner.classList.add(this.activeClass);
    }

    /**
     * creates the cookie if not set already
     */

  }, {
    key: "createCookie",
    value: function createCookie() {
      // set a new cookie
      var expiry = new Date();
      expiry.setTime(expiry.getTime() + 8760 * 60 * 60 * 1000);

      // Date()'s toGMTSting() method will format the date correctly for a cookie
      document.cookie = "visited=1; expires=" + expiry.toGMTString();
    }
  }]);

  return CookieBanner;
}();
'use strict';

require('whatwg-fetch');

(function () {

  var dropDown = document.querySelector('.js-blog-dropdown');
  var articlesArea = document.querySelector('.js-blog-articles');

  dropDown.addEventListener('change', function () {
    var yearSelected = this.selectedOptions[0].getAttribute('data-year-link');

    // if option does not have a data attribute
    if (yearSelected) {
      getArticles(yearSelected, articlesArea);
    }
  });

  function getArticles(query, area) {
    fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html'
      }
    }).then(function (response) {
      return response.text();
    }).then(function (res) {
      area.innerHTML = '';
      area.innerHTML = res;
    }).catch(function (error) {
      return console.warn('Failed: ', error);
    });
  }
})();
'use strict';

(function () {

  /**
   * Function which moves the user window positon down to an area
   * @param {HTMLElement} area 
   */
  function scrollDown(area) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: area.offsetTop
    });
  }

  /**
   * Button which activates the scroll down
   */
  var button = document.querySelector('.js-hero-banner-icon'),
      area = document.querySelector('.js-scroll-to');

  if (button) {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      scrollDown(area);
    });
  }
})();
'use strict';

(function () {

  var menuBtn = document.querySelector('.js-toggle-menu'),
      mobileMenu = document.querySelector('.js-site-nav-mobile');

  menuBtn.addEventListener('click', openMenu);

  function openMenu(e) {
    e.preventDefault();

    this.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-active');
  }

  var mobileSecondaryAction = document.querySelectorAll('.js-site-nav-mobile-open-secondary');

  mobileSecondaryAction.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      this.classList.toggle('is-active');
      this.nextElementSibling.classList.toggle('is-active');
    });
  });
})();
'use strict';

(function () {

  /**
   * Cookie Banner
   */
  var banner = document.querySelector('.js-cookie-banner'),
      bannerCloseBtn = document.querySelector('.js-cookie-banner-close'),
      activeClass = 'is-active';

  var cookieBanner = new CookieBanner(banner, bannerCloseBtn, activeClass);

  cookieBanner.init();
});