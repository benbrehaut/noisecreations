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
  const button = document.querySelector('.js-hero-banner-icon'),
    area = document.querySelector('.js-scroll-to')

  if (button) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      scrollDown(area)
    });
  }

})();