import { User } from './identity/User';
import { Comentario } from 'src/app/models/Comentario';


export class Interacao {
    interacaoId: number;
    interacaoTexto: string;
    dataInteracao: string;
    comentarioId: number;
    comentario: Comentario;
    userId: number;
    user: User;
}
