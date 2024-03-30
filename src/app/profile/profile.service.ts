import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { UserData } from "./userData-type";


@Injectable({
    providedIn: 'root'
})

export class profileService{

  @Input() signUpUser: Array<any> = [];

 constructor(private http:HttpClient){

 }

  addprofile(data:UserData){

    return this.http.post('https://ancestry-api.onrender.com/api/users', data);
   }

  profile(){
    return this.http.get('https://ancestry-api.onrender.com/api/users')
  }


}