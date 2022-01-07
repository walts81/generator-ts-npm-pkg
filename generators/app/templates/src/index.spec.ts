import { expect } from 'chai';
import 'mocha';
import { myFunction } from './index';

describe('myFunction', () => {
  it('should return "Hello World!"', () => {
    const result = myFunction();
    expect(result).to.eq('Hello World!');
  });
});
