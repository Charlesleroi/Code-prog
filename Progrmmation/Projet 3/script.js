const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progres = document.getElementById('progres')
const etampeTemps = document.getElementById('etampe-temps')

// Play et Pause le vidéo

function statutVideo() {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Pour updater l'icon play/pause

function updatdePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fas fa-play" fa-2x></i>'
    }else {
        play.innerHTML = '<i class="fas fa-pause" fa-2x></i>'
    }
}

// Pour stopper le vidéo
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}

// Pour updater le temps (chiffre)

function updateProgres() {

    progres.value = (video.currentTime / video.duration) * 100;

    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0' + String(mins);
    }

    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0' + String(secs);
    }

    etampeTemps.innerHTML = `${mins}:${secs}`;


}

//Pour pouvoir changer le temps de la vid.p
function fixerProgresVideo() {
    video.currentTime = (progres.value * video.duration) / 100;
}




//Event Listeners

video.addEventListener('click', statutVideo);
play.addEventListener('click', statutVideo);
stop.addEventListener('click', stopVideo);

video.addEventListener('play', updatdePlayIcon);
video.addEventListener('pause', updatdePlayIcon);

video.addEventListener('timeupdate', updateProgres);
progres.addEventListener('change', fixerProgresVideo);