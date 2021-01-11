import {Component, OnInit} from '@angular/core';
import {throwError} from 'rxjs';
import {PostModel} from '../../../dto/post-model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentPayload} from '../../../dto/comment.payload';
import {CommentService} from '../../../service/comment.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {


  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
              private router: Router, private commentService: CommentService) {
    this.postId = this.activateRoute.snapshot.params.id;

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentPayload.text = this.commentForm.get('text').value;
    console.log(this.commentPayload);
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  // tslint:disable-next-line:typedef
  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {

      this.post = data;
      // console.log(data);
    }, error => {
      throwError(error);
    });
  }

  // tslint:disable-next-line:typedef
  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
      // console.log(data[0]);
    }, error => {
      throwError(error);
    });
  }

}
