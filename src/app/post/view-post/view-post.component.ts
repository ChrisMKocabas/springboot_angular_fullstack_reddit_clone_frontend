import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel = new PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[] =[];
  isLoggedIn: boolean;

  constructor(private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private authService:AuthService) {
    this.postId = this.activateRoute.snapshot.params['id'];
    this.isLoggedIn = this.authService.isLoggedIn();

    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      text: '',
      postId: this.postId,
      userName:'',
      duration: ''
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
  }

  postComment() {
    var commentTextControl = this.commentForm.get('text');
    if (commentTextControl !== null){
    this.commentPayload.text = commentTextControl.value;
    this.commentService.postComment(this.commentPayload).subscribe(data => {
      this.commentForm.get('text')?.setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(()=>error);
    })
  }
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(()=>error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(()=>error);
    });
  }

}
