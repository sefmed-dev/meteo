import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import * as auth from 'firebase/auth';
import { Firestore} from "@angular/fire/firestore";
import { DocumentSnapshot, addDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { getAuth } from "firebase/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  variableTest: any;
  firebaseApp = initializeApp({
    projectId: 'meteo-6ae41',
     appId: '1:189137861149:web:a434fb46a66d5bd6d5e4f4',
     storageBucket: 'meteo-6ae41.appspot.com',
     apiKey: 'AIzaSyAQqd4HZl5PqBxH0_sWyTi_FnfeghfU5fk',
     authDomain: 'meteo-6ae41.firebaseapp.com',
     messagingSenderId: '189137861149',
     measurementId: 'G-6VN26MDQ2R',
 });
 db = getFirestore();

  constructor(private fireauth : AngularFireAuth, private router : Router, private db1:AngularFirestore) {   this.fireauth.authState.subscribe((user) => {
    if (user) {
      this.userData = user;
      localStorage.setItem('token', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('token')!);
    } else {
      localStorage.setItem('token', 'null');
      JSON.parse(localStorage.getItem('token')!);
    }
  });
}
// Returns true when user is looged in and email is verified
get isLoggedIn(): boolean {
  const user = JSON.parse(localStorage.getItem('token')!);
  return user !== null ? true : false;
} 
  
  //login method
   login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');

        if(res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } else {
          //this.router.navigate(['/varify-email']);
        }

    }, err => {
        alert(err.message);
        this.router.navigate(['']);
    })
  }

  // register method
  async register(email : string, password : string, Name : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( async res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      res.user?.updateProfile(
        {
          displayName : Name,
        }
      )
      console.log("USER's UID: ",res.user?.uid);

      // Add a new document in collection "Essai1"


      const docRef = collection(this.db, "Essai3");

      await setDoc(doc(docRef, res.user?.uid), {
        Email : email,
        Name : Name,
        cities:[]
      });
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
    
    /*setDoc(doc(this.db, "Essai1","24JHFHN8pKD5Ri5hBbR2"), {
      Email : email,
      Name : Name,
});*/




  }


  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['']);
      alert('logged out');
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
}

// email varification
sendEmailForVarification(user : any) {
  console.log(user);
  user.sendEmailVerification().then((res : any) => {
    this.router.navigate(['/varify-email']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}

//sign in with google
googleSignIn() {
  return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

    this.router.navigate(['/dashboard']);
    localStorage.setItem('token',JSON.stringify(res.user?.uid));

  }, err => {
    alert(err.message);
  })
}

async AjoutFavorie(CityName:string,userID:string | undefined)
{
  /*
  await updateDoc(doc(collection(this.db, "newFavorits["+userID+"].cities")), {
    cities: arrayUnion(CityName)
  });*/
  /*const docRef = collection(this.db, "essai2");
  await updateDoc(doc(docRef,userID), {
    regions: arrayUnion("greater_virginia")
  });*/

  const docRef = collection(this.db, "Essai3"); // create reference to document

 
await updateDoc(doc(docRef, userID), {
  cities: arrayUnion(CityName)
});
}

/*
async AfficheFavorits()
{
//console.log(this.userData);

//alert(this.userData.uid)
//alert("hello1")

this.db1.collection("Essai3").doc(this.userData.uid).snapshotChanges().subscribe((a:any)=>{
  const test:{cities:string[]} = a.payload.data()
  alert(test.cities)
  return test.cities;
})
}
/*
getFavorites(uid: string): Observable<string[]> {
  return this.db1.collection("Essai3").doc<{ cities: string[] }>(uid).valueChanges().pipe(
    filter(data => !!data), // Filter out undefined values
    map((data: DocumentSnapshot<{ cities: string[] }>) => data.data().cities)
  );
}
*/
}

