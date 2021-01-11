import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginRequestPayload} from '../../dto/login-request.payload';
import {AuthServiceService} from '../../service/auth-service.service';
// import {EventEmitter} from 'events';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginRequest: LoginRequestPayload;

  // tslint:disable-next-line:no-output-rename
  // @Output('username') sendUsername = new EventEmitter<string>();

  username?: string;
  password?: string;

  constructor(private router: Router, private auth: AuthServiceService) {
    this.loginRequest = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  login() {
    if (this.username != null && this.password != null) {
      this.loginRequest.username = this.username;
      this.loginRequest.password = this.password;
    }
    // console.log(this.loginRequest);
    this.auth.login(this.loginRequest).subscribe(data => {
      this.router.navigateByUrl('');
      // this.sendUsername.emit(this.username);

      console.log('dang nhap thang cong:' );
    }, error => {
      console.log('loi roi');
    });


  }

  // tslint:disable-next-line:typedef
  movedOnRegister() {
    this.router.navigateByUrl('register');
  }
}
