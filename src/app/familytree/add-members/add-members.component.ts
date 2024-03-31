import { Component, Input, OnInit } from '@angular/core';
import { membersData } from '../membersDataType';
import { familyService } from '../family.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { HttpClient } from "@angular/common/http";
import { UserService } from '../../sharedService.service';



@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {
  formData!: membersData;
 
  constructor(private http: HttpClient, private service: familyService, public dialog: MatDialog,private userService: UserService) {

  }

  ngOnInit(): void {

    this.formData = {
      _id:'',
      name: 'Ranjeet',
      surname: 'Chaudhary',
      email: '',
      phone: '9939863254',
      dob: new Date().toISOString().substring(0, 10),
      birthCity: 'Gopalganj',
      Address: 'barauli,Gopalganj',
      relationship: 'Brother'
    };
  }



  openSuccessDialog(): void {

    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '450px', // Specify the width of the dialog
      height: '350px', // Specify the height of the dialog
    });

  }


  Done(data: membersData) {

    this.service.addMembers(data).subscribe((result) => {
      console.log(result)
    })


  }
}
