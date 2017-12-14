import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private _apiService: ApiService) { }
  currentUser: any  = {};
  ngOnInit() {
  	this._apiService.getCurrentUser()
  	.subscribe((data)=>{
  		console.log("got current user from db:", data);
  		this.currentUser = data;
  	})
  }

}
