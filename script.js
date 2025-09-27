const episodes = {
  dramaB: ["140.mp3", "141.mp3", "142.mp3", "143.mp3", "144.mp3", "145.mp3", "146.mp3", "147.mp3", "148.mp3", "149.mp3", "150.mp3", "151.mp3", "152.mp3", "153.mp3", "154.mp3", "155.mp3", "156.mp3", "157.mp3", "158.mp3", "159.mp3", "160.mp3"],
  dramaN: ["10.mp3", "11.mp3", "12.mp3", "13.mp3", "14.mp3", "15.mp3", "16.mp3", "17.mp3", "18.mp3", "19.mp3", "20.mp3", "21.mp3", "22.mp3", "23.mp3", "24.mp3", "25.mp3", "26.mp3", "27.mp3", "28.mp3", "29.mp3", "30.mp3"],
  dramaO: ["01.mp3", "02.mp3", "03.mp3", "04.mp3", "05.mp3", "06.mp3", "07.mp3", "08.mp3", "09.mp3", "10.mp3", "11.mp3", "12.mp3", "13.mp3", "14.mp3", "15.mp3", "16.mp3", "17.mp3", "18.mp3", "19.mp3", "20.mp3", "21.mp3", "22.mp4", "23.mp4", "24.mp4"],
  song1: ["song1.mp3", "song2.mp3"],
//

//
};

// Define starting episodes for each drama
const startingEpisodes = {
  dramaB: 140, // Start displaying from episode 1
  dramaN: 10, // Start displaying from episode 1
  dramaO: 1, // Start displaying from episode 1
  song1: 1, // Start displaying from episode 1
};

// Define the increment value for each drama
const episodeIncrements = {
  dramaB: 1, // Increment by 1
  dramaN: 1, // Increment by 1
  dramaO: 1, // Increment by 1
  song1: 1, // Increment by 1
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
  audioPlayer.src = `https://raw.githubusercontent.com/doveletchan3/murphychan/main/audio/${drama}/${episode}`;

//Old version (Jun 11 2025)
//  audioPlayer.src = `audio/${drama}/${episode}`;

  audioPlayer.play();

  // Highlight the active episode button
  if (activeEpisodeButton) resetButtonStyle(activeEpisodeButton); // Reset previous episode button
  setActiveButtonStyle(button); // Highlight current episode button
  activeEpisodeButton = button;

  // Ensure the Play/Pause button shows "Pause" and updates state
  playIcon.style.display = "none";
  pauseIcon.style.display = "inline";
  isPlaying = true;
  
  // Google Analytics tracking
  if (typeof gtag === 'function') {
    gtag('event', 'play_episode', {
      drama_name: drama,
      episode_file: episode,
      episode_path: `${drama}/${episode}`
    });
  }
  
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
