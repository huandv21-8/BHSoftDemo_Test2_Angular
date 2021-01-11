import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username = '';

  // tslint:disable-next-line:typedef
  // sendUSername(even: string) {
  //   this.username = even;
  // }
}
