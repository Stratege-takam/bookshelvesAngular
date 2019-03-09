import { Component } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyA06zhrlFRQO2FoqJ575GI0CS-3niYCbNA",
      authDomain: "bookshelves-demon.firebaseapp.com",
      databaseURL: "https://bookshelves-demon.firebaseio.com",
      projectId: "bookshelves-demon",
      storageBucket: "bookshelves-demon.appspot.com",
      messagingSenderId: "741396069568"
    };
    firebase.initializeApp(config);
  }
}
