export default class Accordion {
  constructor(btn, activeClass) {
    this.btn = btn
    this.activeClass = activeClass

    this.init();
  }

  init() {
    const self = this;

    this.btn.forEach(accordion => {
      accordion.addEventListener('click', function (evt) {
        evt.preventDefault();
  
        const btn = evt.target;
        const panel = btn.parentNode.nextElementSibling;
  
        if (btn.classList.contains(self.activeClass)) {
          self.closeAccordion(btn, panel);
        }
        else {
          self.openAccordion(btn, panel);
        }
      });
    });
  }

  closeAccordion(btn, panel) {
    const self = this;

    btn.classList.remove(self.activeClass);
    panel.classList.remove(self.activeClass);

    btn.setAttribute('aria-expanded', false);
    panel.setAttribute('aria-hidden', true);
  }

  openAccordion(btn, panel) {
    const self = this;

    btn.classList.add(self.activeClass);
    panel.classList.add(self.activeClass);

    btn.setAttribute('aria-expanded', true);
    panel.setAttribute('aria-hidden', false);
  }
}

  // const elem = {
  //   heading: document.querySelectorAll('.js-accordion-heading'),
  //   btn: document.querySelectorAll('.js-accordion-btn'),
  //   panel: document.querySelectorAll('.js-accordion-panel'),
  //   activeClass: 'is-active'
  // }

  // elem.btn.forEach(accordion => {
  //   accordion.addEventListener('click', function (event) {
  //     event.preventDefault();

  //     const btn = event.target;
  //     const panel = btn.parentNode.nextElementSibling;

  //     if (btn.classList.contains(elem.activeClass)) {
  //       btn.classList.remove(elem.activeClass);
  //       panel.classList.remove(elem.activeClass);

  //       btn.setAttribute('aria-expanded', false);
  //       panel.setAttribute('aria-hidden', true);
  //     }
  //     else {
  //       btn.classList.add(elem.activeClass);
  //       panel.classList.add(elem.activeClass);

  //       btn.setAttribute('aria-expanded', true);
  //       panel.setAttribute('aria-hidden', false);
  //     }
  //   });
  // });
