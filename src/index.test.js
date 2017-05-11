import { expect }       from 'chai';
import fetchMock        from 'fetch-mock';
import Spotify          from './index';
import helpers          from './helpers';
import beatlesData      from '../testData/beatles';
import beatlesTracks    from '../testData/beatlesTracks';
import abbeyRoadData    from '../testData/abbeyRoad';
import comeTogetherData from '../testData/comeTogether';


describe('Spotify', () => {

    describe('API calls', () => {
      afterEach(() => {
        fetchMock.restore();
      });

      it('findArtist(query) makes a request to the spotify API to get artist data', async () => {
        fetchMock.get('https://api.spotify.com/v1/search?q=The%20Beatles&type=artist&limit=1&offset=0', beatlesData);
        const beatles  = beatlesData.artists.items[0];
        const findArtist = Spotify.findArtist;
        const response = await findArtist('The Beatles');
        expect(response.artists.items[0]).to.deep.equal(beatles);
      });

      it('findArtist(query) response should be ok', async () => {
        const response = await Spotify.findArtist('The Beatles');
        expect(response).to.be.ok;
      });

      it('findAlbum(query) makes a request to get album data', async () => {
        fetchMock.get('https://api.spotify.com/v1/search?q=Abbey%20Road&type=album&limit=1&offset=0', abbeyRoadData);
        const abbeyRoad = abbeyRoadData.albums.items[0];
        const response = await Spotify.findAlbum('Abbey Road');
        expect(response.albums.items[0]).to.deep.equal(abbeyRoad);
      }); 

      it('findAlbum(query) response should be ok', async () => {
        const response = await Spotify.findAlbum('Abbey Road');
        expect(response).to.be.ok;
      });
      
      it('findTrack(query) makes a request to get track data', async () => {
        fetchMock.get('https://api.spotify.com/v1/search?q=Come%20Together&type=track&limit=1&offset=0', comeTogetherData);
        const comeTogether = comeTogetherData.tracks.items[0];
        const response = await Spotify.findTrack('Come Together');
        expect(response.tracks.items[0]).to.deep.equal(comeTogether);
      });

      it('findTrack(query) response should be ok', async () => {
        const response = await Spotify.findTrack('Come Together');
        expect(response).to.be.ok;
      });

      it('getTracks(artistId) makes a request to get an artists top tracks', async () => {
        fetchMock.get('https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2/top-tracks?country=US', beatlesTracks);
        const hereComesTheSun = beatlesTracks.tracks[0];
        const response = await Spotify.getTracks('3WrFJ7ztbogyGnTHbHJFl2');
        expect(response.tracks[0]).to.deep.equal(hereComesTheSun);
      });

      it('getTracks(artistId) response should be ok', async () => {
        const response = await Spotify.getTracks('3WrFJ7ztbogyGnTHbHJFl2');
        expect(response).to.be.ok;
      });

      it('getTracks(artistId) makes a request to get an artists top tracks', async () => {
        fetchMock.get('https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2/top-tracks?country=SE', beatlesTracks);
        const hereComesTheSun = beatlesTracks.tracks[0];
        const response = await Spotify.getTracks('3WrFJ7ztbogyGnTHbHJFl2', 'SE');
        expect(response.tracks[0]).to.deep.equal(hereComesTheSun);
      });

    });
    
    
});