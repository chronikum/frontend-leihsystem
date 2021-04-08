import { AbstractControl, ValidatorFn } from "@angular/forms";
import { parsePhoneNumber, parsePhoneNumberWithError } from "libphonenumber-js";

/**
 * Checks for validity of phone numbers. Currently only checking if a number is a german one.
 */
export function phoneNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (control.value) {
            try {
                let val = control.value;
                const phoneInstance = parsePhoneNumberWithError(val, 'GE');
                // Is germany
                const countryValid = phoneInstance.countryCallingCode === '49';
                return (phoneInstance.isValid() && countryValid) ? null : { success: false };
            } catch (error) {
                return { success: false }
            }
        } else {
            return { success: false }
        }
    };
}
