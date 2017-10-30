import Route from '@ember/routing/route';

export default Route.extend({

  // model(params) {
  //   let slugPath = '/' + window.location.href;
  //   return this.store.query('page', {
  //     filter:
  //       {
  //         'slug':{
  //           'value': slugPath
  //         },
  //       },
  //   })
  //   .then(pages => {
  //     return pages.get('firstObject');
  //   });
  // }
});
