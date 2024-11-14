// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCCCiGD_kceWbbhuammqc1s7v5YBvtgYIU",
  authDomain: "smdproject-8fea5.firebaseapp.com",
  databaseURL: "https://smdproject-8fea5-default-rtdb.firebaseio.com",
  projectId: "smdproject-8fea5",
  storageBucket: "smdproject-8fea5.appspot.com",
  messagingSenderId: "18090974462",
  appId: "1:18090974462:web:72bc963442c867bfd8d9af",
};
import {
  getDatabase,
  ref,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  getStorage,
  ref as stRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth();

const URI = "https://robo-music-api.onrender.com/music/my-api";
const doneBtn = document.getElementById("done");
const playlistshow = document.getElementById("playlistshow");
const createPlaylist = document.getElementById("createplaylist");
let selectedMusic = [];
let isChecked = false;

onAuthStateChanged(auth, (user) => {
  if (user) {
    createPlaylist.addEventListener("click", () => {
      playlistCreator(user);
    });
  } else {
    window.location.href = "login.html";
  }
});

const playlistcont = async () => {
  try {
    const response = await fetch(URI);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    // const playlist = document.getElementById("playlist");
    json.forEach((element) => {
      if (element.albumName) {
        const mainDiv = document.createElement("div");
        mainDiv.style.display = "flex";
        mainDiv.style.flexDirection = "row";
        mainDiv.style.gap = "10px";
        const div = document.createElement("div");
        const radio = document.createElement("input");
        radio.type = "checkbox";
        radio.className = "checkbox";
        radio.setAttribute("data-song-url", element.songUrl);
        radio.setAttribute("data-artist-name", element.artistName);
        radio.setAttribute("data-song-img", element.songImage);
        radio.setAttribute("data-album-name", element.albumName);
        // mainDiv.className = "song-wrapper";
        div.textContent = element.albumName;
        mainDiv.style.backgroundColor = "#fff";
        mainDiv.style.color = "#fff";
        mainDiv.style.width = "95%";
        mainDiv.style.height = "50px";
        mainDiv.style.alignItems = "center";
        mainDiv.style.padding = "10px";
        mainDiv.style.margin = "10px";
        mainDiv.style.borderRadius = "5px";
        mainDiv.style.cursor = "pointer";
        mainDiv.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
        mainDiv.style.transition = "all 0.3s ease";
        mainDiv.style.background =
          "linear-gradient(to right, #000000, #434343)";
        mainDiv.style.borderTop = "0.5px solid white";
        mainDiv.appendChild(radio);
        mainDiv.appendChild(div);
        playlistshow.appendChild(mainDiv);
        radio.addEventListener("click", checkCheckbox);
      }
    });
  } catch (error) {
    console.error("Error fetching playlist:", error);
  }
};

playlistcont();

function checkCheckbox(e) {
  const songUrl = e.target.getAttribute("data-song-url");
  const songImg = e.target.getAttribute("data-song-img");
  const albumName = e.target.getAttribute("data-album-name");
  const artistName = e.target.getAttribute("data-artist-name");
  const musicDetails = {
    songUrl,
    albumName,
    songImg,
    artistName,
  };
  if (e.target.checked) {
    const index = indexChecker(selectedMusic, musicDetails);
    if (index === -1) {
      selectedMusic.push(musicDetails);
    }
  } else {
    const index = indexChecker(selectedMusic, musicDetails);
    selectedMusic.splice(index, 1);
  }
}

function indexChecker(array, params) {
  return array.indexOf(params);
}

doneBtn.addEventListener("click", () => {
  document.querySelector("dialog").showModal();
});

homeBtn1.addEventListener("click", () => {
  window.location.href = "loginmainpage.html";
});

function playlistCreator(user) {
  try {
    const playlistRef = ref(database, `playlist/${user.uid}`);
    const playlist = {
      playlistName: playlistname.value,
      playlistSongs: selectedMusic,
    };
    push(playlistRef, playlist);
    document.querySelector("dialog").close();
  } catch (error) {
    alert(error.message);
  }
}

closeDia.addEventListener("click", () => {
  document.querySelector("dialog").close();
});
