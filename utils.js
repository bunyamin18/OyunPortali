import { CONFIG } from './config.js';

// DOM elemanı oluşturma yardımcısı
const createElement = (tag, attributes = {}, innerHTML = '') => {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
    });
    element.innerHTML = innerHTML;
    return element;
};

// Yükleniyor ekranını yönetme
const toggleLoading = (show) => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = show ? 'flex' : 'none';
};

// Oyun kartı oluşturma
const createGameCard = (game) => {
    const gameCard = createElement('div', { class: 'game-card' });
    
    const thumbnail = createElement('img', { 
        class: 'game-thumbnail',
        src: game.thumbnail || CONFIG.DEFAULT_THUMBNAIL,
        alt: game.title,
        loading: 'lazy'
    });
    
    const gameInfo = createElement('div', { class: 'game-info' }, `
        <div class="game-title">${game.title}</div>
        <div class="game-category">${game.category}</div>
        <div class="game-rating">${'★'.repeat(Math.round(game.rating))}${'☆'.repeat(5 - Math.round(game.rating))}</div>
    `);
    
    gameCard.append(thumbnail, gameInfo);
    gameCard.addEventListener('click', () => openGame(game));
    
    return gameCard;
};

// Kategori kartı oluşturma
const createCategoryCard = (category) => {
    const categoryCard = createElement('div', { class: 'category-card' });
    
    const image = createElement('img', {
        class: 'category-img',
        src: `assets/images/categories/${category.slug}.jpg` || CONFIG.DEFAULT_CATEGORY_IMAGE,
        alt: category.name,
        loading: 'lazy'
    });
    
    const name = createElement('div', { class: 'category-name' }, category.name);
    
    categoryCard.append(image, name);
    categoryCard.addEventListener('click', () => filterGamesByCategory(category.id));
    
    return categoryCard;
};

// Sayfalama kontrollerini güncelleme
const updatePagination = (currentPage, totalPages) => {
    const pagination = document.getElementById('pagination');
    const pageInfo = document.getElementById('page-info');
    
    pageInfo.textContent = `Sayfa ${currentPage} / ${totalPages}`;
    
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    
    pagination.classList.remove('hidden');
};

export { 
    createElement, 
    toggleLoading, 
    createGameCard, 
    createCategoryCard, 
    updatePagination 
};
