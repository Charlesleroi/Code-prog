const postContenant = document.querySelector('.post-contenant');
const telechargement = document.querySelector('.telechargement');
const filtre = document.getElementById('filtre');

const limite = 5;
let page = 1;

async function jspquand() {
	const result = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limite}&_page=${page}`,
	);
	const data = await result.json();
	return data;

}
async function tbo() {
	const posts = await jspquand();

	posts.forEach((post) => {
		const postEl = document.createElement('div');
		postEl.classList.add('post');
		postEl.innerHTML = `
				<div class="numero"> ${post.id} </div> 
				<div class="post-info">
					<h2 class="post-titre"> ${post.title} </h2>
					<p class="post-texte"> ${post.body} </p>
				</div>
			`;

		postContenant.appendChild(postEl);

	});

}


function letelec() {
	telechargement.classList.add('afficher');
	setTimeout(() => {
		telechargement.classList.remove('afficher');
		setTimeout(() => {

			page++;
			tbo();

		}, 300);

	}, 1000);

}

tbo();


window.addEventListener('scroll', () => {
	const scrollTop = document.documentElement.scrollTop;

	const scrollHeight = document.documentElement.scrollHeight;

	const clientHeight = document.documentElement.clientHeight;

	if (scrollTop + clientHeight >= scrollHeight - 5) {
		letelec();
	}

});

function filtrePosts(e) {

	const terme = e.target.value.toUpperCase();
	const posts = document.querySelectorAll('.post');
	posts.forEach((post) => {
		const titre = post.querySelector('.post-titre').innerText.toUpperCase();

		const texte = post.querySelector('.post-texte').innerText.toUpperCase();

		if (titre.indexOf(terme) > -1 || texte.indexOf(terme) > -1) {
			post.style.display = 'flex';
		}
		else {
			post.style.display = 'none';
		}

	});

}

filtre.addEventListener('input', filtrePosts);