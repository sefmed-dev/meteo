import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { getAuth } from "firebase/auth";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private auth : AuthService) { }

Userauth = getAuth();
user = this.Userauth.currentUser;


  logout() {
    this.auth.logout();
  }
}
