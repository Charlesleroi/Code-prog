const contenant = document.getElementById('contenant');
const texte = document.getElementById('texte');

const tempsTotal = 9000;
const tempsInspirer = (tempsTotal / 5)*2;
const tempsPause = tempsTotal / 5;

animationRespire();

function animationRespire() {
    texte.innerText = 'Inspire';
    contenant.className = 'contenant grandir'

    setTimeout ( () => {
        texte.innerText = 'Pause...';

        setTimeout (() => {
            texte.innerText = 'Expire';
            contenant.className = 'contenant rapetisser'

        }, tempsPause)

    }, tempsInspirer)
}

setInterval(animationRespire, tempsTotal);