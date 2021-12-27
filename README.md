# kub-insa

## Kubernetes

prerequis installer `minikube` et `kubectl`

on demarre minikube avec `minikube start --driver docker`

`minikube docker-env` permet d'associer le bon repository docker au terminal -> faire les docker build dans ce terminal.

En effet minikube ne trouvera pas les images docker sinon.

```bash
docker build -t services_frontend:latest ./frontend
docker build -t services_backend:latest ./backend
docker build -t services_logstash:latest ./logstash
docker pull redis
```

une fois les images construites on demarre nos services kubernetes

```bash
for i in *.yaml; do kubectl apply -f $i ; done
```

On verifie ensuite que nos pods sont lancés: 

```bash
kubectl get pod
```

Le backend ne fonctionne pas, normal il trouve pas les autres services, normal les ips et autres conf reseau sont pas configurés.

Pour avoir accès au front et back depuis le navigateur il nous faut installer ingress.

ingress sert a transmettre les requetes au bon service

```bash
kubectl apply -f ingress-conf.yaml
```

pour faire fonctionner ingress au mieux on a besoin d'un ingress controller
pour installer nginx ingress controller voir https://kubernetes.github.io/ingress-nginx/deploy/
(`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.1.0/deploy/static/provider/cloud/deploy.yaml`)

et ensuite il faut forwarder les requetes au bon port en interne
```bash
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
```

(cette commande est bloquante on ne doit pas fermer le terminal si on veut acceder a l appli)

url : front.kub-insa.com, back.kub-insa.com
il faut ajouter les url au fichier hosts (linux: /etc/hosts, windows: C:\Windows\System32\drivers\etc\hosts)
on ajoute donc :

```
# kub-insa
127.0.0.1 front.kub-insa.com
127.0.0.1 back.kub-insa.com
```
