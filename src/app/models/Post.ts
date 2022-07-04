import { Comentario } from './Comentario';
import { User } from './identity/User';
import { UserUpdate } from './identity/UserUpdate';

export class Post {
    postId: number;
    titulo: string;
    corpo: string;
    imagemURL: string;
    tag1: string;
    tag2: string;
    dataPergunta: Date;
    like: number;
    status: boolean;
    userId: number;
    user: UserUpdate;
    comentarios: Comentario[];
}
