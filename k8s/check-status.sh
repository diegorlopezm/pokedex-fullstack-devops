#!/bin/bash

echo "📊 Kubernetes Status:"
kubectl get pods

echo ""
echo "🌐 Services:"
kubectl get services

echo ""
echo "💾 Storage:"
kubectl get pvc

echo ""
echo "🔍 Backend logs:"
kubectl logs -l tier=backend --tail=10