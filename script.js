const episodes = {
  dramaH: ["339.mp3", "340.mp3", "341.mp3", "342.mp3", "343.mp3", "344.mp3", "345.mp3", "346.mp3", "347.mp3", "348.mp3", "349.mp3", "350.mp3", "351.mp3", "352.mp3", "353.mp3", "354.mp3", "355.mp3", "356.mp3"],
  song1: ["song1.mp3", "song2.mp3"],
//
//  dramaXXX: ["01.mp3", "02.mp3", "03.mp3", "04.mp3", "05.mp3", "06.mp3", "07.mp3", "08.mp3", "09.mp3", "10.mp3", "11.mp3", "12.mp3", "13.mp3", "14.mp3", "15.mp3", "16.mp3", "17.mp3", "18.mp3", "19.mp3", "20.mp3", "21.mp3", "22.mp3", "23.mp3", "24.mp3", "25.mp3"],
//
};

// Define starting episodes for each drama
const startingEpisodes = {
  dramaH: 339,  // Start displaying from episode 1
  song1: 1, // Start displaying from episode 1
};

// Define the increment value for each drama
const episodeIncrements = {
  dramaH: 1, // Increment by 1
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

// --- Played-episode tracking (persists across reloads via localStorage) ---
const STORAGE_KEY = "playedEpisodes";
let playedEpisodes = loadPlayedEpisodes();

function loadPlayedEpisodes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (e) {
    return new Set();
  }
}

function savePlayedEpisodes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...playedEpisodes]));
  } catch (e) {}
}

function episodeKey(drama, episode) {
  return `${drama}/${episode}`;
}
// ---------------------------------------------------------------------

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

      // Mark as already-played if it's in our stored history
      if (playedEpisodes.has(episodeKey(drama, episode))) {
        button.classList.add("episode-played");
      }

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

  // Record this episode as played (persists across reloads)
  playedEpisodes.add(episodeKey(drama, episode));
  savePlayedEpisodes();
  button.classList.add("episode-played");

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
  button.classList.add("episode-active");
}

function resetButtonStyle(button) {
  button.classList.remove("episode-active");
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
