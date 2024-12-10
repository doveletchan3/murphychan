const episodes = {
  dramaA: ["EP01.mp3", "EP02.mp3", "EP03.mp3", "EP04.mp3", "EP05.mp3", "EP06.mp3", "EP07.mp3", "EP08.mp3", "EP09.mp3", "EP10.mp3"],
  dramaB: ["EP01.mp3", "EP02.mp3", "EP03.mp3", "EP04.mp3", "EP05.mp3", "EP06.mp3"],
  dramaC: ["EP01.mp3", "EP02.mp3", "EP03.mp3", "EP04.mp3", "EP05.mp3", "EP06.mp3", "EP07.mp3"],
};
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const stopBtn = document.getElementById("stop-btn");

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
      button.textContent = `第 ${index + 1} 集`;
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
    playPauseBtn.textContent = "Play";
  } else {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
  }
  isPlaying = !isPlaying;
});

// Stop Button
stopBtn.addEventListener("click", () => {
  audioPlayer.pause();
  audioPlayer.currentTime = 0; // Reset to the beginning
  isPlaying = false;
  playPauseBtn.textContent = "Play";
});