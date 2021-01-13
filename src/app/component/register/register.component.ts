import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RegisterRequestPayload} from '../../dto/register-request.payload';
import {AuthServiceService} from '../../service/auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerRequest: RegisterRequestPayload;

  email?: string;
  username?: string;
  password?: string;
  mess: boolean;

  constructor(private router: Router, private auth: AuthServiceService,private toastr: ToastrService) {
    this.registerRequest = {
      username: '',
      email: '',
      password: ''
    };
  }


  ngOnInit(): void {
    this.mess = true;
  }

  // tslint:disable-next-line:typedef
  movedOnLogin() {
    this.router.navigateByUrl('login');
    // this.router.navigateByUrl('login');
  }

  // tslint:disable-next-line:typedef
  register() {
    if (this.username == null &&this.password == null && this.email ==null) {
      this.mess = false;
    }
    if (this.mess) {
      if (this.username != null) {
        this.registerRequest.username = this.username;
      }
      if (this.password != null) {
        this.registerRequest.password = this.password;
      }
      if (this.email != null) {
        this.registerRequest.email = this.email;
      }

      this.auth.signup(this.registerRequest).subscribe(data => {
        this.router.navigate(['/login']);
        // console.log(data);
        this.toastr.error('Registration success! Please try again');
      }, error => {
        // console.log(error);
        this.toastr.error('Registration Failed! Please try again');
      });
    }
  }
}
