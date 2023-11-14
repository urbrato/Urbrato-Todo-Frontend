import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appMustMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MustMatchDirective,
      multi: true
    }
  ]
})
export class MustMatchDirective implements Validator {
  @Input('appMustMatch') mustMatch: string[] = [];

  validate(formGroup: FormGroup): ValidationErrors | null {
    return this.MustMatch(this.mustMatch[0], this.mustMatch[1])(formGroup);
  }

  MustMatch(controlName: string, matchingControlName: string): (formGroup: FormGroup) => null {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (control == null || matchingControl == null) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    }
  }
}
