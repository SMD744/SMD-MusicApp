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
  onAuthStateChanged,
  signOut,
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

const logoutBtn = document.getElementById("logout");
const currentTimeSpan = document.getElementById("currentTime");
const durationSpan = document.getElementById("duration");
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.uid);
    // readProfilePicture(user.uid);
    loadPlaylist(user);
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

logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      showSuccess("Signed out successfully").then(() => {
        window.location.href = "index.html";
      });
    })
    .catch((error) => {
      console.log("Error signing out:", error);
      showError(error.message);
    });
});

// function readProfilePicture(userID) {
//   if (!userID) {
//     console.log("Invalid user ID provided");
//     return;
//   }
//   const picRef = ref(database, "profilePictures/" + `/${userID}`);
//   onValue(
//     picRef,
//     (snapshot) => {
//       const data = snapshot.val();
//       const picName = data.pfp;

//       const imgRef = stRef(storage, picName);
//       getDownloadURL(imgRef).then((ref) => {
//         document.getElementById("profilebtn").innerHTML = `<img src='${ref}'>`;
//         document.getElementById("profilebtn").style.padding = "0";
//         document.getElementById("imageprofilebutton").style.padding = "0";
//         document.getElementById("svgIcon").style.display = "none";
//         const image = document.getElementById("image");
//         image.style.borderRadius = "50%";
//         image.style.height = "100%";
//         image.style.width = "100%";
//         image.src = ref;
//       });
//     },
//     (error) => {
//       // Handle any errors that occur
//       console.error("Error fetching data:", error);
//     }
//   );
// }
function loadPlaylist(user) {
  try {
    const audioRef = ref(database, `playlist/${user.uid}`);
    onValue(audioRef, (snap) => {
      const data = snap.val();
      // myaudio.src = data.playlistSongs[0];
      // console.log(data.playlistSongs[0]);
      // console.log(Array.isArray(data.playlistSongs));
      if (data) {
        Object.keys(data).forEach((key) => {
          const value = data[key];
          console.log(`Key: ${key}, Value:`, value);
          const button = document.createElement("button");
          const div = document.createElement("div");
          div.setAttribute("data-id", key);
          button.textContent = value.playlistName;
          div.appendChild(button);
          flowcont.appendChild(div);
          div.style.display = "flex";
          div.style.flexDirection = "column";
          div.style.margin = "15px";
          div.style.width = "50%";
          button.style.padding = "10px";
          div.addEventListener("click", (e) => {
            audiodiv.innerHTML = "";
            const audioDiv = document.createElement("div");
            const musicId = e.currentTarget.getAttribute("data-id");
            const audioRef = ref(database, `playlist/${user.uid}`);
            onValue(audioRef, (snap) => {
              const data = snap.val();
              const allSongs = data[musicId].playlistSongs;
              allSongs.forEach((element) => {
                const div = document.createElement("div");
                div.className = "song-wrapper";
                const songCont = document.createElement("div");

                songCont.className = "song-cont";

                div.className = "song-wrapper";
                const img = document.createElement("img");
                const songName = document.createElement("button");
                const btn = document.createElement("button");

                img.src = element.songImg;
                img.style.width = "70px";
                img.style.height = "70px";
                img.style.borderRadius = "50%";
                img.style.marginLeft = "10px";
                img.style.border = "2px solid green";

                songCont.appendChild(btn);
                songCont.appendChild(songName);
                div.setAttribute("data-song-url", element.songUrl);
                btn.setAttribute("data-song-url", element.songUrl);
                btn.textContent = element.artistName;
                // div.setAttribute("data-song-id", element.id);
                btn.style.color = "white";
                btn.style.fontSize = "1rem";
                btn.style.backgroundColor = "transparent";
                btn.style.border = "none";

                songName.textContent = element.albumName;
                songName.style.display = "flex";
                songName.style.color = "white";
                songName.style.fontSize = "1rem";
                songName.style.backgroundColor = "transparent";
                songName.style.border = "none";

                div.appendChild(img);
                div.appendChild(songCont);
                audiodiv.appendChild(div);
                div.addEventListener("click", (e) => {
                  playMusic(e);
                });
              });
              songcontainer.style.display = "none";
              audiodiv.style.display = "block";
            });
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function playMusic(event) {
  console.log("Button clicked, playing music...");
  const songUrl = event.currentTarget.getAttribute("data-song-url");
  console.log("Song URL:", songUrl); // Log the song URL to ensure it's correct
  const songId = event.target.getAttribute("data-song-id");
  const index = Number(songId) - 1;

  // nameCONTPIC.innerText = json[index].artistName;
  // songpicture.style.display = "block";
  // songpicture.src = json[index].songImage;
  // songalbum.innerText = json[index].albumName;

  // if (currentAudio) {
  //   currentAudio.pause();
  //   currentAudio.remove();
  //   currentAudio.currentTime = 0;
  // }

  // Remove any existing audio elements
  const existingAudio = thirdnav.querySelector("audio");
  if (existingAudio) {
    existingAudio.remove();
  }

  // Create a new audio element for the selected song
  const audioTag = document.createElement("audio");
  audioTag.id = "audioPlayer";
  audioTag.setAttribute("src", songUrl);
  audioTag.controls = true;

  // currentAudio = audioTag;

  // Append the audio element to the music container
  audiocont.appendChild(audioTag);
  //   document.getElementById("music").append(audioTag);
  //   musiccontainer.appendChild(audioTag);

  // Play the audio after it's loaded
  audioTag.addEventListener("canplay", () => {
    audioTag
      .play()
      .then(() => {
        pauseSvg.style.display = "flex";
        playPauseBtn.style.display = "none";
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  });

  // Handle error event for invalid or blocked audio
  audioTag.addEventListener("error", (e) => {
    console.error("Failed to load audio:", e);
    alert("Failed to load the audio file.");
    console.log("Failed to load the audio file.");
  });
  const audioPlayer = document.getElementById("audioPlayer");
  // Update seek bar and current time
  document.getElementById("audioPlayer").addEventListener("timeupdate", () => {
    // Update seek bar and current time

    const progress =
      (document.getElementById("audioPlayer").currentTime /
        document.getElementById("audioPlayer").duration) *
      100;
    seekBar.value = progress;
    currentTimeSpan.textContent = formatTime(
      document.getElementById("audioPlayer").currentTime
    );
    durationSpan.textContent = formatTime(
      document.getElementById("audioPlayer").duration
    );
  });

  // Seek functionality
  seekBar.addEventListener("input", () => {
    const duration = audioPlayer.duration;
    const seekTo = (seekBar.value / 100) * duration;
    audioPlayer.currentTime = seekTo;
  });
  muteBtn.addEventListener("click", () => {
    audioPlayer.muted = !audioPlayer.muted;
    muteBtn.style.display = "none";
    unmuteBtn.style.display = "flex";
  });
  unmuteBtn.addEventListener("click", () => {
    audioPlayer.muted = !audioPlayer.muted;
    muteBtn.style.display = "flex";
    unmuteBtn.style.display = "none";
  });

  // Volume control
  volumeBar.addEventListener("input", () => {
    document.getElementById("audioPlayer").volume = volumeBar.value / 100;
  });
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

async function showSuccess(message) {
  return new Promise((resolve) => {
    Swal.fire({
      background: "#28a745",
      color: "#fff",
      height: "fit-content",
      padding: "0 0",
      position: "top",
      showConfirmButton: false,
      text: `${message}`,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      resolve();
    });
  });
}

async function showError(message) {
  return new Promise((resolve) => {
    Swal.fire({
      background: "#f00",
      color: "#fff",
      height: "fit-content",
      padding: "0 0",
      position: "top",
      showConfirmButton: false,
      text: `${message}`,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      resolve();
    });
  });
}
