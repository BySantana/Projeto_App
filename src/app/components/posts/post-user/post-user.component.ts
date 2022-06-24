import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit {

  image = '/src/images/IconAdicionar.png'
  posts: Post[];
  alterar: boolean = false;
  form: FormGroup;
  postSelecionado: Post;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService)
               { }

  ngOnInit() {
    this.validation();
    this.getAllByUser();
  }

  public getAllByUser(){
    this.postService.getAllByUser().subscribe(
      (response: Post[]) => {this.posts = response}
    )
  }

  public mostrarDetalhes(post: Post){
    this.alterar = true;
    this.postSelecionado = post;
    this.form.patchValue(this.postSelecionado);
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.form = this.fb.group(
      {
        postId: [''],
        titulo: ['', Validators.required],
        corpo: ['', Validators.required],
        imagemUrl: [''],
        tag1: ['', Validators.required],
        tag2: [''],
        dataPergunta: [new Date().getDate()],
      },
      formOptions
    );
  }

  public atualizarPost(){
    this.postSelecionado = this.form.value;
    this.spinner.show();

    this.postService
    .put(this.postSelecionado)
    .subscribe(
      () => this.toastr.success('Post atualizado', 'Sucesso'),
      (error) => {
        this.toastr.error(error.error);
        console.error(error);
      }
    )
    .add(() => this.spinner.hide());
  }

  public onSubmit(): void {
    this.atualizarPost();
  }

  get f(): any {
    return this.form.controls;
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  // carregarPost(){
  //   this.spinner.show();
  //   this.postService
      
  // }
}
