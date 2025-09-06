class Pokedex {
    constructor() {
        //this.API_BASE = 'http://localhost:8000';
        this.API_BASE = '';
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.pokemonResult = document.getElementById('pokemonResult');
        this.searchHistory = document.getElementById('searchHistory');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        
        this.init();
    }
    
    init() {
        this.searchBtn.addEventListener('click', () => this.searchPokemon());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchPokemon();
        });
        
        this.loadSearchHistory();
    }
    
    async searchPokemon() {
        const pokemonName = this.searchInput.value.trim().toLowerCase();
        
        if (!pokemonName) {
            this.showError('Por favor, ingresa el nombre de un Pokémon');
            return;
        }
        
        this.showLoading();
        this.hideError();
        this.hideResult();
        
        try {
            const response = await fetch(`${this.API_BASE}/api/pokemon/${pokemonName}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al buscar Pokémon');
            }
            
            const pokemonData = await response.json();
            this.displayPokemon(pokemonData);
            this.loadSearchHistory(); // Recargar historial después de búsqueda
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }
    
    displayPokemon(pokemon) {
        // Actualizar información del Pokémon
        document.getElementById('pokemonName').textContent = pokemon.name;
        document.getElementById('pokemonId').textContent = `#${pokemon.id}`;
        document.getElementById('pokemonSprite').src = pokemon.sprite;
        document.getElementById('pokemonSprite').alt = pokemon.name;
        document.getElementById('pokemonHeight').textContent = `${pokemon.height / 10}m`;
        document.getElementById('pokemonWeight').textContent = `${pokemon.weight / 10}kg`;
        
        // Mostrar tipos
        const typesContainer = document.getElementById('pokemonTypes');
        typesContainer.innerHTML = '';
        
        pokemon.types.forEach(type => {
            const typeBadge = document.createElement('span');
            typeBadge.className = `type-badge type-${type}`;
            typeBadge.textContent = type;
            typesContainer.appendChild(typeBadge);
        });
        
        this.showResult();
    }
    
    async loadSearchHistory() {
        try {
            const response = await fetch(`${this.API_BASE}/api/history?limit=5`);
            
            if (response.ok) {
                const history = await response.json();
                this.displaySearchHistory(history);
            }
        } catch (error) {
            console.error('Error loading search history:', error);
        }
    }
    
    displaySearchHistory(history) {
        this.searchHistory.innerHTML = '';
        
        if (history.length === 0) {
            this.searchHistory.innerHTML = '<p class="no-history">No hay búsquedas recientes</p>';
            return;
        }
        
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <span class="history-name">${item.name}</span>
                <span class="history-time">${this.formatDate(item.searched_at)}</span>
            `;
            
            historyItem.addEventListener('click', () => {
                this.searchInput.value = item.name;
                this.searchPokemon();
            });
            
            this.searchHistory.appendChild(historyItem);
        });
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    showLoading() {
        this.loading.classList.remove('hidden');
    }
    
    hideLoading() {
        this.loading.classList.add('hidden');
    }
    
    showResult() {
        this.pokemonResult.classList.remove('hidden');
    }
    
    hideResult() {
        this.pokemonResult.classList.add('hidden');
    }
    
    showError(message) {
        this.error.classList.remove('hidden');
        document.getElementById('errorMessage').textContent = message;
    }
    
    hideError() {
        this.error.classList.add('hidden');
    }
}

// Inicializar la Pokédex cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new Pokedex();
});