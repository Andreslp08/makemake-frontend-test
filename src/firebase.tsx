// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCs6VnLWlFv0odyL4RTZsvlIpR9b6xXaEg",
  authDomain: "makemake-frontend-test.firebaseapp.com",
  projectId: "makemake-frontend-test",
  storageBucket: "makemake-frontend-test.appspot.com",
  messagingSenderId: "916837603006",
  appId: "1:916837603006:web:9f0fd1b352495b4cce30ef",
  measurementId: "G-D7FWEKV1V2"
};


export const initFirebaseApp =()=>{
    initializeApp(firebaseConfig);
}
