import { Component, OnInit } from '@angular/core';
import {SubredditModel} from '../../../dto/subreddit-response';
import {SubredditService} from '../../../service/subreddit.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-subreddit-side-bar',
  templateUrl: './subreddit-side-bar.component.html',
  styleUrls: ['./subreddit-side-bar.component.scss']
})
export class SubredditSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService,private router:Router) {
    this.subredditService.getAllSubreddits().subscribe(data => {
      if (data.length > 3) {
        this.subreddits = data.splice( 0,3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }
  viewSubreddit(id: number) {
    this.router.navigateByUrl("view-subreddit/" + id);
  }

  ngOnInit(): void { }
}
