import '../vendor/polyfill.fetch'

export default class DropDownAjax {
  constructor(dropDown, area) {
    this.dropDown = dropDown;
    this.contentArea = area;

    this.initDropdown();
  }

  initDropdown() {
    const self = this;

    if (self.dropDown) {
      self.dropDown.addEventListener('change', function() {
        const yearSelected = this.selectedOptions[0].getAttribute('data-year-link');
    
        // if option does not have a data attribute
        if (yearSelected) {
          self.getArticles(yearSelected, self.contentArea);
        }
      });
    }
  }

  /**
   * getArticles
   * @description Gets a chunck of HTML and appends the content into an element
   * @param {*} query - the url to fetch
   * @param {*} area - the area to place the response
   */
  getArticles(query, area) {
    fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/html'
      },
    })
    .then(function(response) {
      return response.text()
    })
    .then(function(res) {
      area.innerHTML = '';
      area.innerHTML = res;
    })
    .catch(error => console.warn('Failed: ', error));
  }
}