import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { getAuth } from "firebase/auth";
import { ApiService } from 'src/app/api.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
  city1: any;
  icone1: any;
  time1: any;
  temp1: any;
  state1: any;
  wind1: any;
  hum1: any;
  press1: any;
  city2: any;
  icone2: any;
  time2: any;
  temp2: any;
  state2: any;
  wind2: any;
  hum2: any;
  press2: any;
  city3: any;
  icone3: any;
  time3: any;
  temp3: any;
  state3: any;
  wind3: any;
  hum3: any;
  press3: any;
  Cities:any;
  cityName!: string;
  //test:{ cities: string[]; };

  constructor(private auth : AuthService,private apiService: ApiService, private db1:AngularFirestore) { }

  Userauth = getAuth();
  user = this.Userauth.currentUser;
  ID=this.user?.uid;

  async ngOnInit() {
    this.apiService.getWeatherData('Paris').subscribe((data: any) => {
      //console.log(data);
      this.city = data.location.name;
      this.icone = data.current.condition.icon;
      this.time = data.current.last_updated
      this.temp = data.current.temp_c
      this.state = data.current.condition.text
      this.wind = data.current.wind_kph
      this.hum = data.current.humidity
      this.press = data.current.pressure_mb
    });
    this.AfficheFav();
  }

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
  AfficheFav(){
    this.db1.collection("Essai3").doc(this.ID).snapshotChanges().subscribe((a:any)=>{
      const test:{cities:string[]} = a.payload.data()
      
      this.apiService.getWeatherData(test.cities[test.cities.length-1]).subscribe((data: any) => {
        this.city1 = data.location.name;
        this.icone1 = data.current.condition.icon;
        this.time1 = data.current.last_updated
        this.temp1 = data.current.temp_c
        this.state1 = data.current.condition.text
        this.wind1 = data.current.wind_kph
        this.hum1 = data.current.humidity
        this.press1 = data.current.pressure_mb
      });
    })
    
    this.db1.collection("Essai3").doc(this.ID).snapshotChanges().subscribe((a:any)=>{
      const test:{cities:string[]} = a.payload.data()
      
      this.apiService.getWeatherData(test.cities[test.cities.length-2]).subscribe((data: any) => {
        this.city2 = data.location.name;
        this.icone2 = data.current.condition.icon;
        this.time2 = data.current.last_updated
        this.temp2 = data.current.temp_c
        this.state2 = data.current.condition.text
        this.wind2 = data.current.wind_kph
        this.hum2 = data.current.humidity
        this.press2 = data.current.pressure_mb
      });
    })

    this.db1.collection("Essai3").doc(this.ID).snapshotChanges().subscribe((a:any)=>{
      const test:{cities:string[]} = a.payload.data()
      
      this.apiService.getWeatherData(test.cities[test.cities.length-3]).subscribe((data: any) => {
        this.city3 = data.location.name;
        this.icone3 = data.current.condition.icon;
        this.time3 = data.current.last_updated
        this.temp3 = data.current.temp_c
        this.state3 = data.current.condition.text
        this.wind3 = data.current.wind_kph
        this.hum3 = data.current.humidity
        this.press3 = data.current.pressure_mb
      });
    })
    }

// AfficheFavorits(){
//   this.auth.AfficheFavorits();
// }
}