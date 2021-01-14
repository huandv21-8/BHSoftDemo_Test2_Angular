import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SubredditService} from "../../../service/subreddit.service";
import {SubredditModel} from '../../../dto/subreddit-response';
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-subreddit',
  templateUrl: './create-subreddit.component.html',
  styleUrls: ['./create-subreddit.component.scss']
})
export class CreateSubredditComponent implements OnInit {
  title: string;
  description: string;
  error: string;

  subreddit: SubredditModel;

  constructor(private router: Router, private subredditService: SubredditService) {
    this.subreddit = {
      name: '',
      description: ''
    };
  }

  ngOnInit(): void {
    this.error='';
  }

  // tslint:disable-next-line:typedef
  discard() {
    this.router.navigateByUrl('home');
  }

  // tslint:disable-next-line:typedef
  create() {
    // console.log(this.title);
    this.subreddit.name = this.title;
    this.subreddit.description = this.description;
    // console.log(this.subreddit);
    this.subredditService.createSubreddit(this.subreddit).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('/home');
    }, error => {
this.error = "Please enter all fields";
    });

  }

}
