import firebase from 'firebase';
import firestore from 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDtkIdsoV2xIagdUs_KTR5t_PAazM-gJtY",
  authDomain: "smoothies-fc8bc.firebaseapp.com",
  databaseURL: "https://smoothies-fc8bc.firebaseio.com",
  projectId: "smoothies-fc8bc",
  storageBucket: "smoothies-fc8bc.appspot.com",
  messagingSenderId: "616995613571",
  appId: "1:616995613571:web:aa75772cd40dcc0291a4b6",
  measurementId: "G-1WR8F46SN9"
};
// Initialize Firebase const firebaseApp 
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//export firestore database
export default firebase.firestore();
