// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9CXUI4-fZcFgVmd85CIvSdXCsh3sfddM",
  authDomain: "web3-wikipedia.firebaseapp.com",
  projectId: "web3-wikipedia",
  storageBucket: "web3-wikipedia.appspot.com",
  messagingSenderId: "93277082662",
  appId: "1:93277082662:web:1bc291200c228c22de02e7",
  measurementId: "G-3DX5WHZQDJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;