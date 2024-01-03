import { initializeApp } from "firebase/app";
import { Firestore } from "firebase/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

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

// Get a list of cities from your database
async function getCities(db: Firestore) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const docs = citySnapshot.docs;
  return docs;
  const cityList = docs.map((doc) => doc.data());
//   return cityList;
}

getCities(db).then(console.log)


export const KEK = 5;