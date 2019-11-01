import { ValidationFieldError } from './validation-field-error';

describe('ValidationFieldError', () => {
  it('should create an instance', () => {
    expect(new ValidationFieldError()).toBeTruthy();
  });
});
