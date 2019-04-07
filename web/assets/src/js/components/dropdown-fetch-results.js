(function () {

  const dropDown = document.querySelector('.js-blog-dropdown');
  const articlesArea = document.querySelector('.js-blog-articles')

  if (dropDown) {
    dropDown.addEventListener('change', function() {
      const yearSelected = this.selectedOptions[0].getAttribute('data-year-link');
  
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
})();