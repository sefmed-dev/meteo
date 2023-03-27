import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { getAuth } from "firebase/auth";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiService]
})
export class DashboardComponent {
  constructor(private auth : AuthService,private apiService: ApiService) { }

  Userauth = getAuth();
  user = this.Userauth.currentUser;

  ngOnInit() {
    this.apiService.getWeatherData('New York').subscribe((data: any) => {
      console.log(data);
    });}

  logout(){
    this.auth.logout();
  }
}
