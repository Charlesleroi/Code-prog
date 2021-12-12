const jours = document.getElementById('jours');
const heures = document.getElementById('heures');
const minutes = document.getElementById('minutes');
const secondes = document.getElementById('secondes');
const decompte = document.getElementById('decompte');
const annee = document.getElementById('annee');
const telechargement = document.getElementById('telechargement');

const anneeCourrante = new Date().getFullYear();

const jourDeLan = new Date(`January 01 ${anneeCourrante + 1} 00:00:00`);

//Affichage de l'année

annee.innerText = anneeCourrante + 1;

//Update du décompte 

function updateDecompte() {

    const dateActuelle = new Date();

    const diff = jourDeLan - dateActuelle;

    const j = Math.floor(diff / 1000 / 60 / 60 /24);
    const h = Math.floor(diff / 1000 / 60 / 60) %24;
    const m = Math.floor(diff / 1000 / 60) %60;
    const s = Math.floor(diff / 1000) %60;

    
    jours.innerHTML = j;
    heures.innerHTML = h > 10 ? '0' + h : h;
    minutes.innerHTML = m > 10 ? '0' + m : m;
    secondes.innerHTML = s > 10 ? '0' + s : s;
}

//Loading

setTimeout(() => {
    telechargement.remove();
    decompte.style.display = 'flex';
},1000);





//Auto uptade

setInterval(updateDecompte, 1000);

