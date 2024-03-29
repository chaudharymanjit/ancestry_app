import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import{ FormsModule} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/sign-up/login/login.component';
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { UserProfileComponent } from './profile/user-profile.component';
import { DisplayProfileComponent } from './profile/display-profile/display-profile.component';
import { SuccessDialogComponent } from './profile/success-dialog/success-dialog.component';
import { FamilytreeComponent } from './familytree/familytree.component';
import { AddMembersComponent } from './familytree/add-members/add-members.component';
import { TreeComponent } from './familytree/tree/tree.component';
import { EditProfileComponent } from './familytree/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SignUpComponent,
    LoginComponent,
    UserProfileComponent,
    DisplayProfileComponent,
    SuccessDialogComponent,
    FamilytreeComponent,
    AddMembersComponent,
    TreeComponent,
    EditProfileComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    MatIconModule,// to use this we have to do(ng add @angular/material)
    MatButtonModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
