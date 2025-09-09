<<<<<<< HEAD
# pokedex-fullstack-devops
🐳 Pokedex FullStack DevOps Platform  A modern cloud-native Pokémon search application demonstrating full DevOps practices, from local development to a scalable Kubernetes deployment. This project showcases my skills in containerization, orchestration, CI/CD, and infrastructure as code, making it a robust portfolio piece for a Junior DevOps role. 
=======

Problemas actuales:

Conexion con la BBDD, no se estan creando las tablas, pasar a implementar ciclo CICD con Jenkins ya que se esta volviendo una locura hacer pequenos cambios, push de la imagen, deploy en kubernetes...


Faltaba inicializar el script sql mas ponerlo como configmap
diego@wsl-ubuntu:~/pokedex-fullstack-devops$ kubectl create configmap postgres-init-script --from-file=init-db.sql=./init-db.sql
configmap/postgres-init-script created