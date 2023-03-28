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
  city: any;
  icone: any;
  time: any;
  temp: any;
  state: any;
  wind: any;
  hum: any;
  press: any;
  cityName!: string;
  constructor(private auth : AuthService,private apiService: ApiService) { }

  Userauth = getAuth();
  user = this.Userauth.currentUser;
  ID=this.user?.uid;

  ngOnInit() {
    this.apiService.getWeatherData('Paris').subscribe((data: any) => {
      console.log(data);
      this.city = data.location.name;
      this.icone = data.current.condition.icon;
      this.time = data.current.last_updated
      this.temp = data.current.temp_c
      this.state = data.current.condition.text
      this.wind = data.current.wind_kph
      this.hum = data.current.humidity
      this.press = data.current.pressure_mb
    });}

    updateWidget(cityName : string) {
      this.apiService.getWeatherData(cityName).subscribe((data: any) => {
        console.log(data);
        this.city = data.location.name;
        this.icone = data.current.condition.icon;
        this.time = data.current.last_updated
        this.temp = data.current.temp_c
        this.state = data.current.condition.text
        this.wind = data.current.wind_kph
        this.hum = data.current.humidity
        this.press = data.current.pressure_mb
      });}

    onSubmit(): void {
      console.log(this.cityName);
      this.updateWidget(this.cityName)
    }

    AjoutFavorie(){
      console.log(this.city +":----------: "+this.ID)
      this.auth.AjoutFavorie(this.city,this.ID);
    }

  logout(){
    this.auth.logout();
  }
}
