import firebase from "firebase/app";
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDs8rnVizf1eGWLJ6Zte_dCFOCBtA6Hqd8",
  authDomain: "crud-udemy-react-de634.firebaseapp.com",
  projectId: "crud-udemy-react-de634",
  storageBucket: "crud-udemy-react-de634.appspot.com",
  messagingSenderId: "44865267779",
  appId: "1:44865267779:web:8b064db1029f34904bccf6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export {firebase}