import firebase from 'firebase/app' // the core part of firebase package
// Then we import any features from firebase that we want to use
// in our case it is cloud firestore
import 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGpnAIAVYljYWuySARpcNCaf1jE_jZQSs",
  authDomain: "firstproject-2e10a.firebaseapp.com",
  projectId: "firstproject-2e10a",
  storageBucket: "firstproject-2e10a.appspot.com",
  messagingSenderId: "804169837571",
  appId: "1:804169837571:web:1f1abae416625228a13236",
  measurementId: "G-W7EC5LXCHR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()

export {projectFirestore}
