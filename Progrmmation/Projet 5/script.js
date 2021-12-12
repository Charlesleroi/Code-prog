const musiqueContenant = document.getElementById('musique-contenant');

const btnPlay = document.getElementById('play');
const btnPrecedent = document.getElementById('precedent');
const btnSuivant = document.getElementById('suivant');

const audio = document.getElementById('audio');
const progres = document.getElementById('progres');
const progresContenant = document.getElementById('progres-contenant');

const titre = document.getElementById('titre');
const cover = document.getElementById('cover');

// Titre Chansons
const chansonsArr = ['chanson1', 'chanson2', 'chanson3'];

//Ordre des chansons
let ordreChanson = 0;

//Relier chanson/images
function telechargerChanson (chanson) {
    titre.innerText = chanson;
    audio.src = `Musique/${chanson}.mp3`;
    cover.src = `Images/${chanson}.png`;
}

//Jouer la premiere toune
telechargerChanson(chansonsArr[ordreChanson]);

//Play
function playChanson() {
    musiqueContenant.classList.add('play');
    
    btnPlay.querySelector('i.fas').classList.remove('fa-play');
    btnPlay.querySelector('i.fas').classList.add('fa-pause');
    
    audio.play();
}

function pauseChanson () {
    musiqueContenant.classList.remove('play');

    audio.pause();

    btnPlay.querySelector('i.fas').classList.remove('fa-pause');
    btnPlay.querySelector('i.fas').classList.add('fa-play');
}

//Chanson précédente

function chansonPrecedente() {
    ordreChanson--;

    if(ordreChanson < 0) {
        ordreChanson = chansonsArr.length - 1;
    } 

    telechargerChanson(chansonsArr[ordreChanson]);
    playChanson();
}

//Chanson suivante

function chansonSuivante() {
    ordreChanson++;

    if(ordreChanson > chansonsArr.length - 1) {

        ordreChanson = 0
    } 

    telechargerChanson(chansonsArr[ordreChanson]);

    playChanson();
}

//Update progres
function updateProgres(e) {
    const duree = e.srcElement.duration;
    const tempsCourant = e.srcElement.currentTime;

    const pourcentageProgres = (tempsCourant / duree) *100;

    //Mettre a jour barre de progres
    progres.style.width = `${pourcentageProgres}%`;
}

//fixer progrès yo watsup
function fixerProgres(e) {
    const width = this.clientWidth;

    const cliqueX = e.offsetX;

    const duree = audio.duration;

    audio.currentTime = (cliqueX / width) * duree;
}


//Even listeners

//Play //Pause
btnPlay.addEventListener('click', () => {
    const enTrainDeJouer = musiqueContenant.classList.contains('play');
    
    if(enTrainDeJouer) {
        pauseChanson();
    } else {
        playChanson();
    }
});

//Changer de chanson

btnPrecedent.addEventListener('click', chansonPrecedente);
btnSuivant.addEventListener('click', chansonSuivante);

// Update
audio.addEventListener('timeupdate', updateProgres);

//Clique sur la barre de progrès
progresContenant.addEventListener('click', fixerProgres);

//Quand la chanson fini
audio.addEventListener('ended', chansonSuivante);