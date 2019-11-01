import { ValidationFieldError } from './validation-field-error';

import { ValidationError } from './validation-error';

export class ValidationResult<T> {

    fieldErrors?: Array<ValidationFieldError<T>>;

    // Any errors, which are NOT associated with a single form field.
    globalErrors?: Array<ValidationError>;

}
