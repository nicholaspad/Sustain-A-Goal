import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/database";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBH52fYwnC9Y6HfGj4CVMDVlwdzBS285R0",
    authDomain: "cruzhacks-2021-sn.firebaseapp.com",
    projectId: "cruzhacks-2021-sn",
    storageBucket: "cruzhacks-2021-sn.appspot.com",
    messagingSenderId: "323432439022",
    appId: "1:323432439022:web:1e803cccf566d37ed567ff",
    measurementId: "G-D6M9RMBSDW"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function App() {

  return (
    <div></div>
  );
}

export default App;
