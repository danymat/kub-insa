#Instructions pour tester 

Pour demarrer le serveur (port 3001 ou port defini dans la variable d'environnement PORT)
npm run dev

on y accede donc sur le navigateur avec http://localhost:3001

(pour docker j'utilise l'extension vs code je sais pas ce que fait exactement les commandes, il les écris tout seul)
pour docker on build l'image à partir du fichier :

docker build --pull --rm -f "kub-front\dockerfile" -t kub-front:latest "kub-front"

et pour démarrer :

docker run --rm -it  -p 8080:8080/tcp kub-front:latest
