// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

let API_KEY;

console.log("Fetching API Key from /api/apikey");
fetch("/api/apikey") // Make a request to your serverless function
  .then((response) => response.json())
  .then((data) => {
    const apiKey = data.apiKey; // Access the API key returned by the serverless function
    console.log("API Key:", apiKey); // Use the API key in your frontend code
    API_KEY = apiKey; // Store the API key in a global variable or use it as needed
  })
  .catch((error) => console.error("Error fetching API key:", error));
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "smdproject-8fea5.firebaseapp.com",
  databaseURL: "https://smdproject-8fea5-default-rtdb.firebaseio.com",
  projectId: "smdproject-8fea5",
  storageBucket: "smdproject-8fea5.appspot.com",
  messagingSenderId: "18090974462",
  appId: "1:18090974462:web:72bc963442c867bfd8d9af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const auth = getAuth();
const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();
const email = document.getElementById("email");

const signWithGg = document.getElementById("signwithgg");
const signWithFb = document.getElementById("signwithfb");
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const manChars = document.querySelectorAll("#manchar");
let isChecked = false;
console.log(manChars);

console.log(auth.currentUser);

function tickedchar() {
  manChars.forEach((element) => {
    if (element.checked) {
      isChecked = true;
      console.log(element.value);
    }
  });
}
tickedchar();

next.addEventListener("click", () => {
  checkEmail();
  console.log("clicked");
});

email.addEventListener("input", () => {
  if (email.value === "") {
    emailerrortag.style.display = "flex";
    email.style.borderColor = "red";
  } else if (emailRegex.test(email.value)) {
    emailerrortag.style.display = "none";
    email.style.borderColor = "white";
  } else if (!emailRegex.test(email.value)) {
    emailerrortag.style.display = "flex";
    email.style.borderColor = "red";
  } else {
    emailerrortag.style.display = "none";
    email.style.borderColor = "white";
  }
});

function checkEmail() {
  if (email.value === "") {
    emailerrortag.style.display = "flex";
    email.style.borderColor = "red";
    email.style.boxShadow = "none";
  } else if (!emailRegex.test(email.value)) {
    emailerrortag.style.display = "flex";
  } else {
    const userRef = ref(database, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let emailExists = false; // Flag to track if the email exists

      if (data) {
        // Iterate through the user data to check if the email exists
        Object.keys(data).forEach((key) => {
          const userData = data[key];
          console.log("data exist");

          // Check if any user's email matches the provided email
          if (userData.email === email.value) {
            emailExists = true; // Set flag to true if email exists]
          }
          return;
        });

        // If no matching email was found

        if (!emailExists) {
          sessionStorage.setItem("email", email.value);
          step.style.display = "flex";
          cont.style.display = "none";
          console.log("email does not exist");
        } else {
          alert("An account already exists with this email.");
        }
      }
    });
  }
}

if (backbtn) {
  backbtn.addEventListener("click", () => {
    step.style.display = "none";
    cont.style.display = "flex";
  });
}

const labcolor = document.querySelectorAll("#colorshow");
function colorChecklab() {
  labcolor.forEach((element) => {
    element.style.color = "red";
  });
}
function whiteCheck() {
  labcolor.forEach((element) => {
    element.style.color = "white";
  });
}
const letterReg = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
const numReg = /^(?=.*\d)(?=.*[@$!%*?&]).*$/;
myinput.addEventListener("input", () => {
  if (myinput.value.length >= 10) {
    char.checked = true;
    myinput.style.borderColor = "white";
    whiteCheck();
  } else {
    char.checked = false;
  }
  if (letterReg.test(myinput.value)) {
    letter.checked = true;
    whiteCheck();
  } else {
    letter.checked = false;
    myinput.style.borderColor = "red";
    colorChecklab();
  }
  if (numReg.test(myinput.value)) {
    num.checked = true;
    whiteCheck();
  } else {
    num.checked = false;
    myinput.style.borderColor = "red";
    colorChecklab();
  }
});

stepnext.addEventListener("click", () => {
  if (
    char.checked === true &&
    letter.checked === true &&
    num.checked === true
  ) {
    sessionStorage.setItem("password", myinput.value);
    step2.style.display = "flex";
    step.style.display = "none";
    cont.style.display = "none";
  } else {
    myinput.style.borderColor = "red";
    myinput.style.boxShadow = "none";
    colorChecklab();
  }
});

if (backbtn2) {
  backbtn2.addEventListener("click", () => {
    step.style.display = "flex";
    cont.style.display = "none";
    step2.style.display = "none";
  });
}

let usernameReg = /^[A-Za-z0-9]{1,20}$/;
let dateNum = /^\d{1,2}$/;
let yearNum = /^\d{4}$/;

numberdd.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(
    /^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$/,
    ""
  );
});

yeardd.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(
    /^(?=.*[a-zA-Z])(?=.*)[a-zA-Z]+$/,
    ""
  );
});

