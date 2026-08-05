import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from '../config/environment';

export default  JSONAPIAdapter.extend({
  host: ENV.host,
  namespace: ENV.namespace,
  // buildURL(record, suffix) {
  //   return this._super(record, suffix) + '?_format=api_json';
  // },
  pathForType(type) {
    return type.replace('--', '/').replace('-', '_');
  },
  ajaxOptions() {
    const options = this._super(...arguments) || {};
    options.beforeSend = (xhr) => {
      xhr.setRequestHeader('Cache-Control',  'max-age=86400');
    };
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/vnd.api+json';
    return options;
  }
});
