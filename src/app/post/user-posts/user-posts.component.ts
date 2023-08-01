import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { PostModel } from 'src/app/shared/post-model';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  posts: PostModel[] = [];
  userName: string ='';

  constructor(private postService: PostService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the username from the route parameters
    this.activatedRoute.params.subscribe(params => {
      this.userName = params['name'];
      this.getUserPosts();
    });
  }

  getUserPosts() {
    this.postService.getAllPostsByUser(this.userName).subscribe(
      data => {
        this.posts = data;
      },
      error => {
        throwError(() => error);
      }
    );
  }
}
