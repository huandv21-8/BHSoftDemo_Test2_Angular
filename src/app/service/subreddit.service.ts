import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubredditModel} from '../dto/subreddit-response';
import {Observable} from 'rxjs';
import {PostModel} from "../dto/post-model";

@Injectable({
  providedIn: 'root'
})
export class SubredditService {

  constructor(private http: HttpClient) { }

  getAllSubreddits(): Observable<Array<SubredditModel>> {
    return this.http.get<Array<SubredditModel>>('http://localhost:8082/api/subreddit/');
  }

  createSubreddit(subredditModel: SubredditModel): Observable<SubredditModel> {
    return this.http.post<SubredditModel>('http://localhost:8082/api/subreddit/',
      subredditModel);
  }
  getSubredditById(id: number): Observable<SubredditModel> {
    return this.http.get<SubredditModel>('http://localhost:8082/api/subreddit/' + id);
  }
}
