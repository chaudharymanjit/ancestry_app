import { Component, OnInit } from '@angular/core';
import { profileService } from '../profile.service';
import { UserData } from '../userData-type';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.css']
})
export class DisplayProfileComponent implements OnInit {

  users: UserData[] = [];
  user:any;
  userId = '5f2b'; 

  constructor(private service: profileService) {}

  ngOnInit(): void {
    this.service.profile().subscribe((data) => {
      this.users = data as UserData[];

      const findUser = this.users.find(user => user.id=== this.userId);
      console.log(findUser);


      if (findUser!=undefined) {
        this.user = {
          id:findUser.id,
          name: findUser.name,
          surname: findUser.surname,
          email: findUser.email,
          phone: findUser.phone,
          dob: new Date(findUser.dob), 
          birthCity: findUser.birthCity
        };
        // console.log(this.user)
      }

      else {
        alert("something wrong")
      }

    });
  }
}
