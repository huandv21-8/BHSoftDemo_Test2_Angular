import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginRequestPayload} from '../../dto/login-request.payload';
import {AuthServiceService} from '../../service/auth-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequestPayload;

  // tslint:disable-next-line:no-output-rename
  // @Output('username') sendUsername = new EventEmitter<string>();

  username: string;
  password: string;
  mess: boolean;
  error: string;

  constructor(private router: Router, private auth: AuthServiceService, private toastr: ToastrService) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.mess = true;
    this.error = '';
  }

  // tslint:disable-next-line:typedef
  login() {
    if (this.username == null && this.password == null) {
      this.mess = false;
    }
    if (this.mess) {
      this.loginRequest.username = this.username;
      this.loginRequest.password = this.password;

      // console.log(this.loginRequest);
      this.auth.login(this.loginRequest).subscribe(data => {
        this.router.navigateByUrl('');
        this.toastr.error('login success');
        console.log('dang nhap thang cong:');
      }, error => {
        // console.log('loi roi');
        // this.mess = false;
        this.error = 'login Failed! Please try again';
        // this.toastr.error('login Failed! Please try again');
      });
    }

  }

  // tslint:disable-next-line:typedef
  movedOnRegister() {
    this.router.navigateByUrl('register');
  }
}
