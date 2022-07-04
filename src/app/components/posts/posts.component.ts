import { Router } from '@angular/router';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public titulo = 'Publicações';
  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {

  }

  

  

}
