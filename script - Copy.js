const episodes = {
  dramaA: ["1.mp3", "2.mp3", "3.mp3", "4.mp3", "5.mp3", "6.mp3", "7.mp3", "8.mp3", "9.mp3", "10.mp3","11.mp3", "12.mp3", "13.mp3", "14.mp3", "15.mp3", "EP16.mp3", "EP17.mp3", "EP18.mp3", "EP19.mp3", "EP20.mp3", "EP21.mp3", "EP22.mp3", "EP23.mp3", "EP24.mp3", "EP25.mp3","EP26.mp3", "EP27.mp3", "EP28.mp3", "EP29.mp3", "EP30.mp3", "EP31.mp3", "EP32.mp3"],
  dramaB: ["EP01.mp3", "EP02.mp3", "EP03.mp3", "EP04.mp3", "EP05.mp3", "EP06.mp3"],
  dramaC: ["EP01.mp3", "EP02.mp3", "EP03.mp3", "EP04.mp3", "EP05.mp3", "EP06.mp3", "EP07.mp3"],
};

const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const stopBtn = document.getElementById("stop-btn");
const refreshBtn = document.getElementById("refresh-btn");

let activeDramaButton = null; // To track the active drama button
let activeEpisodeButton = null; // To track the active episode button
let isPlaying = false;

function loadEpisodes(drama) {
  const episodeDiv = document.getElementById("episode-buttons");
  episodeDiv.innerHTML = ""; // Clear episode buttons

  // Highlight the active drama button
  if (activeDramaButton) resetButtonStyle(activeDramaButton); // Reset previous drama button
  const dramaButtons = document.getElementById("drama-buttons").children;
  for (let button of dramaButtons) {
    if (button.dataset.drama === drama) {
      activeDramaButton = button;
      setActiveButtonStyle(button); // Highlight selected drama button
    }
  }

  // Add episode buttons for the selected drama
  if (episodes[drama]) {
    episodes[drama].forEach((episode, index) => {
      const button = document.createElement("button");
     // button.textContent = `第 ${index + 1} 集`;
	  button.textContent = ` ${index + 1} `;
      button.dataset.episode = episode; // Store episode info
      button.onclick = () => playEpisode(button, drama, episode);
      episodeDiv.appendChild(button);
    });
  }
}

function playEpisode(button, drama, episode) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = `audio/${drama}/${episode}`;
  audioPlayer.play();

  // Highlight the active episode button
  if (activeEpisodeButton) resetButtonStyle(activeEpisodeButton); // Reset previous episode button
  setActiveButtonStyle(button); // Highlight current episode button
  activeEpisodeButton = button;

  // Ensure the Play/Pause button shows "Pause" and updates state
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
  isPlaying = true;
}

function setActiveButtonStyle(button) {
  button.style.backgroundColor = "blue";
  button.style.color = "white";
}

function resetButtonStyle(button) {
  button.style.backgroundColor = "";
  button.style.color = "";
}

// Play/Pause Button
playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  } else {
    audioPlayer.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  }
  isPlaying = !isPlaying;
});

// Stop Button
stopBtn.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0; // Reset to the beginning
  isPlaying = false;
  playIcon.style.display = "inline";
  pauseIcon.style.display = "none";
});

// Refresh Page
refreshBtn.addEventListener("click", () => {
  location.reload();
});
