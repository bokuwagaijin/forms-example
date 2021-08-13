import { Component, OnInit, VERSION } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
        start: [null, [Validators.required]],
        end: [null, [Validators.required]]
      })
    });

    const emailControl = this.formGroup.controls.email;
    this.emailError$ = emailControl.statusChanges.pipe(
      map(status => this.getErrorMessage(status, emailControl))
    );
    const dateRange = this.formGroup.controls.dateRange;
    this.dateRangeError$ = dateRange.statusChanges.pipe(
      map(status => this.getErrorMessage(status, dateRange))
    );
  }

  private getErrorMessage(status: string, control: AbstractControl): string | null {
    let errors!: string | null;
    if (status === 'VALID' || control.untouched || control.errors == null) {
      return null;
    }
    Object.keys(control.errors).forEach(key => {
      switch (key) {
        case 'email':
          errors = 'Please enter a valid email address';
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
