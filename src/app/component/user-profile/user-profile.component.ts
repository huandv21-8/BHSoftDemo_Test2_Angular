import {Component, OnInit} from '@angular/core';
import {PostModel} from "../../dto/post-model";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../service/post.service";
import {CommentPayload} from "../../dto/comment.payload";
import {CommentService} from "../../service/comment.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  name: string;
  posts: PostModel[];
  comments: CommentPayload[];
  postLength: number;
  commentLength: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService, private commentService: CommentService) {
    this.name = this.activatedRoute.snapshot.params.name;

    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
      console.log(data[0].userName);
      console.log(data.length);

    });
  }

  ngOnInit(): void {
  }
}
