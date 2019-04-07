"use strict";

/*!
  * Stickyfill – `position: sticky` polyfill
  * v. 2.1.0 | https://github.com/wilddeer/stickyfill
  * MIT License
  */
!function (a, b) {
  "use strict";
  function c(a, b) {
    if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
  }function d(a, b) {
    for (var c in b) {
      b.hasOwnProperty(c) && (a[c] = b[c]);
    }
  }function e(a) {
    return parseFloat(a) || 0;
  }function f(a) {
    for (var b = 0; a;) {
      b += a.offsetTop, a = a.offsetParent;
    }return b;
  }function g() {
    function c() {
      a.pageXOffset != m.left ? (m.top = a.pageYOffset, m.left = a.pageXOffset, p.refreshAll()) : a.pageYOffset != m.top && (m.top = a.pageYOffset, m.left = a.pageXOffset, n.forEach(function (a) {
        return a._recalcPosition();
      }));
    }function d() {
      f = setInterval(function () {
        n.forEach(function (a) {
          return a._fastCheck();
        });
      }, 500);
    }function e() {
      clearInterval(f);
    }if (!k) {
      k = !0, c(), a.addEventListener("scroll", c), a.addEventListener("resize", p.refreshAll), a.addEventListener("orientationchange", p.refreshAll);var f = void 0,
          g = void 0,
          h = void 0;"hidden" in b ? (g = "hidden", h = "visibilitychange") : "webkitHidden" in b && (g = "webkitHidden", h = "webkitvisibilitychange"), h ? (b[g] || d(), b.addEventListener(h, function () {
        b[g] ? e() : d();
      })) : d();
    }
  }var h = function () {
    function a(a, b) {
      for (var c = 0; c < b.length; c++) {
        var d = b[c];d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d);
      }
    }return function (b, c, d) {
      return c && a(b.prototype, c), d && a(b, d), b;
    };
  }(),
      i = !1,
      j = "undefined" != typeof a;j && a.getComputedStyle ? !function () {
    var a = b.createElement("div");["", "-webkit-", "-moz-", "-ms-"].some(function (b) {
      try {
        a.style.position = b + "sticky";
      } catch (a) {}return "" != a.style.position;
    }) && (i = !0);
  }() : i = !0;var k = !1,
      l = "undefined" != typeof ShadowRoot,
      m = { top: null, left: null },
      n = [],
      o = function () {
    function g(a) {
      if (c(this, g), !(a instanceof HTMLElement)) throw new Error("First argument must be HTMLElement");if (n.some(function (b) {
        return b._node === a;
      })) throw new Error("Stickyfill is already applied to this node");this._node = a, this._stickyMode = null, this._active = !1, n.push(this), this.refresh();
    }return h(g, [{ key: "refresh", value: function value() {
        if (!i && !this._removed) {
          this._active && this._deactivate();var c = this._node,
              g = getComputedStyle(c),
              h = { position: g.position, top: g.top, display: g.display, marginTop: g.marginTop, marginBottom: g.marginBottom, marginLeft: g.marginLeft, marginRight: g.marginRight, cssFloat: g.cssFloat };if (!isNaN(parseFloat(h.top)) && "table-cell" != h.display && "none" != h.display) {
            this._active = !0;var j = c.style.position;"sticky" != g.position && "-webkit-sticky" != g.position || (c.style.position = "static");var k = c.parentNode,
                m = l && k instanceof ShadowRoot ? k.host : k,
                n = c.getBoundingClientRect(),
                o = m.getBoundingClientRect(),
                p = getComputedStyle(m);this._parent = { node: m, styles: { position: m.style.position }, offsetHeight: m.offsetHeight }, this._offsetToWindow = { left: n.left, right: b.documentElement.clientWidth - n.right }, this._offsetToParent = { top: n.top - o.top - e(p.borderTopWidth), left: n.left - o.left - e(p.borderLeftWidth), right: -n.right + o.right - e(p.borderRightWidth) }, this._styles = { position: j, top: c.style.top, bottom: c.style.bottom, left: c.style.left, right: c.style.right, width: c.style.width, marginTop: c.style.marginTop, marginLeft: c.style.marginLeft, marginRight: c.style.marginRight };var q = e(h.top);this._limits = { start: n.top + a.pageYOffset - q, end: o.top + a.pageYOffset + m.offsetHeight - e(p.borderBottomWidth) - c.offsetHeight - q - e(h.marginBottom) };var r = p.position;"absolute" != r && "relative" != r && (m.style.position = "relative"), this._recalcPosition();var s = this._clone = {};s.node = b.createElement("div"), d(s.node.style, { width: n.right - n.left + "px", height: n.bottom - n.top + "px", marginTop: h.marginTop, marginBottom: h.marginBottom, marginLeft: h.marginLeft, marginRight: h.marginRight, cssFloat: h.cssFloat, padding: 0, border: 0, borderSpacing: 0, fontSize: "1em", position: "static" }), k.insertBefore(s.node, c), s.docOffsetTop = f(s.node);
          }
        }
      } }, { key: "_recalcPosition", value: function value() {
        if (this._active && !this._removed) {
          var a = m.top <= this._limits.start ? "start" : m.top >= this._limits.end ? "end" : "middle";if (this._stickyMode != a) {
            switch (a) {case "start":
                d(this._node.style, { position: "absolute", left: this._offsetToParent.left + "px", right: this._offsetToParent.right + "px", top: this._offsetToParent.top + "px", bottom: "auto", width: "auto", marginLeft: 0, marginRight: 0, marginTop: 0 });break;case "middle":
                d(this._node.style, { position: "fixed", left: this._offsetToWindow.left + "px", right: this._offsetToWindow.right + "px", top: this._styles.top, bottom: "auto", width: "auto", marginLeft: 0, marginRight: 0, marginTop: 0 });break;case "end":
                d(this._node.style, { position: "absolute", left: this._offsetToParent.left + "px", right: this._offsetToParent.right + "px", top: "auto", bottom: 0, width: "auto", marginLeft: 0, marginRight: 0 });}this._stickyMode = a;
          }
        }
      } }, { key: "_fastCheck", value: function value() {
        this._active && !this._removed && (Math.abs(f(this._clone.node) - this._clone.docOffsetTop) > 1 || Math.abs(this._parent.node.offsetHeight - this._parent.offsetHeight) > 1) && this.refresh();
      } }, { key: "_deactivate", value: function value() {
        var a = this;this._active && !this._removed && (this._clone.node.parentNode.removeChild(this._clone.node), delete this._clone, d(this._node.style, this._styles), delete this._styles, n.some(function (b) {
          return b !== a && b._parent && b._parent.node === a._parent.node;
        }) || d(this._parent.node.style, this._parent.styles), delete this._parent, this._stickyMode = null, this._active = !1, delete this._offsetToWindow, delete this._offsetToParent, delete this._limits);
      } }, { key: "remove", value: function value() {
        var a = this;this._deactivate(), n.some(function (b, c) {
          if (b._node === a._node) return n.splice(c, 1), !0;
        }), this._removed = !0;
      } }]), g;
  }(),
      p = { stickies: n, Sticky: o, forceSticky: function forceSticky() {
      i = !1, g(), this.refreshAll();
    }, addOne: function addOne(a) {
      if (!(a instanceof HTMLElement)) {
        if (!a.length || !a[0]) return;a = a[0];
      }for (var b = 0; b < n.length; b++) {
        if (n[b]._node === a) return n[b];
      }return new o(a);
    }, add: function add(a) {
      if (a instanceof HTMLElement && (a = [a]), a.length) {
        for (var b = [], c = function c(_c) {
          var d = a[_c];return d instanceof HTMLElement ? n.some(function (a) {
            if (a._node === d) return b.push(a), !0;
          }) ? "continue" : void b.push(new o(d)) : (b.push(void 0), "continue");
        }, d = 0; d < a.length; d++) {
          c(d);
        }return b;
      }
    }, refreshAll: function refreshAll() {
      n.forEach(function (a) {
        return a.refresh();
      });
    }, removeOne: function removeOne(a) {
      if (!(a instanceof HTMLElement)) {
        if (!a.length || !a[0]) return;a = a[0];
      }n.some(function (b) {
        if (b._node === a) return b.remove(), !0;
      });
    }, remove: function remove(a) {
      if (a instanceof HTMLElement && (a = [a]), a.length) for (var b = function b(_b) {
        var c = a[_b];n.some(function (a) {
          if (a._node === c) return a.remove(), !0;
        });
      }, c = 0; c < a.length; c++) {
        b(c);
      }
    }, removeAll: function removeAll() {
      for (; n.length;) {
        n[0].remove();
      }
    } };i || g(), "undefined" != typeof module && module.exports ? module.exports = p : j && (a.Stickyfill = p);
}(window, document);
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

