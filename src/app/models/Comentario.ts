import { Interacao } from './Interacao';
import { UserUpdate } from './identity/UserUpdate';
import { Post } from "./Post";

export class Comentario {
    comentarioId: number;
    comentarioTexto: string;
    like: number;
    dataComentario: Date;
    postId: number;
    post: Post;
    interacoes: Interacao[];
    userId: number;
    user: UserUpdate;

}
