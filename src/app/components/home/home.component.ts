import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private accountService: AccountService) { }

  ngOnInit() {
  }

  pergunta(){
    if (this.accountService.currentUser$ == null){
      this.router.navigateByUrl('user/login');
    }
    else{
      this.router.navigateByUrl('posts/lista');
    }
    
  }
}
