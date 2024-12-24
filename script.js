const songs = [
  {
    id: 1,
    name: "Tum Hi Ho",
    artist: "Arijit Singh",
    img: "assets/Tum hi ho.jpg",
    genre: "Romantic",
    source: "assets/Tum hi ho.mp3",
  },
  {
    id: 2,
    name: "Bad Boy",
    artist: "Shahid Mallya",
    img: "assets/Bad Boy.jpg",
    genre: "Pop",
    source: "assets/Bad Boy.mp3",
  },
  {
    id: 3,
    name: "Radha",
    artist: "Pritam Chakraborty",
    img: "assets/Radha.jpg",
    genre: "Party",
    source: "assets/Radha.mp3",
  },
  {
    id: 4,
    name: "Tum Mile",
    artist: "Soham Chakraborty",
    img: "assets/Tum Mile.jpg",
    genre: "Romantic",
    source: "assets/Tum Mile.mp3",
  },
  {
    id: 5,
    name: "London Thumakda",
    artist: "Dhvani Bhanushali",
    img: "assets/London Thumakda.jpg",
    genre: "Party",
    source: "assets/London Thumakda.mp3",
  },
  {
    id: 6,
    name: "Kar Gayi Chull",
    artist: "Badshah, Neha Kakkar",
    img: "assets/Kar Gayi Chull.jpg",
    genre: "Party",
    source: "assets/Kar Gayi Chull.mp3",
  },
  {
    id: 7,
    name: "Zehnaseeb",
    artist: "Arijit Singh",
    img: "assets/Zehnaseeb.jpg",
    genre: "Romantic",
    source: "assets/Zehnaseeb.mp3",
  },

  // Add more songs here
];
let playlists = []; // Array to store all playlists
let currentSongIndex = 0; // Index of the currently playing song
let audio = new Audio(); // Create an Audio object to play songs

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  showSongs(); // Display all songs when the page loads
  renderCurrentSong(songs[currentSongIndex].id); // Render the first song in the song card

  // Add event listeners for various button clicks and actions
  document
    .getElementById("toggle-theme")
    .addEventListener("click", toggleTheme); // Toggle theme button
  document.getElementById("prev").addEventListener("click", playPrev); // Previous song button
  document.getElementById("next").addEventListener("click", playNext); // Next song button
  document.getElementById("play").addEventListener("click", playSong); // Play song button
  document.getElementById("pause").addEventListener("click", pauseSong); // Pause song button
  document
    .getElementById("add-to-playlist")
    .addEventListener("click", addToPlaylist); // Add to playlist button
  document
    .getElementById("create-playlist")
    .addEventListener("click", createPlaylist); // Create playlist button
  document.getElementById("genre-filter").addEventListener("change", showSongs); // Genre filter dropdown
  document.getElementById("search-songs").addEventListener("input", showSongs); // Search songs input field
  document
    .getElementById("search-playlist")
    .addEventListener("input", renderPlaylists); // Search playlists input field
});

// Function to toggle between light and dark themes
function toggleTheme() {
  const body = document.body; // Get the body element
  const currentTheme = body.getAttribute("data-theme"); // Get the current theme
  body.setAttribute("data-theme", currentTheme === "light" ? "dark" : "light"); // Toggle the theme attribute
}

// Function to display all songs based on filters
function showSongs() {
  const genreFilter = document.getElementById("genre-filter").value; // Get selected genre from dropdown
  const searchQuery = document
    .getElementById("search-songs")
    .value.toLowerCase(); // Get search query from input field
  const songList = document.getElementById("song-list"); // Get the element to display the song list
  songList.innerHTML = ""; // Clear the song list

  // Filter songs based on genre and search query
  const filteredSongs = songs.filter((song) => {
    return (
      (genreFilter === "" || song.genre === genreFilter) && // Filter by genre
      song.name.toLowerCase().includes(searchQuery) // Filter by search query
    );
  });

  // Display each filtered song
  filteredSongs.forEach((song) => {
    const songDiv = document.createElement("div"); // Create a div for each song
    songDiv.className = "filteredSongs"; // Set class for styling
    songDiv.textContent = `${song.name} - ${song.artist}`; // Set the text content
    songDiv.addEventListener("click", () => renderCurrentSong(song.id)); // Add click event to render the song
    songList.appendChild(songDiv); // Add the song div to the song list
  });
}

// Function to render the current song in the song card
function renderCurrentSong(songId) {
  pauseSong(); // Pause the current song before switching to a new one
  const song = songs.find((s) => s.id === songId); // Find the song by its ID
  document.getElementById("song-img").src = song.img; // Set the song image
  document.getElementById("song-name").textContent = song.name; // Set the song name
  document.getElementById("song-artist").textContent = song.artist; // Set the artist name
  currentSongIndex = songs.indexOf(song); // Update the current song index
}

