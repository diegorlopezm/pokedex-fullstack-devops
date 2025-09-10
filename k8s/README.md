#Deploy multinode cluster
kind create cluster --name multinode --config kind-config.yaml

Set kubectl context to "kind-multinode"
You can now use your cluster with:

kubectl cluster-info --context kind-multinode

