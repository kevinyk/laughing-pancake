import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private _http: HttpClient) { }
  addUser(userObj){
  	return this._http.post('/users', userObj);
  }
  getCurrentUser(){
  	return this._http.get('/users/current');
  }
  loginUser(userObj){
  	return this._http.post('/login', userObj);
  }
}
