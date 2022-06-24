import { ComentarioService } from './../../services/comentario.service';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/Comentario';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarios: Comentario[];
  constructor(private comentarioService: ComentarioService) { }

  ngOnInit() {
    this.carregarComentarios();
  }

  carregarComentarios() {
    this.comentarioService.getAllByUser().subscribe(
      (response: Comentario[]) => { this.comentarios = response; }
    )
  }
}
