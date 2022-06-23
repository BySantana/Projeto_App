import { ComentarioService } from './../../../services/comentario.service';
import { PostService } from './../../../services/post.service';
import { AccountService } from './../../../services/account.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserUpdate } from 'src/app/models/identity/UserUpdate';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/Post';
//import { UserUpdate } from '@app/models/identity/UserUpdate';
//import { AccountService } from '@app/services/account.service';
//import { environment } from '@environments/environment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  public usuario = {} as UserUpdate;
  public file: File;
  public imagemURL = '';
  public qtdPosts: number;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private accountService: AccountService,
    private postService: PostService,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit(): void {
    this.contarPosts();
  }

  public setFormValue(usuario: UserUpdate): void {
    this.usuario = usuario;
    if (this.usuario.imagemURL)
      this.imagemURL = environment.apiURL + `resources/perfil/${this.usuario.imagemURL}`;
    else
      this.imagemURL = './assets/img/perfil.png';

  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  private uploadImagem(): void {
    this.spinner.show();
    this.accountService
      .postUpload(this.file)
      .subscribe(
        () => this.toastr.success('Imagem atualizada com Sucesso', 'Sucesso!'),
        (error: any) => {
          this.toastr.error('Erro ao fazer upload de imagem','Erro!');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }

  contarPosts(){
    this.postService.getAllByUser().subscribe(
      (response: Post[]) => {this.qtdPosts = response.length}
    )
    // this.comentarioService.getAllByUser().subscribe(

    // )  
  }


}
