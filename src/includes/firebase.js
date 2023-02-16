import firebase from "firebase/app"; // for core features
import "firebase/auth"; // for authentication
import "firebase/firestore"; // for cloud firestore
import "firebase/storage"; // for storage in firebase
const firebaseConfig = {
  // from Firebase console
  apiKey: "AIzaSyCPXshH-L2Y2-erJn6qX1ZPaeUmLhuEO0w",
  authDomain: "music-7d724.firebaseapp.com",
  projectId: "music-7d724",
  storageBucket: "music-7d724.appspot.com",
  //   messagingSenderId: "431784229865",
  appId: "1:431784229865:web:a95353c7a03c6574896978",
  measurementId: "G-RM4CP7K2WV",
};
firebase.initializeApp(firebaseConfig); // Initialize Firebase
const db = firebase.firestore(); // get firestore instance
const auth = firebase.auth(); // get auth instance
const storage = firebase.storage(); // get storage instance
const usersCollection = db.collection("users"); // get users collection
const songCollection = db.collection("songs"); // get songs collection
const commentsCollection = db.collection("comments"); // get comments collection
export {
  db,
  auth,
  usersCollection,
  songCollection,
  commentsCollection,
  storage,
}; // export firestore and auth
