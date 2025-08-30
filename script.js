// Affichage catalogue
function afficherMaisons(maisonList) {
  const catalogue = document.getElementById('catalogue');
  if(!catalogue) return;
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

    const prix = document.createElement('p');
    prix.className = 'prix';
    prix.innerText = 'Prix : ' + m.prix.join(', ');
    div.appendChild(prix);

    catalogue.appendChild(div);
  });
}

// Filtres
function filtrer(region) {
  if(region === 'All') {
    afficherMaisons(maisons);
  } else {
    afficherMaisons(maisons.filter(m => m.region === region));
  }
}

// Ouvrir maison
function ouvrirMaison(id) {
  localStorage.setItem('maisonChoisie', id);
  window.location.href = 'maison.html';
}

// Afficher toutes les maisons au départ
afficherMaisons(maisons);

// Maison.html logic
window.addEventListener('DOMContentLoaded', () => {
  const maisonId = parseInt(localStorage.getItem('maisonChoisie'));
  if(!maisonId) return;
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

  const prixElem = document.getElementById('prix');
  if(prixElem) prixElem.innerText = 'Prix : ' + maison.prix.join(', ');

  const visiterBtn = document.getElementById('visiterBtn');
  const visiteTermineeBtn = document.getElementById('visiteTermineeBtn');
  const acheterBtn = document.getElementById('acheterBtn');

  if(maison.vendu) {
    if(visiterBtn) visiterBtn.style.display = 'none';
    if(acheterBtn) acheterBtn.style.display = 'none';
  }

  if(visiterBtn) visiterBtn.onclick = () => {
    alert('Notification à Mikumisquipasse : quelqu’un veut visiter cette maison !');
    maison.visiteEnCours = true;
    visiterBtn.style.display = 'none';
    if(visiteTermineeBtn) visiteTermineeBtn.style.display = 'inline-block';
  }

  if(visiteTermineeBtn) visiteTermineeBtn.onclick = () => {
    alert('Visite terminée ! Bouton ACHETER débloqué.');
    visiteTermineeBtn.style.display = 'none';
    if(acheterBtn) acheterBtn.style.display = 'inline-block';
  }

  if(acheterBtn) acheterBtn.onclick = () => {
    maison.vendu = true;
    alert('Maison achetée ! Elle est maintenant VENDUE.');
    acheterBtn.style.display = 'none';
    window.location.href = 'index.html';
  }
});