// Function to play the current song
function playSong() {
  const song = songs[currentSongIndex]; // Get the current song
  if (audio.src !== song.source) {
    // Check if the audio source is different
    audio.src = song.source; // Set the new audio source
  }
  audio.play(); // Play the song
}

// Function to pause the current song
function pauseSong() {
  audio.pause(); // Pause the song
}

// Function to play the previous song
function playPrev() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Calculate the previous song index
  renderCurrentSong(songs[currentSongIndex].id); // Render the previous song
  playSong(); // Play the previous song
}

// Function to play the next song
function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length; // Calculate the next song index
  renderCurrentSong(songs[currentSongIndex].id); // Render the next song
  playSong(); // Play the next song
}

// Function to add the current song to a playlist
function addToPlaylist() {
  const playlistName = prompt("Enter the playlist name:"); // Prompt the user for a playlist name
  if (!playlistName) return; // Return if no name is entered

  let playlist = playlists.find((pl) => pl.name === playlistName); // Find the playlist by name
  if (!playlist) {
    // If the playlist does not exist
    playlist = { name: playlistName, songs: [] }; // Create a new playlist
    playlists.push(playlist); // Add the playlist to the playlists array
    renderPlaylists(); // Update the playlists view
  }

  const song = songs[currentSongIndex]; // Get the current song
  if (!playlist.songs.includes(song)) {
    // If the song is not already in the playlist
    playlist.songs.push(song); // Add the song to the playlist
  }
}

// Function to create a new playlist
function createPlaylist() {
  const playlistName = prompt("Enter the new playlist name:"); // Prompt the user for a new playlist name
  if (!playlistName) return; // Return if no name is entered

  if (playlists.some((pl) => pl.name === playlistName)) {
    // Check if the playlist already exists
    alert("Playlist already exists."); // Alert the user if the playlist exists
    return;
  }

  const newPlaylist = { name: playlistName, songs: [] }; // Create a new playlist
  playlists.push(newPlaylist); // Add the new playlist to the playlists array
  renderPlaylists(); // Update the playlists view
}

// Function to render all playlists based on the search query
function renderPlaylists() {
  const searchQuery = document
    .getElementById("search-playlist")
    .value.toLowerCase(); // Get the search query from the input field
  const playlistList = document.getElementById("playlist-list"); // Get the element to display the playlist list
  playlistList.innerHTML = ""; // Clear the playlist list

  // Filter playlists based on the search query
  const filteredPlaylists = playlists.filter(
    (playlist) => playlist.name.toLowerCase().includes(searchQuery) // Filter by search query
  );

  // Display each filtered playlist
  filteredPlaylists.forEach((playlist) => {
    const li = document.createElement("li"); // Create a list item for each playlist
    li.textContent = playlist.name; // Set the playlist name
    li.addEventListener("click", () => renderPlaylistSongs(playlist.name)); // Add click event to render the playlist songs
    playlistList.appendChild(li); // Add the playlist to the playlist list
  });
}

// Function to render songs in a selected playlist
function renderPlaylistSongs(playlistName) {
  const playlist = playlists.find((pl) => pl.name === playlistName); // Find the playlist by name
  if (!playlist) return; // Return if the playlist does not exist

  const songList = document.getElementById("song-list"); // Get the element to display the song list
  songList.innerHTML = ""; // Clear the song list
  playlist.songs.forEach((song) => {
    // Iterate through the songs in the playlist
    const songDiv = document.createElement("div"); // Create a div for each song
    songDiv.className = "filteredSongs"; // Set class for styling
    songDiv.textContent = `${song.name} - ${song.artist}`; // Set the text content
    songDiv.addEventListener("click", () => renderCurrentSong(song.id)); // Add click event to render the song
    songList.appendChild(songDiv); // Add the song div to the song list

    const removeButton = document.createElement("button"); // Create a button to remove the song
    removeButton.textContent = "Remove"; // Set the button text
    removeButton.addEventListener(
      "click",
      () => removeFromPlaylist(playlist.name, song.id) // Add click event to remove the song from the playlist
    );
    songDiv.appendChild(removeButton); // Add the button to the song div
  });
}

// Function to remove a song from a playlist
function removeFromPlaylist(playlistName, songId) {
  const playlist = playlists.find((pl) => pl.name === playlistName); // Find the playlist by name
  if (!playlist) return; // Return if the playlist does not exist
}
