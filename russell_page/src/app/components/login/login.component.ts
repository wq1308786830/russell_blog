import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../services/common.service";
import {HttpErrorResponse} from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  recaptchaStatus: string = 'error';

  constructor(private common: CommonService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      user_name: [null, [Validators.required]],
      password: [null, [Validators.required]],
      is_person: [null, [Validators.required]],
      remember: [true],
    });
  }

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }

    this.common.login(this.validateForm.value).subscribe(data => {
      if (data.data.length) {
        this.router.navigate(['/index']);
      }
    }, (err: HttpErrorResponse) => {this.common.handleError(err)});
  }

  /**
   * google人机验证成功后的回调
   * @param {string} captchaResponse
   */
  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.recaptchaStatus = 'success';
    this.validateForm.patchValue({is_person: true});
  }
}
