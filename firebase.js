import {initializeApp} from 'firebase/app'
import {getDatabase, ref, onValue,} from 'firebase/database'
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
import 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4J0TNil9RnNdJZP7hm1klkmpxvPB4VnU",
  authDomain: "tcc-my-aquarium.firebaseapp.com",
  projectId: "tcc-my-aquarium",
  storageBucket: "tcc-my-aquarium.appspot.com",
  messagingSenderId: "618496519257",
  appId: "1:618496519257:web:e5df84327fbe18e5f75548",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getDatabase()
const auth = getAuth(app)
const firestore = getFirestore(app)
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

export {db, ref, onValue, auth, firestore}
