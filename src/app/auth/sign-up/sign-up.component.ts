import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  {
  title = 'practice';


  constructor(private router:Router){}


  signUpUser: Array<any> = [];

  signUpObj:any={
    name:'',
    email: '',
    password: '',
  }
  
  signUp(){

    this.signUpUser.push(this.signUpObj);
    localStorage.setItem('signUpUser',JSON.stringify(this.signUpUser));

    this.signUpObj = {
      name:'',
      email: '',
      password: '',
      
    }

    alert("sign-up successfully")
    this.router.navigate(['/login'])

  }



  

   
  

}
