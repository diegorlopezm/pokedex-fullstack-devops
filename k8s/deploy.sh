#!/bin/bash

echo "🚀 Deploying Pokedex to Kubernetes (Kind)..."

# Namespace (opcional, pero recomendable)
kubectl create namespace pokedex --dry-run=client -o yaml | kubectl apply -f -

# Apply secrets
kubectl apply -f ./secrets.yaml -n pokedex

# Apply configmap
kubectl apply -f ./configmap.yaml -n pokedex

# Apply database
kubectl apply -f ./database/ -n pokedex

# Apply cache
kubectl apply -f ./cache/ -n pokedex

# Apply backend
kubectl apply -f ./backend/ -n pokedex

# Apply frontend
kubectl apply -f ./frontend/ -n pokedex

echo "✅ Deployment completed!"
echo "📊 Check status: kubectl get all -n pokedex"
echo "🌐 To access the frontend:"
echo "   - If using NodePort: kubectl get svc -n pokedex"
echo "   - If using Ingress:  open http://localhost"
echo "kubectl config set-context --current --namespace=pokedex"
