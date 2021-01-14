import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {throwError} from "rxjs";
import {SubredditService} from "../../../service/subreddit.service";
import {SubredditModel} from "../../../dto/subreddit-response";
import {PostService} from "../../../service/post.service";
import {PostModel} from "../../../dto/post-model";

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.scss']
})
export class ViewSubredditComponent implements OnInit {

  subreddit: SubredditModel;
  idSub: number;
  posts: Array<PostModel> = [];

  constructor(private activateRoute: ActivatedRoute, private subredditService: SubredditService,private postService:PostService) {
    this.idSub = this.activateRoute.snapshot.params.id;

    this.postService.getPostBySubreddit(this.idSub).subscribe(post => {
      this.posts = post;
      console.log(post);
    });
  }

  ngOnInit(): void {
    console.log(this.idSub);
    this.subreddit = {
      name: '',
      description: ''
    }
    this.getSub();
  }

  private getSub() {
    this.subredditService.getSubredditById(this.idSub).subscribe(data => {
      this.subreddit = data;
      // console.log(data);
    }, error => {
      throwError(error);
    });
  }
}
