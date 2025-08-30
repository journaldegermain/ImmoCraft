document.addEventListener('DOMContentLoaded', () => {

  // ----------------- Variables -----------------
  const pseudos = ["Mikumisquipasse", "Jérémie123", "Pikratchuu"];
  let currentUser = null;
  let maisons = JSON.parse(localStorage.getItem('maisons')) || [];

  const pseudoInput = document.getElementById('pseudo');
  const erreurElem = document.getElementById('erreur');
  const connexionDiv = document.getElementById('connexion');
  const catalogueSection = document.getElementById('catalogue-section');
  const ajoutMaisonDiv = document.getElementById('ajoutMaison');

  // Bouton Se connecter
  const btnConnexion = document.querySelector('#connexion .btn');
  btnConnexion.addEventListener('click', seConnecter);

  // ----------------- Connexion -----------------
  function seConnecter() {
    const pseudo = pseudoInput.value;
    if(!pseudos.includes(pseudo)) {
      erreurElem.innerText = "Pseudo invalide !";
      return;
    }
    currentUser = pseudo;
    connexionDiv.style.display = 'none';
    catalogueSection.style.display = 'block';

    if(currentUser === "Mikumisquipasse") {
      alert("Connecté en tant que chef de l'agence !");
      ajoutMaisonDiv.style.display = 'block';
    }

    afficherMaisons(maisons);
  }

  // ----------------- Catalogue -----------------
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
      img.addEventListener('click', () => ouvrirMaison(m.id));

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

  function filtrer(region) {
    if(region === 'All') {
      afficherMaisons(maisons);
    } else {
      afficherMaisons(maisons.filter(m => m.region === region));
    }
  }

  function ouvrirMaison(id) {
    localStorage.setItem('maisonChoisie', id);
    window.location.href = 'maison.html';
  }

  // ----------------- Ajout maison (chef) -----------------
  const btnAjouter = document.querySelector('#ajoutMaison .btn');
  if(btnAjouter) btnAjouter.addEventListener('click', ajouterMaison);

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
      id: Date.now(),
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

    document.getElementById('nomMaison').value = '';
    document.getElementById('descriptionMaison').value = '';
    document.getElementById('prixMaison').value = '';
    document.getElementById('photoMaison').value = '';
  }

  // ----------------- Maison.html Logic -----------------
  const galerie = document.getElementById('galerie');
  if(galerie) {
    const maisonId = parseInt(localStorage.getItem('maisonChoisie'));
    const maison = maisons.find(m => m.id === maisonId);
    if(!maison) return;

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

    visiterBtn.addEventListener('click', () => {
      alert('Notification à Mikumisquipasse : quelqu’un veut visiter cette maison !');
      maison.visiteEnCours = true;
      visiterBtn.style.display = 'none';
      visiteTermineeBtn.style.display = 'inline-block';
    });

    visiteTermineeBtn.addEventListener('click', () => {
      alert('Visite terminée ! Bouton ACHETER débloqué.');
      visiteTermineeBtn.style.display = 'none';
      acheterBtn.style.display = 'inline-block';
    });

    acheterBtn.addEventListener('click', () => {
      maison.vendu = true;
      alert('Maison achetée ! Elle est maintenant VENDUE.');
      acheterBtn.style.display = 'none';
      localStorage.setItem('maisons', JSON.stringify(maisons));
      window.location.href = 'index.html';
    });
  }

  // ----------------- Boutons filtres -----------------
  document.querySelectorAll('.filtres .btn').forEach(b => {
    b.addEventListener('click', () => filtrer(b.innerText === 'Toutes les régions' ? 'All' : b.innerText));
  });

});
