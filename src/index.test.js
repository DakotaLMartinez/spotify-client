import spotify from './index';
import { expect } from 'chai';

describe('Spotify', () => {
  describe('hi', () => {
    it('should say hello', () => {
      expect(spotify.hi).to.equal('hello');
    });
  })
})