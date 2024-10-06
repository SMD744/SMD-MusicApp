// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "smdproject-8fea5.firebaseapp.com",
  databaseURL: "https://smdproject-8fea5-default-rtdb.firebaseio.com",
  projectId: "smdproject-8fea5",
  storageBucket: "smdproject-8fea5.appspot.com",
  messagingSenderId: "18090974462",
  appId: "1:18090974462:web:72bc963442c867bfd8d9af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

playlist.addEventListener("click", () => {
  playlistcont.style.display = "block";
});

not.addEventListener("click", () => {
  playlistcont.style.display = "none";
});
asakebtn.addEventListener("click", () => {
  mainnav.style.display = "none";
  profile.style.display = "block";
});
backbtnhome.addEventListener("click", () => {
  profile.style.display = "none";
  mainnav.style.display = "block";
  remaprofile.style.display = "none";
});
remabtn.addEventListener("click", () => {
  mainnav.style.display = "none";
  remaprofile.style.display = "block";
});

// const CLIENT_ID = "65a94b90a63a490fbb8514d11554c8f4";
// const CLIENT_SECRET = "54f48b63ee42485c9fe41b53bb259c72";

// console.log(getToken());

// function openMe() {
//   document.querySelector("dialog").showModal();
// }
openMe.addEventListener("click", () => {
  document.querySelector("dialog").showModal();
});
closeDia.addEventListener("click", () => {
  document.querySelector("dialog").close();
});
