import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email : string = '';
  password : string = '';
  Name : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
    return;
    }

    if(this.password == '') {
      alert('Please enter password');
    return;
    }
    
    if(this.Name == '') {
      alert('Please enter your full name');
    return;
      
    }

    this.auth.register(this.email,this.password,this.Name);
    
    this.email = '';
    this.password = '';
    this.Name= '';

}
}
