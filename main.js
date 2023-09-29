//variables
const player = document.querySelector('.player');

const title = document.querySelector('.player__song');
const coverImg = document.querySelector('.cover__img');
const coverBg = document.querySelector('.player__cover-rotate');


const playBtn = document.querySelector('.play');
const playBtnImg = document.querySelector('.playBtn-img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const audio = document.querySelector('.audio');

const progressBar = document.querySelector('.player__progress');
const progress = document.querySelector('.progress');

const cTime = document.querySelector('.currentTime');
const dTime = document.querySelector('.durationTime');

const modalOne = document.querySelector('#modalOne');
const modalTwo = document.querySelector('#modalTwo');
const modalThree = document.querySelector('#modalThree');

const discoBall = document.querySelector('.gif-discoball');
const danceMan = document.querySelector('.gif-danceman');

//volume bar
const volume = audio.volume;
const input = document.querySelector('.input__audio');
input.value = volume * 100;
input.oninput = () => {
    // Получить новое значение громкости
    const newVolume = input.value / 100;

    // Установить новое значение громкости
    audio.volume = newVolume;
  };

//song titles
const songs =['fiksiki', 'krokodil', '30let'];
//first song
let songIndex = 2
//init
function loadSong (song) {
    title.innerHTML = song;
    audio.src = `assets/audio/${song}.mp3`;
    coverImg.src = `assets/img/cover${songIndex + 1}.jpeg`
}
loadSong(songs[songIndex]);
//play
function playSong() {
    audio.play();
    player.classList.add('play');
    playBtnImg.src = './assets/svg/pause.svg';
    dTime.classList.remove('none');
    discoBall.classList.add('gif-open');
    danceMan.classList.add('gif-open');
}
//pause
function pauseSong() {
    audio.pause();
    playBtnImg.src = './assets/svg/play.svg';
    discoBall.classList.remove('gif-open');
    danceMan.classList.remove('gif-open');
}
playBtn.addEventListener('click', () =>{
    const isPlaying = player.classList.contains('play');
    console.log(isPlaying);
    if (isPlaying) {
        pauseSong();
        console.log('index');
        player.classList.remove('play');
        coverBg.classList.remove('active');
    }else {
        playSong();
        coverBg.classList.add('active');
    }
})
// change songs
//next btn
function nextSong () {
    songIndex ++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    console.log(songIndex);
    changeModal();

}
nextBtn.addEventListener('click', nextSong);
//prev btn
function prevSong () {
    songIndex --;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
    console.log(songIndex);
    changeModal();

}
prevBtn.addEventListener('click', prevSong);

//progressBar
function updateProgress (e) {
    const {duration, currentTime} = e.srcElement;
    const differents = (duration - currentTime);
    //songTime
    cTime.innerHTML = formatTime(currentTime);
    dTime.innerHTML = formatTime(differents);

    const progressPercent =(currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

}
audio.addEventListener('timeupdate', updateProgress)



function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
//setProgress
function setProgress (e){
    //ширина всего прогресс бара, координаты где мы кликнули и длинна трека
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width * duration);
}
progressBar.addEventListener('click', setProgress);
//autoPlay
audio.addEventListener('ended', nextSong);
//Создаю три HTML модалки со своими ID, далее пишу на js если  songIndex = 0 то кидаю класс close на вторую и третью модалку и так далее
function changeModal () {
    if(songIndex === 0){
        modalOne.classList.add('close');
        modalTwo.classList.add('close');
        modalThree.classList.remove('close');
    }
    if (songIndex === 1) {
        modalOne.classList.add('close');
        modalTwo.classList.remove('close');
        modalThree.classList.add('close');

    }
    if (songIndex === 2) {
        modalOne.classList.remove('close');
        modalTwo.classList.add('close');
        modalThree.classList.add('close');
    }
}

