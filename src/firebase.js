import firebase from "firebase";
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyAGcXXXCqZoyvKTvX6T5WusneJTSIe8VaU",
        authDomain: "todo-app-sftk.firebaseapp.com",
        databaseURL: "https://todo-app-sftk.firebaseio.com",
        projectId: "todo-app-sftk",
        storageBucket: "todo-app-sftk.appspot.com",
        messagingSenderId: "113411575115",
        appId: "1:113411575115:web:4b1218d9d19eb3dda46cce",
        measurementId: "G-XYV5MRHNHN"
});
  
const db = firebaseApp.firestore();
export default db ;




