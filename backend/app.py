# backend/app.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

#app: Variable que guarda tu aplicación. FastAPI(): Crea una nueva instancia de la aplicación
#¿Qué hace? Inicializa tu servidor web con todas las configuraciones de FastAPI
#Analogía: Como crear un restaurante vacío listo para agregar mesas (endpoints).
app = FastAPI()

# Configuración CORS
#¿Qué es CORS?
#Cross-Origin Resource Sharing - Permite que navegadores web accedan a recursos de dominios diferentes.
app.add_middleware(
    #CORSMiddleware: El tipo de middleware que estás añadiendo (para CORS)
    CORSMiddleware,
    #allow_origins: Qué dominios pueden acceder a tu API["http://localhost:3000"]: Solo React (que corre en puerto 3000)¿Por qué? Seguridad - evita que otros sitios web accedan a tu API
    allow_origins=["http://localhost:3000"],
    #allow_methods: Qué métodos HTTP permitir["*"]: Permite TODOS los métodos (GET, POST, PUT, DELETE, etc.)
    allow_methods=["*"],
    #allow_headers: Qué headers HTTP permitir["*"]: Permite TODOS los headers
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Pokédex API is running!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "pokedex-backend"}