import Route from '@ember/routing/route';

export default Route.extend({

  queryParams: {
    filter:{
			refreshModel:true
		}
  },

  model(params) {
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