nameUser.addEventListener("input", () => {
  if (nameUser.value === "") {
    nameerrortag.style.display = "flex";
    nameUser.style.borderColor = "red";
  } else if (!usernameReg.test(nameUser.value)) {
    nameerrortag.style.display = "flex";
    nameUser.style.borderColor = "red";
  } else {
    nameerrortag.style.display = "none";
    nameUser.style.borderColor = "white";
    sessionStorage.setItem("name", nameUser.value);
  }
});
numberdd.addEventListener("input", () => {
  if (numberdd.value === "") {
    dateerror.style.display = "flex";
    numberdd.style.borderColor = "red";
  } else if (!dateNum.test(numberdd.value)) {
    dateerror.style.display = "flex";
    numberdd.style.borderColor = "red";
  } else if (Number(numberdd.value) > 31 || Number(numberdd.value) < 1) {
    dateerror2.style.display = "none";
    numberdd.style.borderColor = "red";
  } else {
    numberdd.style.borderColor = "white";
    dateerror.style.display = "none";
    dateerror2.style.display = "none";
    montherror.style.display = "flex";
    yearerror.style.display = "flex";
  }
});

monthSelect.addEventListener("input", () => {
  if (monthSelect.value === "") {
    montherror.style.display = "flex";
    monthSelect.style.borderColor = "red";
  } else if (!monthSelect.value) {
    montherror.style.display = "flex";
    monthSelect.style.borderColor = "red";
  } else {
    monthSelect.style.borderColor = "white";
    dateerror.style.display = "none";
    dateerror2.style.display = "none";
    montherror.style.display = "none";
    yearerror.style.display = "flex";
  }
});

yeardd.addEventListener("input", () => {
  if (yearadd.value === "") {
    yearerror.style.display = "flex";
    yeardd.style.borderColor = "red";
  } else if (!yearNum.test(yeardd.value)) {
    yearerror.style.display = "none";
    yeardd.style.borderColor = "green";
  } else if (Number(yeardd.value) < 1900 || Number(yeardd.value) > 2006) {
    yearerror2.style.display = "flex";
    yearerror.style.display = "none";
    yeardd.style.borderColor = "red";
  } else {
    yeardd.style.borderColor = "white";
    dateerror2.style.display = "none";
    montherror.style.display = "none";
    yearerror.style.display = "none";
    dateerror.style.display = "none";
    yearerror2.style.display = "none";
  }
});

function condUserd() {
  if (
    nameUser.value === "" ||
    numberdd.value === "" ||
    monthSelect.value === "" ||
    yeardd.value === ""
  ) {
    nameerrortag.style.display = "flex";
    dateerror.style.display = "flex";
    nameUser.style.borderColor = "red";
    numberdd.style.borderColor = "red";
    monthSelect.style.borderColor = "rgb(255,2,0)";
    yeardd.style.borderColor = "red";
    nameUser.style.boxShadow = "none";
    numberdd.style.boxShadow = "none";
    monthSelect.style.boxShadow = "none";
    yeardd.style.boxShadow = "none";
  } else if (!usernameReg.test(nameUser.value)) {
    nameerrortag.style.display = "flex";
  } else if (!dateNum.test(numberdd.value)) {
    dateerror.style.display = "flex";
  } else if (Number(numberdd.value) > 31 || Number(numberdd.value) < 1) {
    dateerror2.style.display = "flex";
  } else if (!monthSelect.value) {
    montherror.style.display = "flex";
  } else if (!yearNum.test(yeardd.value)) {
    yearerror.style.display = "flex";
  } else if (Number(yeardd.value) < 1900 || Number(yeardd.value) > 2006) {
    yearerror2.style.display = "flex";
  } else {
    terms.style.display = "flex";
    step2.style.display = "none";
    cont.style.display = "none";
    step.style.display = "none";
  }
}

step2next.addEventListener("click", () => {
  condUserd();
});

backbtn3.addEventListener("click", () => {
  step.style.display = "none";
  cont.style.display = "none";
  step2.style.display = "flex";
  terms.style.display = "none";
});

step3next.addEventListener("click", () => {
  createUserWithEmailAndPassword(
    auth,
    sessionStorage.getItem("email"),
    sessionStorage.getItem("password")
  )
    .then((userCredential) => {
      const userRef = ref(database, "users/");
      const newUserRef = push(userRef);
      set(newUserRef, {
        email: sessionStorage.getItem("email"),
        username: sessionStorage.getItem("name"),
      })
        .then((res) => {
          window.location.href = "loginmainpage.html";
        })
        .catch((error) => {
          alert(error.message);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

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

signWithFb.addEventListener("click", () => {
  signInWithPopup(auth, fProvider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      alert("Signed In");
      location.href = "loginmainpage.html";
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      alert(errorMessage);
      // ...
    });
});
