import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAAalXbBg_n-aQg9UNq9gwJ7a7ZbSMlzbo",
  authDomain: "whatsapp-clone-b96af.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-b96af.firebaseio.com",
  projectId: "whatsapp-clone-b96af",
  storageBucket: "whatsapp-clone-b96af.appspot.com",
  messagingSenderId: "549115322440",
  appId: "1:549115322440:web:efe4af4647f3e9458ff87d",
  measurementId: "G-3RLTXGNLQH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
export default db