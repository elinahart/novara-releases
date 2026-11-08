# Questions fréquentes

Les réponses aux questions qu'on se pose le plus. Pour tout apprendre pas à pas, lis le [guide](GUIDE.fr.md).

## Pour commencer

### NOVARA est-il vraiment gratuit ?

Oui. Toutes les fonctions, tous les thèmes et toutes les mises à jour sont gratuits, sans abonnement et sans compte NOVARA. Tu peux soutenir le projet sur [Ko-fi](https://ko-fi.com/K4B229QS15) si tu veux.

### Faut-il payer quelque chose pour les IA ?

Les agents utilisent ton propre compte : un abonnement Claude, un compte ChatGPT ou un compte Google. Ce que ça coûte dépend de ce compte. NOVARA choisit le bon modèle pour chaque tâche et ne dépense des jetons que là où une IA est vraiment utile.

### Faut-il savoir coder ?

Non. Tu décris ton jeu avec tes mots, les agents écrivent le code et tu valides ce qu'ils créent.

### Quels jeux peut-on faire ?

Des jeux web 2D, des jeux web 3D, des jeux Roblox Studio, des jeux Unity et des jeux ASCII, tout en caractères.

### Sur quels ordinateurs NOVARA marche-t-il ?

Sur Mac avec macOS 11 ou plus récent (Apple Silicon ou Intel), et sur PC avec Windows 10 ou 11 en 64 bits. Il n'y a pas de version Linux pour l'instant. NOVARA regarde ta machine et te propose un nombre d'agents adapté.

### NOVARA existe-t-il en anglais ?

Oui, en français et en anglais. Il suit la langue de ton ordinateur.

## Vie privée

### Mes projets partent-ils sur Internet ?

Tes projets restent sur ton ordinateur et NOVARA ne collecte rien. Il va en ligne pour télécharger des outils et des mises à jour et pour lister les créations de la communauté. Les agents que tu connectes passent par ton compte : ce qu'ils lisent est traité par leur fournisseur, selon ses conditions.

### Puis-je utiliser la voix de quelqu'un ?

Seulement avec son accord. NOVARA fait copier de vraies voix et demande ce consentement avant d'enregistrer.

## Installation

### Mac dit qu'il ne peut pas vérifier l'app. Que faire ?

C'est normal : NOVARA n'est pas notarié par Apple. Ouvre **Réglages Système › Confidentialité et sécurité**, descends et clique sur **Ouvrir quand même**. Il ne faut le faire qu'une fois.

### Windows dit qu'il a protégé mon ordinateur. Que faire ?

L'installeur n'est pas signé par Microsoft. Clique sur **Informations complémentaires**, puis **Exécuter quand même**.

### Comment mettre à jour NOVARA ?

NOVARA propose chaque mise à jour sur son écran d'accueil, avec ce qu'elle change. Sa signature est vérifiée avant l'installation.

## Les agents

### macOS demande mon mot de passe en boucle pour le trousseau « session ». Pourquoi ?

Claude Code garde sa connexion dans ton trousseau macOS et la relit à chaque agent. Si le trousseau est verrouillé, macOS redemande ton mot de passe pour chaque agent. Ouvre l'app **Trousseaux d'accès**, déverrouille « session », puis relance les agents. NOVARA te prévient quand il voit le trousseau verrouillé.

### Un agent n'a plus de jetons. Que faire ?

NOVARA te propose de passer à une autre IA si tu en as connecté plusieurs. Tu peux aussi attendre la fin de ta limite, puis reprendre avec **Reprise**.

### Comment dépenser moins de jetons ?

Choisis le mode **Éco** ou **Ultra éco** dans les réglages du projet. Les images, sons et musiques faits par les outils locaux ne coûtent aucun jeton.

### Mon ordinateur rame. Que faire ?

Active le **Mode léger** du projet et réduis le nombre d'agents dans « Ressources et agents ».

### J'ai fermé NOVARA pendant le travail. Ai-je perdu quelque chose ?

Non. Les tâches, les décisions et le travail interrompu sont gardés. Rouvre le projet et utilise **Reprise** pour repartir avec la même équipe.

### Pourquoi les agents se parlent-ils en anglais ?

Ça coûte moins de jetons. Tout ce qui t'est destiné reste dans ta langue.

## Téléphone

### Mon téléphone ne se connecte pas.

Vérifie que le téléphone et l'ordinateur sont sur le même Wi-Fi et que NOVARA est ouvert. Scanne de nouveau le QR code de **Mon téléphone**. Hors de chez toi, il faut Tailscale sur les deux appareils.

### Le bouton photo ou fichier ne fait rien sur Android.

Ton app NOVARA est sûrement trop ancienne. Installe la dernière depuis la page du téléphone : ouvre dans Chrome l'adresse de ton NOVARA suivie de `/novara-telephone.apk`.

### Y a-t-il une app iPhone ?

Non, mais la page marche dans le navigateur de l'iPhone. Tu peux l'ajouter à ton écran d'accueil.

### Puis-je envoyer n'importe quel fichier depuis le téléphone ?

Oui, dans l'onglet **Biblio**, jusqu'à 200 Mo par fichier. Ils arrivent dans les ressources du projet.

## Ressources

### Quels formats 3D NOVARA sait-il afficher ?

GLB, GLTF, FBX, OBJ, STL, PLY, DAE, 3DS, 3MF et USDZ, sur l'ordinateur et sur le téléphone. Les fichiers `.blend` demandent Blender.

### Mon modèle s'affiche sans ses couleurs. Pourquoi ?

NOVARA cherche les textures à côté du modèle, dans un dossier `<nom>.fbm` ou dans un dossier `textures`. Si elles sont ailleurs, le modèle s'affiche sans elles.

### Puis-je mettre les ressources gratuites dans un jeu que je vends ?

Oui. NOVARA ne garde que des licences qui le permettent (CC0, CC-BY, MIT, ISC, OFL, licence Pixabay) et refuse les autres. Chaque fichier est inscrit dans `CREDITS.md` ; pour les licences CC-BY, mets le texte de crédit dans le générique de ton jeu.

### Comment avoir un jeu en style manga ou BD ?

Choisis le style **Manga / BD** ou **Anime** pour ton projet. Les agents utilisent alors des ombres franches, un contour encré et les polices BD Bangers et Comic Neue. Avant de te montrer un modèle, ils le comparent à des images de vrais jeux de ce style.

### L'image vers 3D marche-t-elle sur mon ordinateur ?

TripoSR tourne sur les Mac à puce Apple et sur les PC (plus vite avec une carte NVIDIA). Il ne marche pas sur les Mac à processeur Intel. TRELLIS demande une carte NVIDIA avec 16 Go de mémoire vidéo. Dans tous les cas, c'est un brouillon que les agents retravaillent.

### Comment signaler un bug ?

Utilise **Signaler un bug** dans NOVARA ou ouvre un ticket sur [GitHub](https://github.com/elinahart/novara-releases/issues).
