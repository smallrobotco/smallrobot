import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    // let slugPath = params.page_slug;
    let slugPath = window.location.pathname;
    console.log(slugPath);
    return this.store.query('page', {
      filter:
        {
          'slug':{
            'value': slugPath
          },
        },
    })
    .then(pages => {
      return pages.get('firstObject');
    });
  },
  serialize(page) {
    return {
      page_slug: page.get('slug')
    };
  }
});
