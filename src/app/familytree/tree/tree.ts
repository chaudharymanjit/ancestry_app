
export interface rootId {
  _id: string;
}

export interface FamilyMember {
  _id: string;
  name: string;
  surname?: string;
  email?: string;
  phone?: string;
  dob?: string;
  birthCity?: string;
  Address?: string;
  relationship: string;
  rootId?: rootId;  // Updated to be of type RootId
  children: FamilyMember[];
}


