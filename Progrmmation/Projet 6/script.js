const motEl = document.getElementById('mot');
const mauvaisesLettres = document.getElementById('mauvaises-lettres');
const rejouerBtn = document.getElementById('play-bouton');
const popup = document.getElementById('popup-contenant');
const notification = document.getElementById('notification-contenant');
const messageFinal = document.getElementById('message-final');

const figurePartie = document.querySelectorAll('.figure-partie');

const mots = ['ludovick', 'charles', 'pedro', 'julien', 'laurent', 'william', 'emile'];

// Sélectionner un mot pour jouer
let motSelectionne = mots[Math.floor(Math.random() * mots.length)];

console.log(motSelectionne);

const bonnesLettresArr = [];
const mauvaisesLettresArr = [];

//Afficher le mot caché
function afficherMot() {

    motEl.innerHTML = `
        ${motSelectionne
            .split('')
            .map(
                lettre => `
                    <span class="lettre">
                        ${bonnesLettresArr.includes(lettre) ? lettre :''}
                    </span>
                `
            )
            .join('')
        }    
    `;

    const motInterne = motEl.innerText.replace(/\n/g, '');

    console.log(motEl.innerText, motInterne);  
    
    if(motInterne === motSelectionne) {
        messageFinal.innerText = 'Bravo! Tu as gagné! :D';
        popup.style.display = 'flex';
    }

}

//Mauvaises Lettres

function updateMauvaisesLettresEl() {
    //Afficher les mauvaises lettres

    mauvaisesLettres.innerHTML = `
        ${mauvaisesLettresArr.map (lettre => ` <span> ${lettre}</span>`)}   
    `

    //Afficher le bonhomme
    figurePartie.forEach((partie, index) => {
        const erreurs = mauvaisesLettresArr.length;

        if(index < erreurs) {
            partie.style.display = 'block';
        } else {
            partie.style.display = 'none';
        }
    });

    //Vérifier la défaite

    if (mauvaisesLettresArr.length === figurePartie.length) {
        messageFinal.innerText = 'Malheureusement, tu as perdu! :(';
        popup.style.display = 'flex';
    }
}

//Afficher la notif

function afficherNotification() {
    notification.classList.add('afficher');

    setTimeout(() => {
        notification.classList.remove('afficher');
    }, 2000);
}

//EVENT LISTINERS

window.addEventListener('keydown', e => {
    //console.log(e.keyCode);

    if(e.keyCode >= 65 && e.keyCode <= 90) {

        const lettre = e.key;
        //console.log(lettre);

        if(motSelectionne.includes(lettre)) {

            if(!bonnesLettresArr.includes(lettre)) {
                bonnesLettresArr.push(lettre);

                afficherMot();                
            } else {
                afficherNotification();
            }
            
        } else {

            if(!mauvaisesLettresArr.includes(lettre)){
                mauvaisesLettresArr.push(lettre);

                updateMauvaisesLettresEl();
            } else {
                afficherNotification();
            }

        }
    }
});

//Rejouer et recommencer

rejouerBtn.addEventListener('click', () => {
    //vider les arrays
    bonnesLettresArr.splice(0);
    mauvaisesLettresArr.splice(0);

    motSelectionne = mots[Math.floor(Math.random() * mots.length)];

    afficherMot();

    updateMauvaisesLettresEl();

    popup.style.display = 'none';
});



afficherMot();