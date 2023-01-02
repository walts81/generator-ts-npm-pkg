import { expect } from 'chai';
import 'mocha';
import { getGreeting } from './index';

describe('getGreeting', () => {
  it('should return "Hello World!"', () => {
    const result = getGreeting();
    expect(result).to.eq('Hello World!');
  });
});
