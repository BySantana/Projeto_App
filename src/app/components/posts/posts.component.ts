import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public posts: Post[];
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.carregarPosts();
  }

  carregarPosts(){
    this.postService.getAllPosts().subscribe(
      (response: Post[]) => { this.posts = response}
    )
  }
  
}
