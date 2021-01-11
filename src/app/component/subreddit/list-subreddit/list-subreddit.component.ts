import {Component, OnInit} from '@angular/core';
import {SubredditModel} from '../../../dto/subreddit-response';
import {SubredditService} from '../../../service/subreddit.service';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-list-subreddit',
  templateUrl: './list-subreddit.component.html',
  styleUrls: ['./list-subreddit.component.scss']
})
export class ListSubredditComponent implements OnInit {

  subreddits: Array<SubredditModel>;

  constructor(private subredditService: SubredditService) {
  }

  ngOnInit() {
    this.subredditService.getAllSubreddits().subscribe(data => {
      this.subreddits = data;
      console.log('data : ' + data[0].name);
    }, error => {
      throwError(error);
    });
  }

}
