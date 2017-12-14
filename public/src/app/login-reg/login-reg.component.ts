import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {
  newUser:any = {name: "", email: "", password: "", passwordConfirm: ""};
  user: any = {email: "", password: ""};
  errors: any[];
  constructor(private _apiService: ApiService, private _router: Router) { }

  ngOnInit() {
  }
  register(){
  	this._apiService.addUser(this.newUser)
  	.subscribe((data:any)=>{
  		console.log("got response from server:", data);
  		if(data.errors != undefined){
  			console.log("validation errors");
  			this.errors = data;
  		}else{
  			console.log("added user, redirecting");
  			this._router.navigate(['/success']);
  		}
  	})
  }
  login(){
  	this._apiService.loginUser(this.user)
  	.subscribe((data:any)=>{
  		console.log("got response from server:", data);
  		if(data.errors != undefined){
  			console.log("validation errors");
  			this.errors = data;
  		}else{
  			console.log("logged in user, redirecting");
  			this._router.navigate(['/success']);
  		}
  	})
  }

}
