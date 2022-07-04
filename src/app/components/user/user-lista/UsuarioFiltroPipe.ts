import { Pipe } from '@angular/core';
import { UserUpdate } from './../../../models/identity/UserUpdate';

@Pipe({
    name: 'filtroUsuario'
})
export class UsuarioFiltroPiepe {
    transform(value: Array<UserUpdate>, filtro: string) {
        if (filtro) {
            filtro = filtro.toUpperCase();

            return value.filter(a => a.userName.toUpperCase().indexOf(filtro) >= 0                   
            );
        } else{
            return value;
        }
    }
}
