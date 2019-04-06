import 'whatwg-fetch'

(function () {

  const dropDown = document.querySelector('.js-blog-dropdown');
  const articlesArea = document.querySelector('.js-blog-articles')

  dropDown.addEventListener('change', function() {
    const yearSelected = this.selectedOptions[0].getAttribute('data-year-link');

    // if option does not have a data attribute
    if (yearSelected) {
      getArticles(yearSelected, articlesArea);
    }
  })
 
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