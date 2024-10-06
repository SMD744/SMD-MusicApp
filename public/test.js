// const audio = document.getElementById("audioPlayer");
const playPauseBtn = document.getElementById("playPauseBtn");
const seekBar = document.getElementById("seekBar");
const currentTimeSpan = document.getElementById("currentTime");
const durationSpan = document.getElementById("duration");
const muteBtn = document.getElementById("muteBtn");
const unmuteBtn = document.getElementById("unmuteBtn");
const volumeBar = document.getElementById("volumeBar");
const URI = "https://robo-music-api.onrender.com/music/my-api";
const songcontainer = document.getElementById("songcontainer");
// const musiccontainer = document.getElementById("musiccontainer");

// Fetch and display music buttons
const fetchMusic = async () => {
  try {
    const response = await fetch(URI);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    json.forEach((element) => {
      // Create a button for each song
      const div = document.createElement("div");
      div.className = "song-wrapper";

      div.style.backgroundColor = "#1f1f1f";
      div.style.color = "#fff";
      div.style.width = "95%";
      div.style.height = "95%";
      div.style.alignItems = "center";
      div.style.padding = "10px";
      div.style.margin = "10px";
      div.style.borderRadius = "5px";
      div.style.cursor = "pointer";
      div.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
      div.style.transition = "all 0.3s ease";
      div.style.background = "linear-gradient(to right, #000000, #434343)";
      div.style.borderTop = "0.5px  solid white";
      div.style.borderLeft = "1px  solid white";

      const songCont = document.createElement("div");

      songCont.className = "song-cont";

      div.className = "song-wrapper";
      const img = document.createElement("img");
      const songName = document.createElement("button");
      const btn = document.createElement("button");

      songCont.appendChild(btn);
      songCont.appendChild(songName);

      img.src = element.songImage;
      img.style.width = "70px";
      img.style.height = "70px";
      img.style.borderRadius = "50%";
      img.style.marginLeft = "10px";
      img.style.border = "2px solid green";

      btn.textContent = element.artistName;
      div.setAttribute("data-song-url", element.songUrl); // Store the actual song URL
      btn.style.color = "white";
      btn.style.fontSize = "1rem";
      btn.style.backgroundColor = "transparent";
      btn.style.border = "none";

      songName.textContent = element.songTitle;
      songName.style.display = "flex";
      songName.style.color = "white";
      songName.style.fontSize = "1rem";
      songName.style.backgroundColor = "transparent";
      songName.style.border = "none";

      div.appendChild(img);
      div.appendChild(songCont);

      // Append the button to the song container
      songcontainer.appendChild(div);

      // Add click event listener to each button directly
      div.addEventListener("click", (e) => {
        playMusic(e);
      });
    });
  } catch (error) {
    alert("Failed to fetch music data: " + error.message);
    console.log("Failed to fetch music data: " + error.message);
  }
};

// Function to play the selected song
function playMusic(event) {
  console.log("Button clicked, playing music...");
  const songUrl = event.target.getAttribute("data-song-url");
  console.log("Song URL:", songUrl); // Log the song URL to ensure it's correct

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
// Play/Pause button functionality
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    pauseSvg.style.display = "flex";
    playPauseBtn.style.display = "none";
  } else {
    audioPlayer.pause();
    playPauseBtn.style.display = "none";
    pauseSvg.style.display = "flex";
  }
});

pauseSvg.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    pauseSvg.style.display = "none";
    playPauseBtn.style.display = "flex";
  } else {
    audioPlayer.pause();
    playPauseBtn.style.display = "flex";
    pauseSvg.style.display = "none";
  }
});

// Call fetchMusic to load the music buttons
fetchMusic();

// Helper function to format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
