import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit {

  posts: Post[];
  alterar: boolean = false;
  form: FormGroup;
  postSelecionado: Post;
  id: number;
  ckeditorContent: string;
  postId: number;
  file: File;
  imagemURL = 'assets/img/upload.png'
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private activatedRouter: ActivatedRoute)
              
              { }

  ngOnInit() {
    this.validation();
    this.getAllByUser();
  }
  
  

  public getAllByUser(){
    this.postService.getAllByUser().subscribe(
      (response: Post[]) => {this.posts = response},
      (error) => { this.toastr.error(error) }
    )
  }

  public mostrarDetalhes(post: Post){
    this.alterar = true;
    this.postSelecionado = post;
    this.id = post.postId;
    this.form.patchValue(this.postSelecionado);
  }

  public voltar(){
    this.alterar = false;
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.form = this.fb.group(
      {
        postId: [''],
        titulo: ['', Validators.required],
        corpo: ['', Validators.required],
        imagemURL: [''],
        tag1: ['', Validators.required],
        dataPergunta: [this.obterDataAtual()] 
      },
      formOptions
    );
  }

  public obterDataAtual() {
    const date = new Date();

    const mes = date.getMonth() + 1;
    const dia = date.getDate();

    let mesValor = '';
    let diaValor = '';

    mesValor = ((mes < 10) ? '0' : '').concat(mes.toString())
    diaValor = ((dia < 10) ? '0' : '').concat(dia.toString())

    return diaValor.toString().concat('/').concat(mesValor).concat('/').concat('2022');
  }

  public atualizarPost(){
    this.postSelecionado = this.form.value;
    this.postSelecionado.postId = this.id;
    this.spinner.show();

    this.postService
    .put(this.postSelecionado)
    .subscribe(
      () => { this.toastr.success('Post atualizado', 'Sucesso'),
              this.getAllByUser(); },
      (error) => {
        this.toastr.error(error.error);
        console.error(error);
      }
    )
    .add(() => this.spinner.hide());
  }

  public onSubmit(): void {
    this.atualizarPost();
    this.alterar = false;
  }

  get f(): any {
    return this.form.controls;
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  uploadImagem(): void {
    this.postId = this.postSelecionado.postId;
    this.spinner.show();
    this.postService.postUpload(this.file, this.postId).subscribe(
      () => {
        this.toastr.success('Imagem atualizada com Sucesso', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao fazer upload de imagem', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

  selecionarPostParaExcluir(post: Post){
    this.postSelecionado = post;
  }

  excluirPost(){
    this.spinner.show();
    this.postService.delete(this.postSelecionado.postId).subscribe(
      () => { this.toastr.success('Post excluído com sucesso', 'Sucesso'),
              this.getAllByUser(); },
      (error: any) => {
        this.toastr.error('Post não excluído', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());

    
  }
}
