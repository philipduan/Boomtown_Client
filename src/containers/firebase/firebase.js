import * as firebase from 'firebase';

//Initialise Firebase
const config = {
  apiKey: "AIzaSyAU7rDfLdl7xEZRQfgpE8r1mjLqWNlvIQ0",
  authDomain: "boomtown-auth.firebaseapp.com",
  databaseURL: "https://boomtown-auth.firebaseio.com",
  projectId: "boomtown-auth",
  storageBucket: "boomtown-auth.appspot.com",
  messagingSenderId: "699773187792"
};
firebase.initializeApp(config);

export default firebase;