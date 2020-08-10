export class ValidationError {

    fieldPath?: string;

    /**
     * Short ID for the validation error, e.g. UWE rule name.
     */
    msgId: string;

    /**
     * Full description of the validation problem.
     */
    msg?: string;

}
