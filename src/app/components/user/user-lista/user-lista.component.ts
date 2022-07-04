import { environment } from './../../../../environments/environment';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserUpdate } from 'src/app/models/identity/UserUpdate';
import { AccountService } from 'src/app/services/account.service';
import { debounceTime, fromEvent } from 'rxjs';

@Component({
  selector: 'app-user-lista',
  templateUrl: './user-lista.component.html',
  styleUrls: ['./user-lista.component.css']
})
export class UserListaComponent implements OnInit {

  imagemUrl: string = environment.apiURL+'resources/Perfil/';
  users: UserUpdate[];
  public _filtroLista: string = '';

  @ViewChild('campoBusca') campoBusca: ElementRef<HTMLInputElement>;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.carregarUsers();
  }

  ngAfterViewInit(): void {
    fromEvent(this.campoBusca.nativeElement, 'keyup')
       .pipe(
         // Deixei um intervalo bem alto (2s)
         // para ficar bem claro na animação.
         debounceTime(0)
       )
       .subscribe((e: Event) => {
         const target = e.target as HTMLInputElement;
         this._filtroLista = target.value;
       });
   }

  carregarUsers(){
    this.accountService.getAllUsers().subscribe(
      (response) => { this.users = response}
    )
  }

}
