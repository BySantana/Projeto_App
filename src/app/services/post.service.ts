import { Post } from './../models/Post';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = environment.apiURL +'api/Posts/';
  constructor(private http: HttpClient) { }

  public getAllPosts() {
    return this.http.get(this.baseUrl);
  }

  public getAllByUser() {
    return this.http.get(this.baseUrl + 'post/user');
  }
  
  public post(model: Post) {
    return this.http.post(this.baseUrl, model);
  }

  public put(model: Post) {
    return this.http.put(`${this.baseUrl}${model.postId}`, model);
  }

  public delete(userId: number) {
    return this.http.delete(`${this.baseUrl}${userId}`);
  }
}
