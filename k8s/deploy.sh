#!/bin/bash

echo "🚀 Deploying Pokedex to Kubernetes..."

# Apply secrets
kubectl apply -f ./secrets.yaml

# Apply configmap
kubectl apply -f ./configmap.yaml

# Apply database
kubectl apply -f ./database/

# Apply cache
kubectl apply -f ./cache/

# Apply backend
kubectl apply -f ./backend/

# Apply frontend
kubectl apply -f ./frontend/

echo "✅ Deployment completed!"
echo "📊 Check status: kubectl get all"
echo "🌐 Access frontend: minikube service pokedex-frontend"