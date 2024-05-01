import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FamilyMember } from './tree'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { familyService } from '../family.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'] 
})
export class TreeComponent implements OnInit {
  showMoreDetails: boolean = false;
  selectedMember: FamilyMember | null = null;
  @Input() member: FamilyMember | undefined;
  members: FamilyMember[] = []; // Ensure members is an array of FamilyMember objects

  constructor(private http: HttpClient, private familyService: FamilyService, private router: Router,private service:familyService) {}

  ngOnInit(): void {
    // const rootId = 'ee17';
     const rootId = this.service.getUserId();
     if (rootId !== null) {
      this.familyService.getFamilyMembers(rootId).subscribe(
          (members) => { this.members = members; },
          (error) => { console.error('Error fetching members data', error); }
      );
  } else {
      console.error('UserId is null');
      // Handle the case where userId is nully
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

    // Find the member in the members array based on the memberId
    const member = this.members.find(m => m._id === memberId);
    if (member) {
      this.selectedMember = member;
      const boxWidth = 200; // Width of the details box, adjust as needed
      const offsetY = 30; // Vertical offset from the clicked point

      this.detailsStyles = {
        'position': 'absolute',
        'top': `${event.clientY + offsetY}px`,
        'left': `${event.clientX - boxWidth / 2}px`, // Center the box horizontally on the click
        'display': 'block' // Make sure it's visible
      };
      const element = document.getElementById(member._id);
      if (element) {
        element.classList.add('selected');
      }
    } else {
      console.error(`Member with ID ${memberId} not found`);
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