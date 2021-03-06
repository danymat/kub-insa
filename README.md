# kub-insa

## Kubernetes

prerequis installer `minikube` et `kubectl`

on demarre minikube avec `minikube start --driver docker --mount --mount-string="/path/to/host:/data"`

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

et il faut ajouter ingress a minikube : 
```bash
minikube addons enable ingress
```

et ensuite il faut forwarder les requetes au bon port en interne
```bash
kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
```

(cette commande est bloquante on ne doit pas fermer le terminal si on veut acceder a l appli)

url : front.kub-insa.com pour le front end, back.kub-insa.com pour le backend et rabbit.kub-insa.com pour la gui rabbitmq
il faut ajouter les url au fichier hosts (linux: /etc/hosts, windows: C:\Windows\System32\drivers\etc\hosts)
on ajoute donc :

```
# kub-insa
127.0.0.1 front.kub-insa.com
127.0.0.1 back.kub-insa.com
127.0.0.1 rabbit.kub-insa.com
```

### Monitoring

Il y a plusieurs possibilités pour le monitoring on peut soit utiliser dashboard qui affiche une liste des ressources 
mais ne permet pas d'afficher l'utilisations des ressources (%cpu, ram etc...)
sinon on peut utiliser prometheus avec grafana, une solution de monitoring plus performantes

## Dashboard

Pour utiliser dashboard, voici les étapes:

- Télécharger dashboard et le déployer: `kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml`
- Appliquer l'utilisateur: `kubectl apply -f dashboard-admin.yaml`
- Ouvrir un proxy: `kubectl proxy`
- Le dashboard sera accessible [ici](http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/)

Pour avoir le token, faire:

```bash
kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
```

## Prometheus

Le tutoriel est ici : https://blog.marcnuri.com/prometheus-grafana-setup-minikube
Cependant les noms de repo et des charts helm ont changé il faut utiliser ceux la :

Prometheus

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm search repo prometheus-community
helm install prometheus prometheus-community/prometheus
kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-np
```

Grafana

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm search repo grafana
helm install grafana grafana/grafana
kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-np

minikube service grafana-np
```

Le dashboard proposé dans le tutoriel n'est pas forcement à jour avec les noms de metriques.
On peut importer le dashboard.json au lieu de celui proposé dans le tutoriel (c'est le même avec des corrections)
