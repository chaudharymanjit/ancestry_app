import { HttpClient } from "@angular/common/http";
import { Injectable, Input, OnInit } from "@angular/core";
import { membersData } from "./membersDataType";
import { UserService } from "../sharedService.service";


@Injectable({
    providedIn: 'root'
})

export class familyService {

    email!: string
    userData: any

    @Input() signUpUser: Array<any> = [];

    userId!: string;


    constructor(private http: HttpClient, private userService: UserService) {
        


        const localData = localStorage.getItem('signUpUser');

        if (localData) {
            const signUpUser = JSON.parse(localData);
            const email = signUpUser[0].email;

            this.userService.fetchUserDataByEmail(email).subscribe(
                userData => {
                    console.log("Received userData:", userData); // Log the received userData

                    if (userData && userData._id) {
                        this.userId = userData._id;
                        console.log("UserId set to:", this.userId); // Log the set userId

                        this.addMembers(userData);
                    } else {
                        console.error("UserData is invalid or missing an ID");
                    }
                },
                error => {
                    console.error("Error fetching userData:", error); // Error handling
                }
            );
        }

    }
   
    

    getUserId(): string | null {

        console.log(this.userId,"huu")

        return this.userId;
    }



    addMembers(data: membersData) {
        const userId = this.getUserId();

        if (userId !== null) {
            data.rootId = userId;
            console.log(data.rootId, "jlihukggfcvhbj")
        }
        return this.http.post('https://ancestry-api.onrender.com/api/members', data);
    }

    updateMember(data: membersData) {
        const url = `https://ancestry-api.onrender.com/api/members/${data._id}`;
        return this.http.put(url, data);
    }
}
