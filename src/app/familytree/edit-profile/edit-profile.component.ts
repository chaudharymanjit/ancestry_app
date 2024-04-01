import { Component, OnInit } from '@angular/core';
import { membersData } from '../membersDataType';
import { familyService } from '../family.service';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { FamilyService } from '../tree/tree.component';

@Component({
  selector: 'app-add-members',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  formData!: membersData;

  constructor(private service: familyService, private familyService: FamilyService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const memberToEdit = this.familyService.getMemberToEdit();
    if (memberToEdit) {
      this.formData = {
        ...memberToEdit,
        dob: memberToEdit.dob ? new Date(memberToEdit.dob).toISOString().substring(0, 10) : '',
        rootId: memberToEdit.rootId ? memberToEdit.rootId._id : undefined  // Extract the _id from rootId if it's an object
      };
    }
  }
  



  openSuccessDialog(): void {

    const dialogRef = this.dialog.open(SuccessDialogComponent, {
      width: '450px', // Specify the width of the dialog
      height: '350px', // Specify the height of the dialog
    });

  }


  Done(data: membersData) {
    this.service.updateMember(this.formData).subscribe({
      next: (response) => {
          console.log('Member updated', response);
      },
      error: (error) => {
          console.error('Error updating member', error);
      }
  });
  }
}