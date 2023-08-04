import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubredditModel } from './subreddit-response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  [x: string]: any;
  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>(`${environment.API_BASE_URL}/subreddit`);
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>(`${environment.API_BASE_URL}/subreddit`,
      subredditModel);
  }

    // Fetch a single subreddit by its ID
    getSubreddit(subredditId: number): Observable<SubredditModel> {
      return this.http.get<SubredditModel>(`${environment.API_BASE_URL}/subreddit/` + subredditId);
    }
}
