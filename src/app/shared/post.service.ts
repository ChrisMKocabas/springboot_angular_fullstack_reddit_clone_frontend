import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/v1/posts');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/posts', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/v1/posts/' + id);
  }

  getAllPostsByUser(username: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/v1/posts/user/' + username);
  }

  toggleNotificationsForPost(id:number, newStatus: boolean): Observable<boolean>{
    return this.http.put<boolean>('http://localhost:8080/api/v1/posts/toggle-notifications/' + id, newStatus)
  }

    // Fetch posts for a specific subreddit
    getPostsForSubreddit(subredditId: number): Observable<Array<PostModel>> {
      return this.http.get<Array<PostModel>>('http://localhost:8080/api/v1/posts/subreddit-id/' + subredditId);
    }
}
