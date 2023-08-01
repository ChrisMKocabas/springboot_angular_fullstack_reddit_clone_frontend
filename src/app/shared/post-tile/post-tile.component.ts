import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/shared/auth.service';
import { faBell, faBellSlash } from '@fortawesome/free-solid-svg-icons';
import { PostService } from '../post.service';
@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {


  @Input() posts: PostModel[] | undefined;
  public currentUser: string =  '';
  faBell = faBell;
  faBellSlash = faBellSlash;
  faComments = faComments;

  constructor(private router: Router, private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.currentUser = this.authService.getUserName();
    }

  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

  toggleNotifications(id: number, newStatus: boolean): void {
    this.postService.toggleNotificationsForPost(id, newStatus).subscribe({
      next: (response: boolean) => {
        // Update the notificationStatus of the post in the local array
        const postToUpdate = this.posts?.find(post => post.id === id);
        if (postToUpdate) {
          postToUpdate.notificationStatus = response;
        }
      },
      error: (error) => {
        console.error('Error toggling notifications:', error);
      }
  });
  }
}
