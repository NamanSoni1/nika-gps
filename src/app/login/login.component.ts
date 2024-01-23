import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading!:boolean;

  constructor(private router: Router) { 
    if(localStorage.getItem('user') != null){
      this.router.navigate(['/map'])
    }
  }

  ngOnInit(): void {
  }

  login() {
    this.loading = true;
    localStorage.setItem('user','token');
    setTimeout(() => {
      this.router.navigate(['/map'])
      this.loading = false;
    }, 2000);
  }

}
