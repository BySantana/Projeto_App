import { Comentario } from './../models/Comentario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  baseUrl = environment.apiURL +'api/Comentarios/';
  constructor(private http: HttpClient) { }

  public getAllComentariosByPostId(postId: number) {
    return this.http.get(`${this.baseUrl}comentarios/${postId}`);
  }

  public getAllByUser() {
    return this.http.get(this.baseUrl + 'comentarios/userId');
  }
  
  public post(model: Comentario) {
    return this.http.post(this.baseUrl, model);
  }

  public put(model: Comentario) {
    return this.http.put(`${this.baseUrl}${model.comentarioId}`, model);
  }

  public delete(userId: number) {
    return this.http.delete(`${this.baseUrl}${userId}`);
  }

}
