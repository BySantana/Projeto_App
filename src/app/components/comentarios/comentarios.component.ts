import { FormGroup, FormBuilder, AbstractControlOptions, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComentarioService } from './../../services/comentario.service';
import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/Comentario';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  comentarios: Comentario[];
  comentarioSelecionado: Comentario;
  mostrarDetalhes: boolean = false;
  form: FormGroup;
  id: number;
  idPost: number;

  constructor(private comentarioService: ComentarioService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.carregarComentarios();
    this.validation();
  }

  carregarComentarios() {
    this.comentarioService.getAllByUser().subscribe(
      (response: Comentario[]) => { this.comentarios = response; },
      (error) => { this.toastr.error(error) }
    )
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.form = this.fb.group(
      {
        comentarioId: [''],
        comentarioTexto: ['', Validators.required],
      },
      formOptions
    );
  }

  atualizarComentario(){
    this.comentarioSelecionado = this.form.value;
    this.comentarioSelecionado.comentarioId = this.id;
    this.comentarioSelecionado.postId = this.idPost;
    
    this.spinner.show();
    this.comentarioService.put(this.comentarioSelecionado).subscribe(
        () => { this.toastr.success('Comentario atualizado', 'Sucesso'),
                this.carregarComentarios(); },
      (error) => {
        this.toastr.error(error.error);
        console.error(error);
      }
    )
    .add(() => this.spinner.hide());
  }

  public onSubmit(){
    this.atualizarComentario();
    this.mostrarDetalhes = false;
  }

  mostrarDetalhesComentario(com: Comentario){
    this.mostrarDetalhes = true;
    this.comentarioSelecionado = com;
    this.id = com.comentarioId;
    this.idPost = com.postId;
    this.form.patchValue(this.comentarioSelecionado);
  }

  excluirComentario(){
    this.spinner.show();
    this.comentarioService.delete(this.comentarioSelecionado.comentarioId).subscribe(
      () => { this.toastr.success('Post excluído com sucesso', 'Sucesso'),
              this.carregarComentarios() },
      (error: any) => {
        this.toastr.error('Post não excluído', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

  selecionarComentario(com: Comentario){
    this.comentarioSelecionado = com;
  }

  get f(): any {
    return this.form.controls;
  }




}
