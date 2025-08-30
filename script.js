// ✅ Liste des pseudos autorisés
const pseudos = ["Mikumisquipasse", "Jérémie123", "Pikratchuu"];
let currentUser = null;

// ✅ Liste des maisons (vide au départ)
let maisons = JSON.parse(localStorage.getItem('maisons')) || [];

// 🔑 Connexion
function seConnecter() {
  const pseudo = document.getElementById('pseudo').value;
  if(!pseudos.includes(pseudo)) {
    document.getElementById('erreur').innerText = "Pseudo invalide !";
    return;
  }
  currentUser = pseudo;
  document.getElementById('connexion').style.display = 'none';
  document.getElementById('catalogue-section').style.display = 'block';
  afficherMaisons(maisons);
  if(currentUser === "Mikumisquipasse") alert("Connecté en tant que chef de l'agence !");
}

// 🔄 Affichage catalogue
function afficherMaisons(maisonList) {
  const catalogue = document.getElementById('catalogue');
  catalogue.innerHTML = '';

  maisonList.forEach(m => {
    const div = document.createElement('div');
    div.className = 'carte';

    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'relative';

    const img = document.createElement('img');
    img.src = m.photos[0];
    img.onclick = () => ouvrirMaison(m.id);

    imgContainer.appendChild(img);

    if (m.vendu) {
      const vendu = document.createElement('div');
      vendu.className = 'vendu';
      vendu.innerText = 'VENDU';
      imgContainer.appendChild(vendu);
    }

    div.appendChild(imgContainer);

    const nom = document.createElement('h2');
    nom.innerText = m.nom;
    div.appendChild(nom);

    const region = document.createElement('p');
    region.innerText = 'Région : ' + m.region;
    div.appendChild(region);

    catalogue.appendChild(div);
  });
}

// 🔎 Filtre
function filtrer(region) {
  if(region === 'All') {
    afficherMaisons(maisons);
  } else {
    afficherMaisons(maisons.filter(m => m.region === region));
  }
}

// 🏠 Ouvrir maison
function ouvrirMaison(id) {
  localStorage.setItem('maisonChoisie', id);
  window.location.href = 'maison.html';
}

// ---------------- Maison.html Logic ----------------
window.addEventListener('DOMContentLoaded', () => {
  if(!document.getElementById('galerie')) return; // on est pas sur maison.html
  const maisonId = parseInt(localStorage.getItem('maisonChoisie'));
  const maison = maisons.find(m => m.id === maisonId);
  if(!maison) return;

  const galerie = document.getElementById('galerie');
  maison.photos.forEach(p => {
    const img = document.createElement('img');
    img.src = p;
    img.style.margin = '5px';
    img.style.width = '300px';
    galerie.appendChild(img);
  });

  document.getElementById('description').innerText = maison.description || "";
  document.getElementById('prix').innerText = 'Prix : ' + maison.prix.join(', ');

  const visiterBtn = document.getElementById('visiterBtn');
  const visiteTermineeBtn = document.getElementById('visiteTermineeBtn');
  const acheterBtn = document.getElementById('acheterBtn');

  if(maison.vendu) {
    visiterBtn.style.display = 'none';
    acheterBtn.style.display = 'none';
  }

  visiterBtn.onclick = () => {
    alert('Notification à Mikumisquipasse : quelqu’un veut visiter cette maison !');
    maison.visiteEnCours = true;
    visiterBtn.style.display = 'none';
    visiteTermineeBtn.style.display = 'inline-block';
  }

  visiteTermineeBtn.onclick = () => {
    alert('Visite terminée ! Bouton ACHETER débloqué.');
    visiteTermineeBtn.style.display = 'none';
    acheterBtn.style.display = 'inline-block';
  }

  acheterBtn.onclick = () => {
    maison.vendu = true;
    alert('Maison achetée ! Elle est maintenant VENDUE.');
    acheterBtn.style.display = 'none';
    localStorage.setItem('maisons', JSON.stringify(maisons));
    window.location.href = 'index.html';
  }
});

    acheterBtn.style.display = 'none';
    window.location.href = 'index.html';
  }
});
