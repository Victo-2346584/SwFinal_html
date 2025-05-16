document.getElementById('form-creer-utilisateur').addEventListener('submit', function (e) {
    e.preventDefault();

    const prenom = document.getElementById('prenom').value.trim();
    const nom = document.getElementById('nom').value.trim();
    const courriel = document.getElementById('courriel').value.trim();
    const motDePasse = document.getElementById('password').value;

    const messageDiv = document.getElementById('message-creer-utilisateur');

    if (!prenom || !nom || !courriel || !motDePasse) {
        messageDiv.textContent = 'Tous les champs sont obligatoires.';
        messageDiv.style.color = 'red';
        return;
    }

    const data = { prenom, nom, courriel, motDePasse };

    fetch('https://sw-finalapi.onrender.com/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.error) {
            messageDiv.textContent = 'Erreur : ' + result.error;
            messageDiv.style.color = 'red';
        } else {
            messageDiv.textContent = 'Utilisateur créé avec succès ! Clé API : ' + result.cle_api;
            messageDiv.style.color = 'green';
            e.target.reset();
        }
    })
    .catch(err => {
        console.error('Erreur création utilisateur:', err);
        messageDiv.textContent = 'Erreur lors de la création de l’utilisateur.';
        messageDiv.style.color = 'red';
    });
});

document.getElementById('form-recuperer-cle').addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
        courriel: document.getElementById('courriel_recup').value,
        motDePasse: document.getElementById('password_recup').value,
        genererNouveau: document.getElementById('generate_new_key').checked
    };

    const messageDiv = document.getElementById('message-recuperer-cle');

    fetch('https://sw-finalapi.onrender.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        if (result.error) {
            messageDiv.textContent = 'Erreur : ' + result.error;
            messageDiv.style.color = 'red';
        } else {
            messageDiv.textContent = 'Clé API récupérée : ' + result.cle_api;
            messageDiv.style.color = 'green';
            e.target.reset();
        }
    })
    .catch(err => {
        console.error('Erreur récupération clé API:', err);
        messageDiv.textContent = 'Erreur lors de la récupération de la clé API.';
        messageDiv.style.color = 'red';
    });
});
