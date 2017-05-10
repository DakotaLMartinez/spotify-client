import { expect }       from 'chai';
import apiUtils         from './apiUtils';
import error            from '../testData/error';

describe('apiUtils', () => {
  it('throws an error when we receive a failed response', () => {
    const shouldThrowError = () => {
      apiUtils.checkStatus(error);
    };
    expect(shouldThrowError).to.throw();
  })
});