import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>(`${environment.API_BASE_URL}/posts`);
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post(`${environment.API_BASE_URL}/posts`, postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${environment.API_BASE_URL}/posts/` + id);
  }

  getAllPostsByUser(username: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${environment.API_BASE_URL}/posts/user/` + username);
  }

  toggleNotificationsForPost(id:number, newStatus: boolean): Observable<boolean>{
    return this.http.put<boolean>(`${environment.API_BASE_URL}/posts/toggle-notifications/` + id, newStatus)
  }

    // Fetch posts for a specific subreddit
    getPostsForSubreddit(subredditId: number): Observable<Array<PostModel>> {
      return this.http.get<Array<PostModel>>(`${environment.API_BASE_URL}/posts/subreddit-id/` + subredditId);
    }
}
