/* 

let songPlay = document.getElementById('songPlay');
let next = document.getElementById('next');
let previous = document.getElementById('previous');




const songs = [
    {
        id: '1',
        songName: 'Song-1',
        artist: 'Artist-1',
        poster: 'img-example.png',
        audio: 'example.mp3'
    },
    {
        id: '2',
        songName: 'Song-2',
        artistName: 'Artist-2',
        poster: 'img-example.png',
        audio: 'example.mp3'
    }
]

let index = 0;  

let artistName = document.getElementById('song-artist');
console.log(artistName)
artistName = songs[index].artist;
console.log(artistName);


const music = new Audio (songs[index].audio);   

songPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        songPlay.classList.remove('fa-circle-play');
        songPlay.classList.add('fa-circle-pause');
    } else {
        music.pause();
        songPlay.classList.add('fa-circle-play');
        songPlay.classList.remove('fa-circle-pause');
    }
})
next.addEventListener('click', () => {
    console.log('apretaste siguiente');
})
previous.addEventListener('click', () => {
    console.log('apretaste anterior');
})

Array.from (document.getElementsByClassName('track')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
});


let title = document.getElementsByClassName('song-info');
Array.from(document.getElementsByClassName('songs')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        music.src = `audio/${index}.mp3`;
        music.play();
    });

}) */

//Player
const play = document.querySelector('.fa-circle-play');
const foward = document.querySelector('.fa-forward-step');
const previous = document.querySelector('.fa-backward-step');

// Song Info
 const trackImg = document.querySelector('.song-img');
 const songName = document.querySelector('.song-name');
 const songArtist = document.querySelector('.song-artist');

 //Volume
 const volumeRange = document.querySelector('.vol-bar');
 const volumeDot = document.querySelector('#volDot');

 //Duration
 const duration = document.querySelector('#bar2');
 const durationDot = document.querySelector('.dot');
 const timeStar = document.querySelector('#currentStart');
 const timeEnd = document.querySelector('#currentEnd');



 //Autoplay
 const autoPlay = document.querySelector('.playAll');


//Global Variables
let timer;
let selfPlay = 0;
let i = 0;
let songIsPlaying = false;
let track = document.createElement('audio');

//
play.addEventListener("click", playPause);

// Load Tracks 
function loadTrack(i) {
    track.src = tracklist[i].path;
    trackImg.src = tracklist[i].img;
    songName.innerHTML = tracklist[i].name;
    songArtist.innerHTML = tracklist[i].artist;
    track.load();
}
loadTrack(i);

//Play Song
function playPause() {
    track.play();
    songIsPlaying = true;
    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
}


