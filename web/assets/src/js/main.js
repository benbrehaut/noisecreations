(function () {

  /**
   * Cookie Banner
   */
  const banner = document.querySelector('.js-cookie-banner'),
    bannerCloseBtn = document.querySelector('.js-cookie-banner-close'),
    activeClass = 'is-active';

  const cookieBanner = new CookieBanner(banner, bannerCloseBtn, activeClass);

  cookieBanner.init();

});