import { Component, OnInit, VERSION } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { merge, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  public formGroup: FormGroup;
  public emailError$: Observable<string | null>;
  public dateRangeError$: Observable<string | null>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      dateRange: this.formBuilder.group({
        start: [null],
        end: [null]
      })
    });

    const emailControl = this.formGroup.controls.email;
    this.emailError$ = merge(of(this.getErrorMessage(emailControl.status, emailControl)), emailControl.statusChanges.pipe(
      map(status => this.getErrorMessage(status, emailControl))
    ));
    const dateRange = this.formGroup.controls.dateRange;
    this.dateRangeError$ = dateRange.statusChanges.pipe(
      map(status => this.getErrorMessage(status, dateRange))
    );
    this.formGroup.updateValueAndValidity();
  }

  private getErrorMessage(status: string, control: AbstractControl): string | null {
    let errors!: string | null;
    if (status === 'VALID' || control.errors == null) {
      return null;
    }
    Object.keys(control.errors).forEach(key => {
      switch (key) {
        case 'email':
          errors = 'Please enter a valid email address';
          break;
        case 'required':
          errors = 'This field is required';
          break;
        case 'matStartDateInvalid':
          errors = 'The start date is invalid';
          break;
        default:
          break;
      }
    });
    return errors;
  }
}
