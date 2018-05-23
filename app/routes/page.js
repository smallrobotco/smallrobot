import { setProperties } from '@ember/object';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';



export default Route.extend({
  headData: service(),

  queryParams: {
    filter:{
			refreshModel:true
		}
  },

  model() {

    let slugPath = window.location.pathname;
    // console.log(slugPath);

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

  afterModel() {
    return setProperties(this.headData, {
      title: 'Small Robot Co. | Vancouver Web Design, Technical Consulting, App Development, & Support',
      description:
      'We are a Vancouver, BC based Web Design, Technical Consulting, Web Development, and Support company, specializing in Drupal, Ember.js, websites and web apps.',
      type: 'website',
      url: 'https://smallrobot.co/'
    });
  },
});




// model: function(params) {
//   return this.store.query('document', {
//       'filter': {
//           'document': this.getFilterQueryParams(params)
//       }
//   });
// }

// getFilterQueryParams(params){
//   let filter = {};

//   //only add keyword filter if it is not empty
//   if(params.filter) {
//       filter['keyword'] = params.filter;
//   }
//           return filter;
// }
 /**
	 * The query parameters
	 */
	// queryParams:{
	// 	filter:{
	// 		refreshModel:true
	// 	},
	// 	agencyIds:{
	// 		refreshModel:true
	// 	},
	// 	withinCommentPeriod:{
	// 		refreshModel:true
	// 	},
	// 	documentTypes:{
	// 		refreshModel:true
	// 	},
	// 	postedDateFrom: {
	// 		refreshModel:true
	// 	},
	// 	postedDateTo: {
	// 		refreshModel:true
	// 	},
	// 	commentEndDateFrom: {
	// 		refreshModel:true
	// 	},
	// 	commentEndDateTo: {
	// 		refreshModel:true
	// 	},
	// 	pageNumber:{
	// 		refreshModel:true
	// 	},
	// 	sortBy:{
	// 		refreshModel:true
	// 	},
	// 	sortDirection:{
	// 		refreshModel:true
	// 	}
	// },
