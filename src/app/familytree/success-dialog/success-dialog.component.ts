import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import  {Router} from '@angular/router'

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.css'
})
export class SuccessDialogComponent {

  constructor(public dialogRef: MatDialogRef<SuccessDialogComponent>, private router:Router) {}

  closeDialog(): void {
    this.dialogRef.close();

    this.router.navigate(['/familytree'])
  }

 
}
