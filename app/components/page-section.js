import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['page-section'],
  breakpoints: {
    // when window width is <= 320px
    320: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    // when window width is <= 640px
    640: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    900: {
      slidesPerView: 3,
      spaceBetween: 80
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 80
    }
  },
});
