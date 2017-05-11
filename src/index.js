import apiUtils from './apiUtils';
import helpers  from './helpers';
import 'isomorphic-fetch';

module.exports = {
  findArtist: (query, options) => {
    let opts = helpers.mergeTypeAndOptions('artist', options);
    let searchUrl = helpers.getSearchUrl(query, opts);
    return helpers.getRequest(searchUrl);
  },

  findAlbum: (query, options) => {
    let opts = helpers.mergeTypeAndOptions('album', options);
    let searchUrl = helpers.getSearchUrl(query, opts);
    return helpers.getRequest(searchUrl);
  },

  findTrack: (query, options) => {
    let opts = helpers.mergeTypeAndOptions('track', options);
    let searchUrl = helpers.getSearchUrl(query, opts);
    return helpers.getRequest(searchUrl);
  },

  getTracks: (artistId, country) => {
    let searchUrl = helpers.getTracksUrl(artistId, country);
    return fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(apiUtils.checkStatus)
      .then(response => response.json())
  }
}