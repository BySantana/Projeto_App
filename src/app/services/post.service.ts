import { Post } from './../models/Post';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, take } from 'rxjs';

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
    return this.http.put(`${this.baseUrl}put/${model.postId}`, model);
  }

  public delete(userId: number) {
    return this.http.delete(`${this.baseUrl}delete/${userId}`);
  }

  postUpload(file: File, postId: number): Observable<Post> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<Post>(`${this.baseUrl}upload-image/${postId}`, formData)
      .pipe(take(1));
  }

  public getAllByTag(tag: string){
    return this.http.get(`${this.baseUrl}${tag}`)
  }

  public likeByPost(post: Post){
    return this.http.put(`${this.baseUrl}like/${post.postId}`, null)
  }

  public deslikeByPost(post: Post){
    return this.http.put(`${this.baseUrl}deslike/${post.postId}`, null)
  }
}
