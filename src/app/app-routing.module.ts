import { NgModule } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent, canActivate: [AngularFireAuth]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  /*{path: '', redirectTo:'file-upload', pathMatch:'full'},
  {path: 'login', component : LoginComponent},
  {path: 'dashboard', component : DashboardComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'varify-email', component : VarifyEmailComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},
  {path : 'file-upload', component:FileuploadComponent}*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
