import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../../dto/post-model';
import {VotePayload} from '../../../dto/vote-payload';
import {VoteService} from '../../../service/vote.service';
import {AuthServiceService} from '../../../service/auth-service.service';
import {PostService} from '../../../service/post.service';
import {ToastrService} from 'ngx-toastr';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import {VoteType} from '../../../dto/vote-type';
import {throwError} from 'rxjs';


@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.scss']
})
export class VoteButtonComponent implements OnInit {


  @Input() post: PostModel;
  votePayload: VotePayload;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;

  constructor(private voteService: VoteService,
              private authService: AuthServiceService,
              private postService: PostService, private toastr: ToastrService) {
    // console.log(PostModel);

    this.votePayload = {
      voteType: undefined,
      postId: undefined
    };
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  ngOnInit(): void {
    // this.updateVoteDetails();
  }

  // tslint:disable-next-line:typedef
  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  // tslint:disable-next-line:typedef
  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  // tslint:disable-next-line:typedef
  private vote() {
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  // tslint:disable-next-line:typedef
  private updateVoteDetails() {
    if (this.post.id == null) {
      this.postService.getPost(this.post.id).subscribe(post => {
        this.post = post;
      });
    }
  }
}
