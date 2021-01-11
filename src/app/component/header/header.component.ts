import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {AuthServiceService} from '../../service/auth-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  isLoggedIn?: boolean;
  username?: string;

  constructor(private auth: AuthServiceService, private router: Router) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.username = this.auth.getUsername();
    this.isLoggedIn = this.auth.checkLogin();
  }

  ngAfterViewChecked(): void {
    this.isLoggedIn = this.auth.checkLogin();
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    console.log('logout: ' + this.isLoggedIn);
    // this.username = '';
  }

  // tslint:disable-next-line:typedef
  profile() {
    this.router.navigateByUrl('/user-profile/' + this.username);
  }


}
