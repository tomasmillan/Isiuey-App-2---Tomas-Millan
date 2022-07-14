//Player
const play = document.querySelector('.fa-circle-play');
const foward = document.querySelector('.fa-forward-step');
const previous = document.querySelector('.fa-backward-step');

// Playlist
 const trackImg = document.querySelector('.song-img');
 const songName = document.querySelector('.song-name');
 const songArtist = document.querySelector('.song-artist');
 const songs = document.querySelector('.songs');

 //Player Info
 const playerArtistName = document.querySelector('.playerArtistName')
 const playerSongName = document.querySelector('.playerSongName')

 //Volume
 const volumeRange = document.querySelector('.vol-bar');
 const volumeDot = document.querySelector('.dot-vol');
 const mute = document.querySelector('.fa-volume-high');
 const volumeIcon = document.querySelector('.fa-volume-high');
 const volValue = document.querySelector('#actualVol');
 
 
 //Duration
 const durationBar = document.querySelector('.bar2');
 const durationDot = document.querySelector('.dot');
 const timeStar = document.querySelector('#currentStart');
 const timeEnd = document.querySelector('#currentEnd');



//Global Variables
let timer;
let selfPlay = 0;
let i = 0;
let songIsPlaying = false;
let track = document.createElement('audio');

//Events
play.addEventListener("click", playPause);
foward.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong); 
track.addEventListener("ended", nextSong);
mute.addEventListener("click", muteSong);
volumeRange.addEventListener("change", changeVolume);
volumeDot.addEventListener("change", changeVolume);
durationBar.addEventListener("change", changeDuration);


// Load Tracks 
function loadTrack(i) {
    track.src = tracklist[i].path;
   // trackImg.src = tracklist[i].img;
    playerSongName.innerHTML = tracklist[i].name;
    playerArtistName.innerHTML = tracklist[i].artist;


    track.load();

    timer = setInterval(seekUpdate, 1000);
}
loadTrack(i);

function seekUpdate() {
    let seekPosition = 0;
    
    // Check if the current track duration is a legible number
    if (!isNaN(track.duration)) {
        seekPosition = track.currentTime * (100 / track.duration);
        durationDot.value = seekPosition;
        durationBar.value = seekPosition;
    
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(track.currentTime / 60);
        let currentSeconds = Math.floor(track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(track.duration / 60);
        let durationSeconds = Math.floor(track.duration - durationMinutes * 60);
    
        // Add a zero to the single digit time values
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        // Display the updated duration
        timeStar.textContent = currentMinutes + ":" + currentSeconds;
        timeEnd.textContent = durationMinutes + ":" + durationSeconds;
    }
    }
function playPause() {
    if (songIsPlaying == false) {
        playSong();
    } else {
        pauseSong();
    }
}
//Play Song
function playSong() {
    track.play();
    songIsPlaying = true;
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
}

//Pause Song
function pauseSong() {
    track.pause();
    songIsPlaying = false;
    play.classList.remove('fa-circle-pause');
    play.classList.add('fa-circle-play');
}



//Next Song
function nextSong() {
    if (i < tracklist.length - 1) {
        i++;
        loadTrack(i);
        playPause();
    } else {
        i = 0;
        loadTrack(i);
        playPause();
    }
}
function previousSong() {
    if (i > 0) {
        i--;
        loadTrack(i);
        playPause();
    } else {
        i = tracklist.list - 1;
        loadTrack(i);
        playPause();
    }
}

//MuteVolume
function muteSong() {
    track.volume = 0;
    volumeIcon.classList.remove('fa-volume-high');
    volumeIcon.classList.add('fa-volume-low');
    actualVol.value = 0;
}

function changeVolume() {
    track.volume = volumeBar.value / 100;

}

function changeDuration() {
    let durationPosition = track.duration * (durationBar.value / 100);
    track.currentTime = durationPosition;
    durationBar.innerHTML = track.currentTime;
    durationDot.innerHTML = track.currentTime;
    timeEnd.textContent = durationPosition;

}

function resetValues() {
    timeStar.textContent = "00:00";
    timeEnd.textContent = "00:00";
    durationDot.value = 0;
    durationDot.innerHTML = 0;
    }


    //trackImg songName songArtist

    function playlistShow() {
        for(let x = 0; x < tracklist.length; x++ ) {
            let infoDiv = document.createElement('div');
            infoDiv.classList.add('track');
            infoDiv.innerHTML = `
            <div class="track">
                        <img src="${tracklist[x].img}" class="song-img">
                        <div class="song-info">
                            <h5 class="song-name">${tracklist[x].name}</h6>
                            <h6 class="song-artist">${tracklist[x].artist}</h6>
                        </div>
                    </div>
            `
            songs.appendChild(infoDiv);
        }
        playFromPlaylist();
    }
    playlistShow();

   function playFromPlaylist() {
        songs.addEventListener('click', (e) => {
             if(e.target.classList.contains('song-name')) {
                const songPosition = tracklist.findIndex((item, index) => {
                    if(item.name === e.target.innerHTML){
                        return true;
                    }
                });
                loadTrack();
                playPause();
             }
        });
    }