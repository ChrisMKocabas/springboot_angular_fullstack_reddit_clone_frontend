import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubredditService } from '../subreddit.service';
import { PostService } from 'src/app/shared/post.service';
import { AuthService } from '../../auth/shared/auth.service';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-subreddit',
  templateUrl: './view-subreddit.component.html',
  styleUrls: ['./view-subreddit.component.css']
})
export class ViewSubredditComponent implements OnInit {
  subredditId: number=0;
  selectedSubreddit: any;
  posts: any[] = [];
  currentUser: string = '';

  // Font Awesome icons - You may need to import them
  faBell = faBell;
  faBellSlash = faBellSlash;
  faComments = faComments;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private subredditService: SubredditService,
    private postService: PostService
  ) { }

  ngOnInit() {
    // Get the subreddit ID from the route parameters
    this.route.params.subscribe(params => {
      this.subredditId = +params['id']; // Convert to number

      // Fetch the selected subreddit data
      this.subredditService.getSubreddit(this.subredditId).subscribe(
        (data) => {
          this.selectedSubreddit = data;
        },
        (error) => {
          console.error('Error fetching subreddit:', error);
        }
      );

      // Fetch posts associated with the selected subreddit
      this.postService.getPostsForSubreddit(this.subredditId).subscribe(
        (data) => {
          this.posts = data;
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
    });

    // Set the currentUser based on your authentication logic
    if (this.authService.isLoggedIn()) {
      this.currentUser = this.authService.getUserName();
    }
  }

  toggleNotifications(postId: number, newStatus: boolean): void {
    this.postService.toggleNotificationsForPost(postId, newStatus).subscribe({
      next: (response: boolean) => {
        // Update the notificationStatus of the post in the local array
        const postToUpdate = this.posts.find(post => post.id === postId);
        if (postToUpdate) {
          postToUpdate.notificationStatus = response;
        }
      },
      error: (error) => {
        console.error('Error toggling notifications:', error);
      }
    });
  }

  goToPost(postId: number): void {
    this.router.navigateByUrl('/view-post/' + postId);
  }
}
