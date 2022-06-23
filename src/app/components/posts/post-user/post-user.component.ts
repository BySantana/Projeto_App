import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html',
  styleUrls: ['./post-user.component.css']
})
export class PostUserComponent implements OnInit {

  posts: Post[];
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.getAllByUser();
  }

  public getAllByUser(){
    this.postService.getAllByUser().subscribe(
      (response: Post[]) => {this.posts = response}
    )
  }
}
