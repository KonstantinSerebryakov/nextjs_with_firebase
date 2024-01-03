import { initializeApp } from "firebase/app";
import {
  Firestore,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBMQLLMroX1YbgTp2oY4y-BCguJB_7PNjQ",
  authDomain: "konstantin-serebryakov-124123.firebaseapp.com",
  projectId: "konstantin-serebryakov-124123",
  storageBucket: "konstantin-serebryakov-124123.appspot.com",
  messagingSenderId: "374625376402",
  appId: "1:374625376402:web:fda97fb32a55b807c5ae4b",
  measurementId: "G-4WXVWBG3RM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// Get a list of cities from your database
async function getCities(db: Firestore) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const docs = citySnapshot.docs;
  //   return docs;
  const cityList = docs.map((doc) => doc.data());
  return cityList;
}

getCities(db).then(console.log);

// firebase auth
const authData = { email: "Kostik222@mail.ru", password: "!R@/n;%5.<{i[wCA" };
// subscribe to auth
const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log("user status changed:", user);
});
createUserWithEmailAndPassword(auth, authData.email, authData.password)
  .then((cred) => {
    console.log("user created:", cred.user);
  })
  .catch((err) => {
    console.log(err.message);
  });
signOut(auth)
  .then(() => {
    console.log("user signed out");
  })
  .catch((err) => {
    console.log(err.message);
  });
// unsubscribe
unsubAuth();
export const KEK = 5;

// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// ////////////////////////////////////////////////
// collection ref
const colRef = collection(db, "cities");

// queries
const q = query(colRef, where("name", "==", "minsk"), orderBy("createdAt"));

// realtime collection data
const unsubCol = onSnapshot(q, (snapshot) => {
  let cities: { id: string }[] = [];
  snapshot.docs.forEach((doc) => {
    cities.push({ ...doc.data(), id: doc.id });
  });
  console.log(cities);
});

// adding docs
addDoc(colRef, {
  name: "minsk",
  description: "capital of belarus",
  createdAt: serverTimestamp(),
});

const docId = "";
// deleting docs
/* const docRef = doc(db, "books", docId);
deleteDoc(docRef);
 */
// fetching a single document (& realtime)
/* const docRef = doc(db, "cities", docId);

const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});
 */
// updating a document
let docRef = doc(db, "cities", docId);

updateDoc(docRef, {
  description: "lorem",
})