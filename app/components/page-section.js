import Component from '@ember/component';
// import { setProperties } from '@ember/object';
// import { on } from '@ember/object/evented';
import InViewportMixin from 'ember-in-viewport';

export default Component.extend(InViewportMixin, {
  init() {
    this._super(...arguments);
    this.tagName = 'section';
    this.classNames = ['page-section'];
    // this.classNameBindings = [ 'viewportEntered:active:inactive' ];
    // this.viewportOptionsOverride = on('didInsertElement', function() {
    //   setProperties(this, {
    //     viewportEnabled                 : false,
    //     viewportUseRAF                  : true,
    //     viewportSpy                     : false,
    //     viewportUseIntersectionObserver : true,
    //     viewportScrollSensitivity       : 1,
    //     viewportRefreshRate             : 150,
    //     intersectionThreshold           : 0,
    //     scrollableArea                  : null,
    //     viewportTolerance: {
    //       top    : 50,
    //       bottom : 50,
    //       left   : 10,
    //       right  : 10
    //     }
    //   });
    // });
    this.breakpoints = {
      320: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      900: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 80
      }
    };
  },

  // didEnterViewport() {
  //   console.log('entered');
  // },
  //
  // didExitViewport() {
  //   console.log('exited');
  // }
});
