import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostModel} from "../dto/post-model";
import {CreatePostPayload} from "../dto/create-post.payload";

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8082/api/post/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8082/api/post/', postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8082/api/post/' + id);
  }

  getPostBySubreddit(id: number): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:8082/api/post/by-subreddit/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8082/api/post/by-user/' + name);
  }
}
