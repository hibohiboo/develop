#!/bin/bash
# https://qiita.com/mumoshu/items/8f55ee830d8e5c172dd4
curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
#curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/

export MINIKUBE_WANTUPDATENOTIFICATION=false
export MINIKUBE_WANTREPORTERRORPROMPT=false
export MINIKUBE_HOME=$HOME
export CHANGE_MINIKUBE_NONE_USER=true
mkdir -p $HOME/.kube
touch $HOME/.kube/config

export KUBECONFIG=$HOME/.kube/config
sudo -E minikube start --vm-driver=none

# this for loop waits until kubectl can access tmihe api server that Minikube has created
# for i in {1..150}; do # timeout for 5 minutes
#    ./kubectl get po &> /dev/null
#    if [ $? -ne 1 ]; then
#       break
#   fi
#   sleep 2
# done

# kubectl commands are now able to interact with Minikube cluster