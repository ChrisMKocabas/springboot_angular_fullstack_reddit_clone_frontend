import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string = "";
  isError: boolean = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params['registered'] !== undefined && params['registered'] === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }

  login() {
    const passwordControl = this.loginForm.get('password');
    const usernameControl = this.loginForm.get('username');
    if (passwordControl !== null && usernameControl !== null) {
      this.loginRequestPayload.username = usernameControl.value;
      this.loginRequestPayload.password = passwordControl.value;

      this.authService.login(this.loginRequestPayload).subscribe(
        data => {
          this.isError = false;
          this.router.navigateByUrl('');
          this.toastr.success('Login Successful');
        },
        error => {
          this.isError = true;
          throwError(() => error);
        }
      );
    }
  }
}
