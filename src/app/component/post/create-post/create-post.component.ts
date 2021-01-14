import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreatePostPayload} from "../../../dto/create-post.payload";
import {SubredditModel} from "../../../dto/subreddit-response";
import {Router} from "@angular/router";
import {PostService} from "../../../service/post.service";
import {SubredditService} from "../../../service/subreddit.service";
import {throwError} from "rxjs";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;
  subreddits: Array<SubredditModel>;
  error: string;

  constructor(private router: Router, private postService: PostService, private subredditService: SubredditService) {
    this.postPayload = {
      postName: '',
      url: '',
      description: '',
      subredditName: ''
    }
  }

  ngOnInit() {
    this.error = '';
    this.createPostForm = new FormGroup({
      postName: new FormControl('', Validators.required),
      subredditName: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.subredditService.getAllSubreddits().subscribe((data) => {
      this.subreddits = data;
    }, error => {
      throwError(error);
    });
  }

  createPost() {
    this.postPayload.postName = this.createPostForm.get('postName').value;
    this.postPayload.subredditName = this.createPostForm.get('subredditName').value;
    this.postPayload.url = this.createPostForm.get('url').value;
    this.postPayload.description = this.createPostForm.get('description').value;

    console.log(this.postPayload);

    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('home');
    }, error => {
      this.error = "Please enter all fields";
    });
  }

  discardPost() {
    this.router.navigateByUrl('home');
  }

}
