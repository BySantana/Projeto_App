import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Post } from './../../models/Post';
import { PostService } from 'src/app/services/post.service';
import { Component, OnInit } from '@angular/core';
import { distinct } from 'rxjs';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tags: string[];
  posts: Post[];
  mostrarPosts: boolean = false;
  

  constructor(private postService: PostService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllTags();
  }

  public getAllTags(){
    this.postService.getAllPosts()
    .subscribe(
      (response: Post[]) => { this.tags = response.map(i => i.tag1)
        .filter((value, index, self) => self.indexOf(value) === index)
      }
    )
  }

  public getPostsByTags(tag: string){
    this.spinner.show();

    this.postService.getAllByTag(tag).subscribe(
      (response: Post[]) => { this.posts = response },
      (error) => { this.toastr.error(error.message, 'Error') }

    ).add(() => this.spinner.hide())

    this.mostrarPosts = true;
  }

}
