import { RadioConfig } from './radio-config';

describe('RadioConfig', () => {
  it('should create an instance', () => {
    expect(new RadioConfig('myName', true, null)).toBeTruthy();
  });
});
