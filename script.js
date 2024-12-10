const episodes = {
  仙境: ["EP01.mp3", "EP02.mp3", "EP03.mp3", "EP04.mp3", "EP05.mp3", "EP06.mp3", "EP07.mp3"],
  dramaB: ["EP01.mp3", "EP02.mp3", "EP03.mp3", "EP04.mp3", "EP05.mp3", "EP06.mp3"],
  dramaC: ["episode1.mp3", "episode2.mp3", "episode3.mp3", "episode4.mp3"],
  dramaD: ["episode1.mp3"]
};

function loadDrama(drama) {
  // Highlight the active drama button
  document.querySelectorAll(".drama").forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`button[onclick="loadDrama('${drama}')"]`).classList.add("active");

  // Load the episodes for the selected drama
  const episodeContainer = document.getElementById("episode-buttons");
  episodeContainer.innerHTML = ""; // Clear previous episodes
  episodes[drama].forEach((episode, index) => {
    const button = document.createElement("button");
    button.textContent = `Episode ${index + 1}`;
    button.onclick = () => playEpisode(drama, episode);
    episodeContainer.appendChild(button);
  });

  // Update the latest drama in localStorage
  localStorage.setItem("latestDrama", drama);
  updateLatestSelection();
}

function playEpisode(drama, episode) {
  // Play the selected episode
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = `audio/${drama}/${episode}`;
  audioPlayer.play();

  // Highlight the active episode button
  document.querySelectorAll("#episode-buttons button").forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Update the latest episode in localStorage
  localStorage.setItem("latestEpisode", `${drama} - ${episode}`);
  updateLatestSelection();
}

function updateLatestSelection() {
  const latestDrama = localStorage.getItem("latestDrama") || "None";
  const latestEpisode = localStorage.getItem("latestEpisode") || "None";

  document.getElementById("latest-drama").textContent = latestDrama;
  document.getElementById("latest-episode").textContent = latestEpisode;
}

// Initialize the latest selection on page load
updateLatestSelection();