import { ValidationError } from './validation-error';

export class ValidationFieldError<T> extends ValidationError {

    // The corresponding data field for this validation error.
    fieldId: T;
}
