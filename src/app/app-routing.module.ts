import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/sign-up/login/login.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { DisplayProfileComponent } from './profile/display-profile/display-profile.component';
import { FamilytreeComponent } from './familytree/familytree.component';
import { AddMembersComponent } from './familytree/add-members/add-members.component';
import { EditProfileComponent } from './familytree/edit-profile/edit-profile.component';
import { TreeComponent } from './familytree/tree/tree.component';

const routes: Routes = [
  {path:'', component:AuthComponent},
  {path:'authentication', component:AuthComponent},
  {path:'sign-up', component:SignUpComponent, children:[{path:'login', component:LoginComponent}]  
  },
  {path:'login',component:LoginComponent},
  {path:'profile',component:UserProfileComponent},
  {path:'DisplayProfile',component:DisplayProfileComponent},
  {path:'familytree', component:FamilytreeComponent},
  {path:'familytree/add', component:AddMembersComponent},
  {path:'familytree/edit', component:EditProfileComponent},
  {path:'familytree/tree',component:TreeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
