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

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const auth = getAuth();
const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

const signWithGg = document.getElementById("signwithgg");
const signWithFb = document.getElementById("signwithfb");
const loginBtn = document.getElementById("log-div");
const emailInput = document.getElementById("emailinput");
const passwordInput = document.getElementById("passwordinput");

const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

signWithGg.addEventListener("click", () => {
  signInWithPopup(auth, gProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      location.href = "loginmainpage.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage);
    });
});
// signWithFb.addEventListener("click", () => {
//   signInWithPopup(auth, fProvider)
//     .then((result) => {
//       // The signed-in user info.
//       const user = result.user;

//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       const credential = FacebookAuthProvider.credentialFromResult(result);
//       const accessToken = credential.accessToken;
//       alert("Signed In");
//       location.href = "loginmainpage.html";
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = FacebookAuthProvider.credentialFromError(error);
//       alert(errorMessage);
//       // ...
//     });
// });

loginBtn.addEventListener("click", () => {
  login();
});

function login() {
  if (!emailInput.value.trim() || !passwordInput.value.trim()) {
    alert("Please enter your email and password");
    return;
  } else if (!emailRegex.test(emailInput.value)) {
    alert("Please enter a valid email");
    return;
  } else if (!passwordRegex.test(passwordInput.value.trim())) {
    alert("Please enter a valid password");
    return;
  } else {
    signInWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value.trim()
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Login Successful");
        window.location.href = "loginmainpage.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }
}
