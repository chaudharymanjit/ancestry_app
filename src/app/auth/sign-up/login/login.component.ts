import { Component,Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  constructor(private router: Router, private dialog:MatDialog) {}


  openSuccessDialog(): void {

    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '450px', // Specify the width of the dialog
      height: '350px', // Specify the height of the dialog
    });

  }



  @Input() signUpUser: Array<any> = [];
    loginObj:any = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUser');
    console.log(localData)
    if(localData !=undefined){
      this.signUpUser=JSON.parse(localData)

      console.log(this.signUpUser)
    }
    

}

 login(){

    const isUserExist= this.signUpUser.find(m => m.email==this.loginObj.email && m.password==this.loginObj.password);
      
    if(isUserExist!=undefined) {  
      
      // alert("user login successfully")
      this.openSuccessDialog()

      this.router.navigate(['/profile']);

    }
    
    else{
      alert("worg credential")
      this.router.navigate(['/login']);

    }
    

  }
  

}
