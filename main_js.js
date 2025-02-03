const songs = [{
    id: 1,
    name: "Shape Of You",
    artist: "Ed Sheeran",
    img: "https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg",
    genre: "pop",
    source: "music/Shape-Of-You(PagalNew.Com.Se).mp3"
}, {
    id: 2,
    name: "All I Ask",
    artist: "Adele",
    img: "https://i.ytimg.com/vi/XIKmW85D0SI/hqdefault.jpg",
    genre: "pop",
    source: "music/Adele - All I Ask.mp3"
}, {
    id: 3,
    name: "Someone Like You",
    artist: "Adele",
    img: "https://i.ytimg.com/vi/LwXQ7WUh-D0/hqdefault.jpg",
    genre: "pop",
    source: "music/Adele-Someone Like You.mp3"
}, {
    id: 4,
    name: "Wonderwall",
    artist: "Oasis",
    img: "https://i.ytimg.com/vi/bx1Bh8ZvH84/hqdefault.jpg",
    genre: "rock",
    source: "music/Oasis - Wonderwall.mp3"
}, {
    id: 5,
    name: "Sugar",
    artist: "Maroon",
    img: "https://i.ytimg.com/vi/09R8_2nJtjg/hqdefault.jpg",
    genre: "hiphop",
    source: "music/Maroon - Sugar.mp3"
}, {
    id: 6,
    name: "Locked Away",
    artist: "R. City",
    img: "https://s3.amazonaws.com/images.imvdb.com/video/288464357840-r-city-1-locked-away_music_video_ov.jpg?v=2",
    genre: "hiphop",
    source: "music/R City  Locked Away ft Adam Levine.mp3"
}];

// *******************************************

// ******************************************
document.getElementById("songSearch").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filteredSongs = songs.filter(song =>
        song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
    );
    const songListContainer = document.querySelector(".song-list");
    songListContainer.innerHTML = "";

    filteredSongs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "song-artist";

        const songLink = document.createElement("a");
        songLink.textContent = `${song.name} - ${song.artist}`;
        songLink.href = "#";

        songLink.addEventListener("click", (event) => {
            event.preventDefault();
            renderCurrentSong(song);
        });

        songDiv.appendChild(songLink);
        songListContainer.appendChild(songDiv);
    });
});


function showSongs() {
    const selectedGenre = document.getElementById("pref").value;
    const songListContainer = document.querySelector(".song-list");
    songListContainer.innerHTML = "";

    const filteredSongs = selectedGenre === "all" ?
        songs :
        songs.filter(song => song.genre === selectedGenre);

    filteredSongs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "song-artist";

        const songLink = document.createElement("a");
        songLink.textContent = `${song.name} - ${song.artist}`;
        songLink.href = "#";

        songLink.addEventListener("click", (event) => {
            event.preventDefault();
            renderCurrentSong(song);
        });

        songDiv.appendChild(songLink);
        songListContainer.appendChild(songDiv);
    });
}

document.getElementById("pref").addEventListener("change", showSongs);
showSongs();


let currentSongIndex = 0;

function renderCurrentSong(song) {
    const songCard = document.querySelector(".middle .detail-section");
    songCard.querySelector(".artist-image img").src = song.img;
    songCard.querySelector(".song-name").textContent = song.name;
    songCard.querySelector(".artist").textContent = song.artist;

    const audioPlayer = document.querySelector(".song-audio audio");
    audioPlayer.src = song.source;
    audioPlayer.play();

    currentPlayingSong = song;

    currentSongIndex = songs.indexOf(song);
}


function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    renderCurrentSong(songs[currentSongIndex]);
}

function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    renderCurrentSong(songs[currentSongIndex]);
}

document.querySelector(".forward").addEventListener("click", playNext);
document.querySelector(".backward").addEventListener("click", playPrevious);


let playlists = {};
let currentPlayingSong = null;


function createPlaylist() {
    const searchBar = document.querySelector(".search-bar");
    const listSection = document.querySelector(".list-section");

    const playlistName = searchBar.value.trim();

    playlists[playlistName] = [];

    const playlistItem = document.createElement("div");
    playlistItem.className = "playlist-item";
    playlistItem.textContent = playlistName;

    playlistItem.addEventListener("click", () => renderPlaylistSong(playlistName));

    listSection.appendChild(playlistItem);

    searchBar.value = "";
}

function renderPlaylistSong(playlistName) {
    const currentList = document.querySelector(".current-list");
    currentList.innerHTML = `<p>${playlistName}</p>`;

    const songList = document.createElement("div");
    songList.className = "playlist-songs";

    playlists[playlistName].forEach((song, index) => {
        const songDiv = document.createElement("div");
        songDiv.className = "playlist-song";
        songDiv.textContent = `${index + 1}. ${song.name} - ${song.artist}`;
        songList.appendChild(songDiv);
    });

    currentList.appendChild(songList);
}


document.querySelector(".create-button").addEventListener("click", createPlaylist);



function addToPlaylist() {
    const selectedPlaylist = document.querySelector(".current-list p").textContent;

    if (!selectedPlaylist || selectedPlaylist === "Current Playlist") {
        alert("Please select a playlist to add the song.");
        return;
    }

    if (!currentPlayingSong) {
        alert("No song is currently playing.");
        return;
    }

    if (!playlists[selectedPlaylist]) {
        playlists[selectedPlaylist] = [];
    }

    const isSongInPlaylist = playlists[selectedPlaylist].some(song => song.id === currentPlayingSong.id);
    if (isSongInPlaylist) {
        alert("This song is already in the playlist.");
        return;
    }

    playlists[selectedPlaylist].push(currentPlayingSong);

    renderPlaylistSong(selectedPlaylist);
}

document.querySelector(".playlist-button").addEventListener("click", addToPlaylist);

document.getElementById("playlistSearch").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const listSection = document.querySelector(".list-section");
    listSection.innerHTML = "";

    Object.keys(playlists).forEach(playlistName => {
        if (playlistName.toLowerCase().includes(query)) {
            const playlistItem = document.createElement("div");
            playlistItem.className = "playlist-item";
            playlistItem.textContent = playlistName;

            playlistItem.addEventListener("click", () => renderPlaylistSong(playlistName));

            listSection.appendChild(playlistItem);
        }
    });
});



function renderPlaylistSong(playlistName) {
    const currentList = document.querySelector(".current-list");
    currentList.innerHTML = `<p>${playlistName}</p>`;

    const songList = document.createElement("div");
    songList.className = "playlist-songs";

    playlists[playlistName].forEach((song, index) => {
        const songDiv = document.createElement("div");
        songDiv.className = "playlist-song";
        songDiv.innerHTML = `
            ${index + 1}. ${song.name} - ${song.artist}
            <button class="remove-song" data-song-id="${song.id}" style="margin-left: 10px;">Remove</button>
        `;

        songDiv.querySelector(".remove-song").addEventListener("click", () => {
            removeFromPlaylist(playlistName, song.id);
        });

        songList.appendChild(songDiv);
    });

    currentList.appendChild(songList);
}

function removeFromPlaylist(playlistName, songId) {
    playlists[playlistName] = playlists[playlistName].filter(song => song.id !== songId);
    renderPlaylistSong(playlistName);
}