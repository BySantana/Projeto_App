import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/Post';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'app-post-detalhe',
  templateUrl: './post-detalhe.component.html',
  styleUrls: ['./post-detalhe.component.css']
})
export class PostDetalheComponent implements OnInit {

  novoPost: Post;
  form: FormGroup;
  ckeditorContent: string;
  file: File;
  postId: number;
  @ViewChild(CKEditorComponent) ckEditor: CKEditorComponent;


  constructor(private postService: PostService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.validation();
  }


  private validation(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.form = this.fb.group(
      {
        titulo: ['', Validators.required],
        corpo: ['', Validators.required],
        imagemURL: [''],
        tag1: ['', Validators.required],
        tag2: [''],
        dataPergunta: [this.obterDataAtual()],
        like: [0],
        status: ['false']
      },
      formOptions
    );
  }

  public criarPost() {
    this.novoPost = this.form.value;
    this.spinner.show();

    this.postService
      .post(this.novoPost)
      .subscribe(
        () => { this.toastr.success('Post criado', 'Sucesso')},
        (error) => {
          this.toastr.error(error.error);
          console.error(error);
        }
      )
      .add(() => this.spinner.hide());
  }

  public onSubmit() {
    this.criarPost();
    this.load();
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  get f(): any {
    return this.form.controls;
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

  public load(){
    location.reload();
    
  }
}
