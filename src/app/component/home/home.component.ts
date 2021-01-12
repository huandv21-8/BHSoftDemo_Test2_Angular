import { Component, OnInit } from '@angular/core';
import {PostModel} from "../../dto/post-model";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts: Array<PostModel> = [];

  constructor(private postService: PostService) {
    this.postService.getAllPosts().subscribe(post => {
      this.posts = post;
      // console.log(post);
    });
  }

  ngOnInit(): void {
  }


}
