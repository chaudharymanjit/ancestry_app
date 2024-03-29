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

                    if (userData && userData.id) {
                        this.userId = userData.id;
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
    ngOnInit() {

        // Unlike components, services in Angular do not have lifecycle hooks like ngOnInit. If you are placing initialization code in ngOnInit inside your service, it won't be executed. Initialization in services is typically done in the constructor or in a method that is explicitly called from a component.        
    }

    getUserId(): string | null {

        return this.userId;
    }



    addMembers(data: membersData) {

        const userId = this.getUserId();

        if (userId !== null) {
            data.rootId = userId; 
        }
        return this.http.post('http://localhost:3000/members', data);
    }

    updateMember(data: membersData) {
        const url = `http://localhost:3000/members/${data.id}`;
        return this.http.put(url, data);
    }
}
