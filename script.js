// ✅ Liste des pseudos autorisés
const pseudos = ["Mikumisquipasse", "Jérémie123", "Pikratchuu"];
let currentUser = null;

// ✅ Liste des maisons (vide au départ)
let maisons = JSON.parse(localStorage.getItem('maisons')) || [];

// 🔑 Connexion
function seConnecter() {// Afficher formulaire ajout maison si chef
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

  if(currentUser === "Mikumisquipasse") {
    alert("Connecté en tant que chef de l'agence !");
    document.getElementById('ajoutMaison').style.display = 'block';
  }
}

// Ajouter une maison
function ajouterMaison() {
  const nom = document.getElementById('nomMaison').value;
  const description = document.getElementById('descriptionMaison').value;
  const region = document.getElementById('regionMaison').value;
  const prix = document.getElementById('prixMaison').value.split(',').map(p => p.trim());
  const photos = [document.getElementById('photoMaison').value.trim()];

  if(!nom || !region || prix.length === 0 || photos[0] === '') {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const newMaison = {
    id: Date.now(), // ID unique
    nom,
    description,
    region,
    prix,
    photos,
    vendu: false,
    visiteEnCours: false
  };

  maisons.push(newMaison);
  localStorage.setItem('maisons', JSON.stringify(maisons));
  afficherMaisons(maisons);
  alert("Maison ajoutée avec succès !");
  
  // Réinitialiser le formulaire
  document.getElementById('nomMaison').value = '';
  document.getElementById('descriptionMaison').value = '';
  document.getElementById('prixMaison').value = '';
  document.getElementById('photoMaison').value = '';
}

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
