


CREATE TABLE epreuve_final.public.utilisateur (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(30),
    prenom VARCHAR(30),
    courriel VARCHAR(255),
    cle_api VARCHAR(30),
    password VARCHAR(100)
);

CREATE TABLE epreuve_final.public.taches (
    id SERIAL PRIMARY KEY,
    utilisateur_id INTEGER,
    titre VARCHAR(100),
    description VARCHAR(500),
    date_debut DATE,
    date_echeance DATE,
    complete BOOLEAN,
    FOREIGN KEY (utilisateur_id) REFERENCES epreuve_final.public.utilisateur(id)
);

CREATE table epreuve_final.public.sous_taches (
    id SERIAL PRIMARY KEY,
    tache_id INTEGER,
    titre VARCHAR(100),
    complete BOOLEAN,
    FOREIGN KEY (tache_id) references epreuve_final.public.taches(id)
);