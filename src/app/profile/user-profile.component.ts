import { Component, Input, OnInit } from '@angular/core';
import { UserData } from './userData-type';
import { profileService } from './profile.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { UserService } from '../sharedService.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})

export class UserProfileComponent implements OnInit {
  userName!: string
  email!: string

  @Input() signUpUser: Array<any> = [];

  constructor(private service: profileService,
    public dialog: MatDialog,  private sharedservice: UserService) {

  }

  ngOnInit(): void {
    const localData = localStorage.getItem('signUpUser');
    if(localData !=undefined){
      this.signUpUser=JSON.parse(localData)
      this.userName = this.signUpUser[0].name
      this.email = this.signUpUser[0].email
      // this.sharedservice.changeEmail(this.email); 
    }
  }


  openSuccessDialog(): void {

    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '450px', // Specify the width of the dialog
      height: '350px', // Specify the height of the dialog
    });

  }

  Add(data: UserData) {

    //  console.log(data);
    data.name = this.userName
    data.email = this.email
    

    this.service.addprofile(data).subscribe((result) => {
      console.log(result);

      //  if(result!=undefined){
      //   alert("your profile is created successfully")
      //  }
      //  else{
      //   alert("something wrong")
      //  }
    })



  }

 
 viewProfile() {



  }
}
