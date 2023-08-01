import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  [x: string]: any;
  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>('http://localhost:8080/api/v1/subreddit');
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>('http://localhost:8080/api/v1/subreddit',
      subredditModel);
  }

    // Fetch a single subreddit by its ID
    getSubreddit(subredditId: number): Observable<SubredditModel> {
      return this.http.get<SubredditModel>('http://localhost:8080/api/v1/subreddit/' + subredditId);
    }
}
