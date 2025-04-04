const episodes = {
  dramaF: ["02.mp3", "04.mp3", "06.mp3", "08.mp3", "10.mp3", "12.mp3", "14.mp3", "16.mp3", "18.mp3", "20.mp3", "22.mp3", "24.mp3", "26.mp3", "28.mp3", "30.mp3"],
  dramaK: ["01.mp3", "02.mp3", "03.mp3", "04.mp3", "05.mp3"],  
  dramaH: ["01.mp3", "02.mp3", "03.mp3", "04.mp3", "05.mp3", "06.mp3", "07.mp3", "08.mp3", "09.mp3", "10.mp3", "11.mp3", "12.mp3", "13.mp3", "14.mp3", "15.mp3", "16.mp3", "17.mp3", "18.mp3", "19.mp3", "20.mp3"],
  dramaL: ["01.mp3", "02.mp3", "03.mp3", "04.mp3"], 
  dramaM: ["01.mp3", "02.mp3", "03.mp3", "04.mp3", "05.mp3"],  
};

// Define starting episodes for each drama
const startingEpisodes = {
  dramaF: 2, // Start displaying from episode 2
  dramaK: 1, // Start displaying from episode 1
  dramaH: 1, // Start displaying from episode 1
  dramaL: 1, // Start displaying from episode 1
  dramaM: 1, // Start displaying from episode 1
};

// Define the increment value for each drama
const episodeIncrements = {
  dramaF: 2, // Increment by 2
  dramaK: 1, // Increment by 1
  dramaH: 1, // Increment by 1
  dramaL: 1, // Increment by 1
  dramaM: 1, // Increment by 1
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
