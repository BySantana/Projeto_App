import { UserUpdate } from './identity/UserUpdate';
import { Post } from "./Post";

export class Comentario {
    comentarioId: number;
    comentarioTexto: string;
    like: number;
    dataComentario: Date;
    postId: number;
    post: Post;
    userId: number;
    user: UserUpdate;

}
