const episodes = {
  dramaR: ["46.mp3"],
  dramaS: ["76-78.mp3"],
  dramaR2: ["56-59.mp3"],
  dramaP: ["81.mp3"],
  dramaP2: ["84.mp3"],
  dramaS2: ["61-63.mp3", "64-66.mp3"],
  dramaQ: ["82-83.mp3"],
  dramaQ2: ["85-86.mp3", "87-88.mp3", "89-90.mp3", "91-92.mp3"],
  dramaQ3: ["79-80.mp3"],
  dramaT: ["01.mp3", "02.mp3", "03.mp3", "04.mp3", "05.mp3", "06.mp3", "07.mp3", "08.mp3", "09.mp3", "10.mp3"],
  Song1: ["song1.mp3"],
};

// Define starting episodes for each drama
const startingEpisodes = {
  dramaR: 46, // Start displaying from episode 46
  dramaS: 76, // Start displaying from episode 76
  dramaR2: 56, // Start displaying from episode 56
  dramaP: 81, // Start displaying from episode 81
  dramaP2: 84, // Start displaying from episode 84
  dramaS2: 61, // Start displaying from episode 61
  dramaQ: 82, // Start displaying from episode 82
  dramaQ2: 85, // Start displaying from episode 85
  dramaQ3: 79, // Start displaying from episode 79
  dramaT: 1, // Start displaying from episode 1
  Song1: 1, // Start displaying from episode 1
};

// Define the increment value for each drama
const episodeIncrements = {
  dramaP: 1, // Increment by 1
  dramaP2: 1, // Increment by 1
  dramaQ: 2, // Increment by 2
  dramaQ2: 2, // Increment by 2
  dramaQ3: 2, // Increment by 2
  dramaR: 4, // Increment by 4
  dramaS: 3, // Increment by 3
  dramaR2: 4, // Increment by 4
  dramaS2: 3, // Increment by 3
  dramaT: 1, // Increment by 1
  Song1: 1, // Increment by 1
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

  const startEpisode = startingEpisodes[drama] || 1; // Default to 1 if not specified
  const increment = episodeIncrements[drama] || 1; // Default to increment by 1

  // Add episode buttons for the selected drama
  if (episodes[drama]) {
    episodes[drama].forEach((episode, index) => {
      const displayedEpisodeNumber = startEpisode + index * increment;
      const button = document.createElement("button");
      button.textContent = ` ${displayedEpisodeNumber} `;
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
