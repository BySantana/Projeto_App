import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Interacao } from './../../../models/Interacao';
import { Comentario } from './../../../models/Comentario';
import { InteracaoService } from './../../../services/interacao.service';
import { ComentarioService } from './../../../services/comentario.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { debounceTime, fromEvent } from 'rxjs';


@Component({
  selector: 'app-post-lista',
  templateUrl: './post-lista.component.html',
  styleUrls: ['./post-lista.component.css']
})
export class PostListaComponent implements OnInit, AfterViewInit {
  
  postsFiltrados: any = [];
  paginaAtual: number = 1;
  contador: number = 5;

  posts: Post[];
  qtdComentarios: number;
  _filtroLista: string = '';
  postSelecionado: Post;
  detalhePost: boolean = false;
  interacaoLista: Interacao[];
  detalheInteracao: boolean = false;
  novoComent: Comentario;
  novaInteracao: Interacao;
  respostaBool: boolean = false;
  likes: number;

  formResposta: FormGroup;
  formInteracao: FormGroup;

  campoInteragir: boolean = false;
  comentarioSelecionado: Comentario;


  @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;

  constructor(private postService: PostService,
    private comentarioService: ComentarioService,
    private interacaoService: InteracaoService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,) { }

  ngAfterViewInit(): void {
    fromEvent(this.campoBusca.nativeElement, 'keyup')
      .pipe(
        debounceTime(0)
      )
      .subscribe((e: Event) => {
        const target = e.target as HTMLInputElement;
        this._filtroLista = target.value;
      });
  }

  ngOnInit() {
    this.carregarPosts();
    this.validation();
    this.validationInteracao();
  }




  carregarPosts() {
    this.spinner.show()
    this.postService.getAllPosts().subscribe(
      (response: Post[]) => {
        this.posts = response;
        this.postsFiltrados = this.posts;
        this.toastr.info('Posts Carregados');
      },
      (error) => { console.log(error) }
    ).add(() => this.spinner.hide());
  }

  entrarNoPost(post: Post) {
    this.postSelecionado = post;
    this.detalhePost = true;
  }

  voltarParaLista() {
    this.detalhePost = false;
    this.interacaoLista = null;
    this.respostaBool = false;
    this.detalheInteracao = false;
    this.campoInteragir = false;
    this.carregarPosts();
  }

  carregarInteracoes(comentario: Comentario) {
   
    this.interacaoLista = null;
    this.interacaoService.getAllInteracoesByComentario(comentario.comentarioId).subscribe(
      (response: Interacao[]) => { this.interacaoLista = response 
        this.mostrarInteracoes(comentario)}
    ).add(() => this.spinner.hide())
    
  }

  mostrarInteracoes(com: Comentario) {
    this.comentarioSelecionado = com;
    this.detalheInteracao = true;
  }

  mostrarCampoParaInteragir(){
    this.campoInteragir = true;
  }

  mostrarCampoResposta() {
    this.formInteracao = null;
    this.respostaBool = !this.respostaBool;
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.formResposta = this.fb.group(
      {
        comentarioTexto: ['', Validators.required],
        dataComentario: [this.obterDataAtual()],
        like: [0]
      },
      formOptions
    );
  }

  private validationInteracao(): void {
    const formOptions: AbstractControlOptions = {
    };

    this.formInteracao = this.fb.group(
      {
        interacaoTexto: ['', Validators.required],
        dataInteracao: [this.obterDataAtual()],
      },
      formOptions
    );
  }

  get f(): any {
    return this.formResposta.controls;
  }

  get f2(): any {
    return this.formInteracao.controls;
  }

  public adicionarComentario() {
    this.spinner.show();
    this.respostaBool = false;
    this.novoComent = this.formResposta.value;

    this.comentarioService
      .post(this.postSelecionado.postId, this.novoComent)
      .subscribe(
        () => { this.toastr.success('Comentario adicionado', 'Sucesso'),
        this.carregarPosts();
        
        },
        (error) => {
          this.toastr.error(error.error);
          console.error(error);
        }
      )
      .add(() => this.spinner.hide()); 
      this.carregarPosts();
      this.entrarNoPost(this.postSelecionado);
      
  }

  public adicionarInteracao(comentarioId: number) {
    this.spinner.show();
    this.novaInteracao = this.formInteracao.value;

    this.interacaoService.post(this.novaInteracao, comentarioId).subscribe(
      () => { this.toastr.success('Interacao adicionada', 'Sucesso'),
              this.carregarInteracoes(this.comentarioSelecionado) },
      (error) => {
        this.toastr.error(error.error);
        console.error(error);
      }
    )
    .add(() => this.spinner.hide());

    
  }

  public submitResposta() {
    this.adicionarComentario();
    this.load();
  }

  public submitInteracao(){
    this.adicionarInteracao(this.comentarioSelecionado.comentarioId);
    this.campoInteragir = false;
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

  public aumentarLikes(post: Post){
    post.like ++;
    this.postService.likeByPost(post).subscribe(
      (response) => { console.log(response) },
      (error) => { console.log(error) }
    )
  }

  public diminuirLikes(post: Post){
    post.like --;
    this.postService.deslikeByPost(post).subscribe(
      (response) => { console.log(response) },
      (error) => { console.log(error) }
    )
  }
}
