export interface FamilyMember {
  id: string;
  name: string;
  surname?: string;
  email?: string;
  phone?: string;
  dob?: string;
  birthCity?: string;
  Address?: string;
  relationship: string;
  rootId?: string;
  children: FamilyMember[];
}