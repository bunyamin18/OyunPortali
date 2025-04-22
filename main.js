// TEST VERİLERİ
const testGames = [
    {
        id: 1,
        title: 'Zombi Avı',
        category: 'Aksiyon',
        thumbnail: 'https://via.placeholder.com/300x200?text=Zombi+Avı',
        url: 'https://example.com/game1'
    },
    {
        id: 2,
        title: 'Futbol Şampiyonu', 
        category: 'Spor',
        thumbnail: 'https://via.placeholder.com/300x200?text=Futbol',
        url: 'https://example.com/game2'
    }
];

// DOM ELEMANLARI
const elements = {
    popularGamesGrid: document.getElementById('popular-games-grid'),
    gameContainer: document.getElementById('game-container'),
    gameFrame: document.getElementById('game-frame'),
    gameTitle: document.getElementById('game-title')
};

// OYUN KARTI OLUŞTURMA
function createGameCard(game) {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
        <img src="${game.thumbnail}" class="game-thumbnail">
        <div class="game-info">
            <h3>${game.title}</h3>
            <p>${game.category}</p>
        </div>
    `;
    card.addEventListener('click', () => openGame(game));
    return card;
}

// OYUN AÇMA
function openGame(game) {
    elements.gameTitle.textContent = game.title;
    elements.gameFrame.src = game.url;
    elements.gameContainer.classList.add('active');
}

// UYGULAMAYI BAŞLAT
function initApp() {
    // Test oyunlarını yükle
    testGames.forEach(game => {
        elements.popularGamesGrid.appendChild(createGameCard(game));
    });
    
    // Oyun kapatma butonu
    document.getElementById('close-game-btn').addEventListener('click', () => {
        elements.gameContainer.classList.remove('active');
        elements.gameFrame.src = '';
    });
}

// SAYFA YÜKLENDİĞİNDE ÇALIŞTIR
document.addEventListener('DOMContentLoaded', initApp);
