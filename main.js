import { CATEGORIES } from './config.js';
import { 
    createGameCard, 
    createCategoryCard, 
    toggleLoading,
    updatePagination 
} from './utils.js';
import { 
    getPopularGames, 
    getNewGames, 
    getGamesByCategory, 
    searchGames 
} from './api.js';

// DOM elemanları
const elements = {
    categoryGrid: document.getElementById('category-grid'),
    popularGamesGrid: document.getElementById('popular-games-grid'),
    newGamesGrid: document.getElementById('new-games-grid'),
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    gameContainer: document.getElementById('game-container'),
    gameFrame: document.getElementById('game-frame'),
    gameTitle: document.getElementById('game-title'),
    fullscreenBtn: document.getElementById('fullscreen-btn'),
    closeGameBtn: document.getElementById('close-game-btn'),
    randomGameBtn: document.getElementById('random-game-btn'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    navLinks: document.querySelector('.nav-links'),
    pagination: document.getElementById('pagination'),
    prevPageBtn: document.getElementById('prev-page'),
    nextPageBtn: document.getElementById('next-page')
};

// Uygulama state'i
const state = {
    currentPage: 1,
    totalPages: 1,
    currentCategory: null,
    currentSearchQuery: null,
    allGames: []
};

// Uygulamayı başlatma
const initApp = async () => {
    // Kategorileri yükle
    loadCategories();
    
    // Popüler oyunları yükle
    const popularGames = await getPopularGames();
    if (popularGames) {
        renderGames(popularGames, elements.popularGamesGrid);
    }
    
    // Yeni oyunları yükle
    const newGames = await getNewGames();
    if (newGames) {
        renderGames(newGames, elements.newGamesGrid);
    }
    
    // Tüm oyunları önbelleğe al (isteğe bağlı)
    // state.allGames = await getAllGames();
    
    // Event listener'ları ekle
    setupEventListeners();
};

// Kategorileri yükle
const loadCategories = () => {
    elements.categoryGrid.innerHTML = '';
    CATEGORIES.forEach(category => {
        const categoryCard = createCategoryCard(category);
        elements.categoryGrid.appendChild(categoryCard);
    });
};

// Oyunları render et
const renderGames = (games, container) => {
    container.innerHTML = '';
    
    if (!games || games.length === 0) {
        container.innerHTML = '<p class="no-games">Henüz oyun bulunamadı.</p>';
        return;
    }
    
    games.forEach(game => {
        const gameCard = createGameCard(game);
        container.appendChild(gameCard);
    });
};

// Kategoriye göre filtrele
const filterGamesByCategory = async (categoryId) => {
    state.currentCategory = categoryId;
    state.currentSearchQuery = null;
    state.currentPage = 1;
    
    const games = await getGamesByCategory(categoryId, state.currentPage);
    if (games) {
        renderGames(games.data, elements.popularGamesGrid);
        updatePagination(state.currentPage, games.totalPages);
    }
};

// Oyun arama
const handleSearch = async () => {
    const query = elements.searchInput.value.trim();
    if (!query) return;
    
    state.currentSearchQuery = query;
    state.currentCategory = null;
    state.currentPage = 1;
    
    const results = await searchGames(query, state.currentPage);
    if (results) {
        renderGames(results.data, elements.popularGamesGrid);
        updatePagination(state.currentPage, results.totalPages);
    }
};

// Sayfalama işlemleri
const handlePagination = async (direction) => {
    if (direction === 'prev' && state.currentPage > 1) {
        state.currentPage--;
    } else if (direction === 'next' && state.currentPage < state.totalPages) {
        state.currentPage++;
    }
    
    let data;
    if (state.currentSearchQuery) {
        data = await searchGames(state.currentSearchQuery, state.currentPage);
    } else if (state.currentCategory) {
        data = await getGamesByCategory(state.currentCategory, state.currentPage);
    }
    
    if (data) {
        renderGames(data.data, elements.popularGamesGrid);
        updatePagination(state.currentPage, data.totalPages);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

// Oyun açma
const openGame = (game) => {
    elements.gameTitle.textContent = game.title;
    elements.gameFrame.src = game.url;
    elements.gameContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Tam ekran modu
const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
        elements.gameFrame.requestFullscreen().catch(err => {
            console.error('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
};

// Rastgele oyun açma
const openRandomGame = () => {
    if (state.allGames.length > 0) {
        const randomIndex = Math.floor(Math.random() * state.allGames.length);
        openGame(state.allGames[randomIndex]);
    } else {
        // Eğer tüm oyunlar yüklenmediyse popüler oyunlardan rastgele seç
        const popularGamesContainer = elements.popularGamesGrid;
        if (popularGamesContainer.children.length > 0) {
            const randomIndex = Math.floor(Math.random() * popularGamesContainer.children.length);
            popularGamesContainer.children[randomIndex].click();
        }
    }
};

// Event listener'ları ayarla
const setupEventListeners = () => {
    // Arama butonu
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Oyun kapatma
    elements.closeGameBtn.addEventListener('click', () => {
        elements.gameFrame.src = '';
        elements.gameContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Tam ekran butonu
    elements.fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Rastgele oyun butonu
    elements.randomGameBtn.addEventListener('click', openRandomGame);
    
    // Mobil menü butonu
    elements.mobileMenuBtn.addEventListener('click', () => {
        elements.navLinks.classList.toggle('active');
    });
    
    // Sayfalama butonları
    elements.prevPageBtn.addEventListener('click', () => handlePagination('prev'));
    elements.nextPageBtn.addEventListener('click', () => handlePagination('next'));
    
    // Nav linkleri için aktif durum yönetimi
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Mobil menüyü kapat
            if (window.innerWidth <= 768) {
                elements.navLinks.classList.remove('active');
            }
        });
    });
};

// Uygulamayı başlat
document.addEventListener('DOMContentLoaded', initApp);
