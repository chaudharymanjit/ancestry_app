import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FamilyMember } from './tree'; // Ensure this is the correct path to your FamilyMember interface
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { familyService } from '../family.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class TreeComponent implements OnInit {
  showMoreDetails: boolean = false;
  selectedMember: FamilyMember | null = null;
  rootId!: string |null;
  @Input() member: FamilyMember | undefined;
  members: FamilyMember[] = []; // Ensure members is an array of FamilyMember objects
  
  constructor(private http: HttpClient, private familyService: FamilyService, private router: Router,private service:familyService) {


  }

  ngOnInit(): void {
  

      // this.rootId = this.service.getUserId()

     this.rootId='660a10f3d689c7121e700141'

    //  console.log(this.rootId)

    //  if(rootId!==null) {
    //   this.userId = rootId
    //  }


     if (this.rootId !== null) {

      this.familyService.getFamilyMembers(this.rootId).subscribe(
          (members) => { this.members = members; },
          (error) => { console.error('Error fetching members data', error); }
      );
  } else {
      console.error('UserId is null');
      // Handle the case where userId is null
  }
  }

  detailsStyles = {};

  toggleDetails(): void {
    this.showMoreDetails = !this.showMoreDetails;
  }

  editMember(memberId: string): void {
    const member = this.members.find(m => m._id === memberId);
    if (member) {
      this.familyService.setMemberToEdit(member);
      // Here you would navigate to the edit page
      // For example, using Router:
      this.router.navigate(['/familytree/edit'], { replaceUrl: true });
    } else {
      console.error(`Member with ID ${memberId} not found`);
    }
  }

  selectMember(event: MouseEvent, memberId: string | undefined): void {
    if (memberId === undefined) {
      console.error('No member ID provided');
      return;
    }
  
    // Check if the selected member is being clicked again
    if (this.selectedMember && this.selectedMember._id === memberId) {
      this.deselectMember();
      return;
    }
    
    console.log("Attempting to find memberId:", memberId, "with rootId:", this.rootId);
    console.log("Current members:", this.members);
      
    // Find the member in the members array based on the memberId and matching this.rootId
    const member = this.members.find(m => m._id === memberId && m.rootId && m.rootId._id === this.rootId);
    if (member) {
      this.selectedMember = member;

      const offsetX = 10;  // Adjust if necessary
      const offsetY = 10;  // Adjust if necessary
      this.detailsStyles = {
        'position': 'absolute',
        'top': `${event.clientY + offsetY}px`,
        'left': `${event.clientX + offsetX}px`,
        'display': 'block'
      };
      // ...existing logic for setting detailsStyles and updating the class list...
    } else {
      console.error(`Member with ID ${memberId} not found or does not match the root ID`);
    }
  }
  
  
  
  deselectMember(): void {
    if (this.selectedMember && this.selectedMember._id) {
      const element = document.getElementById(this.selectedMember._id);
      if (element) {
        element.classList.remove('selected');
      }
      this.selectedMember = null;
    }
  }
  
  getMemberByRelation(relationship: string): FamilyMember | undefined {
    return this.members.find(m => m.relationship === relationship);
  }
  
  // This method checks if a member with a certain relationship exists
  doesRelationExist(relationship: string): boolean {
    return this.members.some(m => m.relationship === relationship);
  }
  
  
  // private createFamilyTree(members: FamilyMember[]): FamilyMember[] {
  //   // Create a map with all members
  //   const membersMap = new Map<string, FamilyMember>(members.map(member => [member._id, {
  //     ...member,
  //     children: []
  //   }]));

  //   // Establish parent-child relationships
  //   const tree: FamilyMember[] = [];
  //   members.forEach(member => {
  //     if (member.rootId) {
  //       const parent = membersMap.get(member.rootId);
  //       if (parent) {
  //         // Use a variable to hold the value obtained from the map
  //         const childMember = membersMap.get(member._id);
  //         // Check if the value exists before pushing it to the parent's children array
  //         if (childMember) {
  //           parent.children.push(childMember);
  //         } else {
  //           console.error(`Member with ID ${member._id} not found`);
  //         }
  //       } else {
  //         console.error(`Parent with ID ${member.rootId} not found`);
  //       }
  //     } else {
  //       // If there is no rootId, consider this member as one of the roots of the tree
  //       const rootMember = membersMap.get(member._id);
  //       if (rootMember) {
  //         tree.push(rootMember);
  //       }
  //     }
  //   });
    
  //   return tree.filter(member => !member.rootId); // Return only the root members
  // }

  // private findRootMember(members: FamilyMember[], rootId: string): FamilyMember | undefined {
  //   // This function finds the root member in the hierarchical tree
  //   return members.find(member => member._id === rootId);
  // }

  // You might also want to include other utility functions to handle user interactions
  // such as adding, editing, or removing family members from the tree.
}

@Injectable({ providedIn: 'root' })
export class FamilyService {
  constructor(private http: HttpClient) {}

  getFamilyMembers(rootId: string): Observable<FamilyMember[]> {
    return this.http.get<FamilyMember[]>(`https://ancestry-api.onrender.com/api/members?rootId=${rootId}`);
  }
  private memberToEdit: FamilyMember | null = null;

  setMemberToEdit(member: FamilyMember): void {
    this.memberToEdit = member;
  }

  getMemberToEdit(): FamilyMember | null {
    return this.memberToEdit;
  }
}
