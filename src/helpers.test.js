import { expect }       from 'chai';
import helpers          from './helpers';

import beatlesData      from '../testData/beatles';

describe('helpers', () => {

  it('getSearchUrl(query) should return the API url for searching', () => {
    const getSearchUrl = helpers.getSearchUrl
    expect(getSearchUrl).to.be.defined;
    expect(getSearchUrl('The Beatles')).to.equal('https://api.spotify.com/v1/search?q=The%20Beatles&type=artist&limit=1&offset=0');
  });

  it('getSearchUrl(query, options) should allow searching for other types', () => {
    expect(helpers.getSearchUrl('Abbey Road', {type: 'album'})).to.equal('https://api.spotify.com/v1/search?q=Abbey%20Road&type=album&limit=1&offset=0');
  });

  it('getSearchUrl(query, options) should allow different limits', () => {
    expect(helpers.getSearchUrl('Abbey Road', {type: 'album', limit: 20})).to.equal('https://api.spotify.com/v1/search?q=Abbey%20Road&type=album&limit=20&offset=0')
  });

  it('getSearchUrl(query, options) should allow different offsets', () => {
    expect(helpers.getSearchUrl('Abbey Road', {type: 'album', offset: 20})).to.equal('https://api.spotify.com/v1/search?q=Abbey%20Road&type=album&limit=1&offset=20')
  });

  it('getTracksUrl(artistId) get API url for top tracks of an artist', () => {
    const beatles      = beatlesData.artists.items[0];
    const getTracksUrl = helpers.getTracksUrl;
    expect(getTracksUrl).to.be.defined;
    expect(getTracksUrl(beatles.id)).to.equal(`https://api.spotify.com/v1/artists/${beatles.id}/top-tracks?country=US`);
  });
  
  it('mergeTypeAndOptions(type, options) should return a new options object', () => {
    expect(helpers.mergeTypeAndOptions('album', {limit: 20, offset: 2})).to.deep.equal({limit: 20, offset: 2, type: 'album'})
  });

  it('getRequest(url) makes a request to the API and returns a promise', async () => {
    const response = await helpers.getRequest('https://api.spotify.com/v1/search?q=The%20Beatles&type=artist&limit=1&offset=0');
    expect(response).to.be.ok;
  });
});