# webcomponents-with-go-example k8s configuration

## Step 1

Apply general configuration and applications

```sh
$ kubectl apply -f general
$ kubectl apply -f .
``` 

## Step 2

Open `<your-k8s-ip>/demo/` in your browser

## Other commands

```sh
# restart deployment with fetching new image
$ kubectl rollout restart -f deployment.yml
```