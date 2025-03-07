import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {passwordValidator} from '../shared/validators/password.validator'

import { Errors, User, UserService } from '../core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Errors = {errors: {}};
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // create form group using the form builder
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: '',
      password1:''
    },{validators:passwordValidator});
    // Optional: subscribe to changes on the form
    // this.settingsForm.valueChanges.subscribe(values => this.updateUser(values));
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.userService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }

  

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    // update the model
    this.updateUser(this.settingsForm.value);

    this.userService
    .update(this.user)
    .subscribe(
      updatedUser => this.router.navigateByUrl('/profile/' + updatedUser.username),
      err => {
        this.errors = err;
        console.log(this.errors);
        this.isSubmitting = false;
      }
    );
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
