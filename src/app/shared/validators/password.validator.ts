import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

    var password1 = control.get('password').value;
    var password2 = control.get('password1').value;
    if(password1 !== password2 ){
      return { notMatched: true};
    }
    return null;
}