import apiUtils from './apiUtils';

const BASE_URL = 'https://api.spotify.com/v1';

export default {
  getSearchUrl: (query, options) => {
    options = options ? options : {};
    let opts = {
      'type': 'artist', 
      'limit': 1,
      'offset': 0
    }
    Object.keys(options).forEach((key) => {
      opts[key] = options[key];
    });
    return `${BASE_URL}/search?q=${encodeURI(query)}&type=${encodeURI(opts.type)}&limit=${encodeURI(opts.limit)}&offset=${encodeURI(opts.offset)}`;
  },

  getTracksUrl: (artistId, country) => {
    country = country ? country : 'US';
    return `${BASE_URL}/artists/${artistId}/top-tracks?country=${encodeURI(country)}`;
  },

  getRequest: (url) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(apiUtils.checkStatus)
      .then(response => response.json());
  },

  mergeTypeAndOptions: (type, options) => {
    options = options ? options : {};
    return Object.assign(options, {type});
  }
}