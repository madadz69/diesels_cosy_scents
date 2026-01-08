import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent implements OnInit {
  FormData!: FormGroup;

  constructor(private builder: FormBuilder) {}
  
  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    const { fullname, email, message } = this.FormData.value;
  }

  private buildForm(): void {
    this.FormData = this.builder.group({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    })
  }
}
