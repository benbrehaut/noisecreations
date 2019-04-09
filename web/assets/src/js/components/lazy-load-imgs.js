let imgObserver = new IntersectionObserver(imgs => {
  imgs.forEach(img => {
    if (img.intersectionRatio > 0) {
      const activeImg = img.target;
      const activeImgSrc = activeImg.getAttribute('data-src');
      activeImg.classList.add('is-active');
      activeImg.setAttribute('src', activeImgSrc)
      
      // stop watching a specific entry if it is in view
      imgObserver.unobserve(activeImg);
    }
  });
}, {
  rootMargin: '0px',
});

export default imgObserver;