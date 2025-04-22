// DOM elemanlarını seçme
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryGrid = document.querySelector('.category-grid');
const popularGamesGrid = document.querySelector('#popular .games-grid');
const newGamesGrid = document.querySelector('#new .games-grid');
const gameContainer = document.getElementById('game-container');
const gameFrame = document.getElementById('game-frame');
const gameTitle = document.getElementById('game-title');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const closeGameBtn = document.getElementById('close-game-btn');

// Oyun verilerini yükleme
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadPopularGames();
    loadNewGames();
});

// Kategorileri yükleme fonksiyonu
function loadCategories() {
    // Gerçek uygulamada bu veriler bir API'den çekilebilir
    const categories = [
        { id: 1, name: 'Aksiyon', image: 'images/categories/action.jpg' },
        { id: 2, name: 'Macera', image: 'images/categories/adventure.jpg' },
        { id: 3, name: 'Strateji', image: 'images/categories/strategy.jpg' },
        { id: 4, name: 'Spor', image: 'images/categories/sports.jpg' },
        { id: 5, name: 'Yarış', image: 'images/categories/racing.jpg' },
        { id: 6, name: 'Bulmaca', image: 'images/categories/puzzle.jpg' },
        { id: 7, name: 'Savaş', image: 'images/categories/fighting.jpg' },
        { id: 8, name: 'Çocuk', image: 'images/categories/kids.jpg' }
    ];

    categoryGrid.innerHTML = '';
    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.innerHTML = `
            <img src="${category.image}" alt="${category.name}" class="category-img">
            <div class="category-name">${category.name}</div>
        `;
        categoryCard.addEventListener('click', () => filterGamesByCategory(category.id));
        categoryGrid.appendChild(categoryCard);
    });
}

// Popüler oyunları yükleme fonksiyonu
function loadPopularGames() {
    // Gerçek uygulamada bu veriler bir API'den çekilebilir
    const popularGames = [
        { id: 1, title: 'Zombi Avı', category: 'Aksiyon', rating: '★★★★☆', thumbnail: 'images/games/zombie.jpg', url: 'https://example.com/games/zombie' },
        { id: 2, title: 'Futbol Şampiyonu', category: 'Spor', rating: '★★★☆☆', thumbnail: 'images/games/soccer.jpg', url: 'https://example.com/games/soccer' },
        { id: 3, title: 'Labirent Kaçış', category: 'Bulmaca', rating: '★★★★★', thumbnail: 'images/games/maze.jpg', url: 'https://example.com/games/maze' },
        { id: 4, title: 'Formula Yarışı', category: 'Yarış', rating: '★★★★☆', thumbnail: 'images/games/racing.jpg', url: 'https://example.com/games/racing' },
        { id: 5, title: 'Savaş Uçağı', category: 'Aksiyon', rating: '★★★☆☆', thumbnail: 'images/games/airplane.jpg', url: 'https://example.com/games/airplane' }
    ];

    renderGames(popularGames, popularGamesGrid);
}

// Yeni oyunları yükleme fonksiyonu
function loadNewGames() {
    // Gerçek uygulamada bu veriler bir API'den çekilebilir
    const newGames = [
        { id: 6, title: 'Uzay Savaşları', category: 'Aksiyon', rating: '★★★★☆', thumbnail: 'images/games/space.jpg', url: 'https://example.com/games/space' },
        { id: 7, title: 'Çiftlik Simülasyonu', category: 'Strateji', rating: '★★★☆☆', thumbnail: 'images/games/farm.jpg', url: 'https://example.com/games/farm' },
        { id: 8, title: 'Basketbol Şov', category: 'Spor', rating: '★★★★☆', thumbnail: 'images/games/basketball.jpg', url: 'https://example.com/games/basketball' },
        { id: 9, title: 'Ejderha Avcısı', category: 'Macera', rating: '★★★★★', thumbnail: 'images/games/dragon.jpg', url: 'https://example.com/games/dragon' },
        { id: 10, title: 'Matematik Oyunu', category: 'Bulmaca', rating: '★★★☆☆', thumbnail: 'images/games/math.jpg', url: 'https://example.com/games/math' }
    ];

    renderGames(newGames, newGamesGrid);
}

// Oyunları render etme fonksiyonu
function renderGames(games, container) {
    container.innerHTML = '';
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}" class="game-thumbnail">
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-category">${game.category}</div>
                <div class="game-rating">${game.rating}</div>
            </div>
        `;
        gameCard.addEventListener('click', () => openGame(game.url, game.title));
        container.appendChild(gameCard);
    });
}

// Kategoriye göre oyun filtreleme
function filterGamesByCategory(categoryId) {
    // Gerçek uygulamada bu filtreleme sunucu tarafında yapılmalı
    alert(`${categoryId} numaralı kategorideki oyunlar gösterilecek`);
}

// Oyun açma fonksiyonu
function openGame(gameUrl, title) {
    gameTitle.textContent = title;
    gameFrame.src = gameUrl;
    gameContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Tam ekran modu
fullscreenBtn.addEventListener('click', () => {
    if (gameFrame.requestFullscreen) {
        gameFrame.requestFullscreen();
    } else if (gameFrame.webkitRequestFullscreen) { /* Safari */
        gameFrame.webkitRequestFullscreen();
    } else if (gameFrame.msRequestFullscreen) { /* IE11 */
        gameFrame.msRequestFullscreen();
    }
});

// Oyunu kapatma
closeGameBtn.addEventListener('click', () => {
    gameFrame.src = '';
    gameContainer.classList.add('hidden');
    document.body.style.overflow = 'auto';
});

// Arama fonksiyonu
searchBtn.addEventListener('click', searchGames);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchGames();
    }
});

function searchGames() {
    const query = searchInput.value.trim();
    if (query) {
        // Gerçek uygulamada bu arama sunucu tarafında yapılmalı
        alert(`"${query}" için arama sonuçları gösterilecek`);
    }
}
