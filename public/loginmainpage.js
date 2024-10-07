import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  FacebookAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCCiGD_kceWbbhuammqc1s7v5YBvtgYIU",
  authDomain: "smdproject-8fea5.firebaseapp.com",
  databaseURL: "https://smdproject-8fea5-default-rtdb.firebaseio.com",
  projectId: "smdproject-8fea5",
  storageBucket: "smdproject-8fea5.appspot.com",
  messagingSenderId: "18090974462",
  appId: "1:18090974462:web:72bc963442c867bfd8d9af",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const database = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid);
    readProfilePicture(user.uid);
    const userRef = ref(database, "users/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        Object.keys(data).forEach((key) => {
          const userData = data[key];
          if (userData.email === user.email) {
            document.getElementById("username").textContent = userData.username;
          }
        });
      }
    });
  } else {
    console.log("no user found");
  }
});

function readProfilePicture(userID) {
  if (!userID) {
    console.log("Invalid user ID provided");
    return;
  }
  const picRef = ref(database, "profilePictures/" + `/${userID}`);
  onValue(
    picRef,
    (snapshot) => {
      const data = snapshot.val();
      const picName = data.pfp;

      const imgRef = stRef(storage, picName);
      getDownloadURL(imgRef).then((ref) => {
        document.getElementById("profilebtn").innerHTML = `<img src='${ref}'>`;
        document.getElementById("profilebtn").style.padding = "0";
        document.getElementById("imageprofilebutton").style.padding = "0";
        document.getElementById("svgIcon").style.display = "none";
        const image = document.getElementById("image");
        image.style.borderRadius = "50%";
        image.style.height = "100%";
        image.style.width = "100%";
        image.src = ref;
      });
    },
    (error) => {
      // Handle any errors that occur
      console.error("Error fetching data:", error);
    }
  );
}

document.getElementById("headersignup").addEventListener("click", () => {
  if (profilecont.style.display === "none") {
    profilecont.style.display = "flex";
  } else {
    profilecont.style.display = "none";
  }
});
document.getElementById("profileBtn").addEventListener("click", () => {
  profilemain();
});

function profilemain() {
  if (profile.style.display === "none") {
    mainnav.style.display = "flex";
    profilecont.style.display = "flex";
  } else {
    profile.style.display = "flex";
    mainnav.style.display = "none";
    profilecont.style.display = "none";
  }
}

document.getElementById("homeBtn").addEventListener("click", () => {
  homebtn();
});

function homebtn() {
  window.location.href = "loginmainpage.html";
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    document
      .getElementById("imageUpload")
      .addEventListener("change", function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        console.log(file);

        reader.readAsDataURL(file);

        reader.addEventListener("load", function (e) {
          const extractedFile = e.target.result;
          set(ref(database, "profilePictures/" + uid), {
            pfp: file.name,
            user: user.email,
          });
          const imgRef = stRef(storage, file.name);
          uploadBytes(imgRef, file)
            .then((snapshot) => {
              alert("img uploaded");
              document.getElementById("svgIcon").style.display = "none";
              const image = document.getElementById("image");
              image.src = extractedFile;
            })
            .catch((error) => {
              alert(error);
            });
        });
      });
  }
});
