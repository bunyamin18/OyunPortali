import { CONFIG } from './config.js';
import { toggleLoading } from './utils.js';

// API istekleri için temel fonksiyon
const fetchData = async (endpoint, params = {}) => {
    toggleLoading(true);
    try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${CONFIG.API_BASE_URL}/${endpoint}?${queryString}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        return null;
    } finally {
        toggleLoading(false);
    }
};

// Popüler oyunları getirme
const getPopularGames = async (limit = 12) => {
    return await fetchData('games/popular', { limit });
};

// Yeni oyunları getirme
const getNewGames = async (limit = 12) => {
    return await fetchData('games/new', { limit });
};

// Kategoriye göre oyunları getirme
const getGamesByCategory = async (categoryId, page = 1, limit = CONFIG.ITEMS_PER_PAGE) => {
    return await fetchData('games/category', { categoryId, page, limit });
};

// Oyun arama
const searchGames = async (query, page = 1, limit = CONFIG.ITEMS_PER_PAGE) => {
    return await fetchData('games/search', { q: query, page, limit });
};

// Tüm oyunları getirme (isteğe bağlı)
const getAllGames = async () => {
    // Büyük veri setleri için bu yöntem önerilmez
    return await fetchData('games/all');
};

export { 
    getPopularGames, 
    getNewGames, 
    getGamesByCategory, 
    searchGames, 
    getAllGames 
};