(function () {

  var dropDown = document.querySelector('.js-blog-dropdown');
  var articlesArea = document.querySelector('.js-blog-articles');

  if (dropDown) {
    dropDown.addEventListener('change', function () {
      var yearSelected = this.selectedOptions[0].getAttribute('data-year-link');

      // if option does not have a data attribute
      if (yearSelected) {
        getArticles(yearSelected, articlesArea);
      }
    });
  }

  /**
   * getArticles
   * @description Gets a chunck of HTML and appends the content into an element
   * @param {*} query - the url to fetch
   * @param {*} area - the area to place the response
   */
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

  var imgObserver = new IntersectionObserver(function (imgs) {
    imgs.forEach(function (img) {
      if (img.intersectionRatio > 0) {
        var activeImg = img.target;
        var activeImgSrc = activeImg.getAttribute('data-src');
        activeImg.classList.add('is-active');
        activeImg.setAttribute('src', activeImgSrc);

        // stop watching a specific entry if it is in view
        imgObserver.unobserve(activeImg);
      }
    });
  }, {
    rootMargin: '0px'
  });

  var lazyImgs = document.querySelectorAll('.js-lazy-img');

  lazyImgs.forEach(function (img) {
    imgObserver.observe(img);
  });
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
  var stickyElems = document.querySelectorAll('.js-sticky');

  if (stickyElems) {
    Stickyfill.add(stickyElems);
  }
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