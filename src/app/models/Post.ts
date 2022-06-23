import { Comentario } from './Comentario';
import { User } from './identity/User';
import { UserUpdate } from './identity/UserUpdate';

export class Post {
    postId: number;
    titulo: string;
    corpo: string;
    imagemUrl: string;
    tags: string[];
    dataPergunta: Date;
    status: boolean;
    userId: number;
    user: User;
    comentarios: Comentario[];
}
