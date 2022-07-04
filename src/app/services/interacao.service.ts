import { Interacao } from './../models/Interacao';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InteracaoService {

  baseUrl = environment.apiURL +'api/Interacoes/';
  constructor(private http: HttpClient) { }

  public getAllInteracoesByComentario(comentarioId: number){
    return this.http.get(`${this.baseUrl}comentario/${comentarioId}`);
  }
  
  public post(model: Interacao, comentarioId) {
    return this.http.post(this.baseUrl+comentarioId, model);
  }

  public put(model: Interacao) {
    return this.http.put(`${this.baseUrl}${model.interacaoId}`, model);
  }

  public delete(interacaoId: number) {
    return this.http.delete(`${this.baseUrl}${interacaoId}`);
  }
}

