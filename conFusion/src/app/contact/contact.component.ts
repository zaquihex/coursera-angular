import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import {FeedbackService} from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  };

  loading: boolean;
  feedbackForm: FormGroup;
  formSubmitted: boolean;
  feedback: Feedback;
  contactType = ContactType;

  constructor(private fb: FormBuilder, private feedbackServide: FeedbackService) {
    this.createForm();
  }

  ngOnInit() {
    this.loading = false;
    this.formSubmitted = false;
  }

  createForm(): void {

    // old version
    /*this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));*/

    // Improvement

    // object: {
    //     'firstname': '',
    //     'lastname': '',
    //     'telnum': '',
    //     'email': ''
    //   }

    // Object.keys(object) -> ['firstname','lastname','telnum','email']

    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: ['', [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });


    const fieldsWithValidation = Object.keys(this.formErrors);
    ['firstname','lastname','telnum','email'].forEach( field => {
      this.feedbackForm.get(field).valueChanges.subscribe(valueField => {
        this.onFieldValueChanged(field, valueField);
      })
    })


    //this.onValueChanged(); // (re)set validation messages now
  }

  onFieldValueChanged(field: string,value: string) {
    this.formErrors[field] = '';
    const fieldElem = this.feedbackForm.get(field);
    if(fieldElem && fieldElem.dirty && !fieldElem.valid) {
      let messages = '';
      for(const error in fieldElem.errors) {
        messages += this.validationMessages[field][error] + '  ';
        // messages += this.validationMessages.firstName.minLength + '  ';
      }
      this.formErrors[field] = messages;
    }
  }

  /*onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }*/

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    this.loading = true;
    this.feedbackServide.postFeedback(this.feedback).subscribe(() => {
      this.loading = false;
      this.formSubmitted = true;
      setTimeout(()=>{
        this.feedbackForm.reset();
        this.formSubmitted = false;
      },5000);
    });


  }

}
