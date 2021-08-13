import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  public formGroup: FormGroup = this.formBuilder.group({
    email: [null, [Validators.email]]
  });

  constructor(private readonly formBuilder: FormBuilder) {}
}
