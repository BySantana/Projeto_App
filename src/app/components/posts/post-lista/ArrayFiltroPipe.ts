import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "src/app/models/Post";

@Pipe({
    name: 'arrayFiltro'
})
export class ArrayFiltroPipe implements PipeTransform {
    transform(value: Array<Post>, filtro: string) {
        if (filtro) {
            filtro = filtro.toUpperCase();

            return value.filter(a => a.titulo.toUpperCase().indexOf(filtro) >= 0 ||
                                     a.tag1.toUpperCase().indexOf(filtro) >= 0 
                                
            );
        } else{
            return value;
        }
    }
}
