// Bu dosya gerçek uygulamada bir veritabanından veya API'den çekilecek
// Örnek olarak bazı oyunlar ekliyorum

const allGames = [
    { id: 1, title: 'Zombi Avı', category: 'Aksiyon', rating: 4, thumbnail: 'images/games/zombie.jpg', url: 'https://example.com/games/zombie' },
    { id: 2, title: 'Futbol Şampiyonu', category: 'Spor', rating: 3, thumbnail: 'images/games/soccer.jpg', url: 'https://example.com/games/soccer' },
    { id: 3, title: 'Labirent Kaçış', category: 'Bulmaca', rating: 5, thumbnail: 'images/games/maze.jpg', url: 'https://example.com/games/maze' },
    { id: 4, title: 'Formula Yarışı', category: 'Yarış', rating: 4, thumbnail: 'images/games/racing.jpg', url: 'https://example.com/games/racing' },
    { id: 5, title: 'Savaş Uçağı', category: 'Aksiyon', rating: 3, thumbnail: 'images/games/airplane.jpg', url: 'https://example.com/games/airplane' },
    { id: 6, title: 'Uzay Savaşları', category: 'Aksiyon', rating: 4, thumbnail: 'images/games/space.jpg', url: 'https://example.com/games/space' },
    { id: 7, title: 'Çiftlik Simülasyonu', category: 'Strateji', rating: 3, thumbnail: 'images/games/farm.jpg', url: 'https://example.com/games/farm' },
    { id: 8, title: 'Basketbol Şov', category: 'Spor', rating: 4, thumbnail: 'images/games/basketball.jpg', url: 'https://example.com/games/basketball' },
    { id: 9, title: 'Ejderha Avcısı', category: 'Macera', rating: 5, thumbnail: 'images/games/dragon.jpg', url: 'https://example.com/games/dragon' },
    { id: 10, title: 'Matematik Oyunu', category: 'Bulmaca', rating: 3, thumbnail: 'images/games/math.jpg', url: 'https://example.com/games/math' }
    // Gerçek uygulamada burada 4000+ oyun olacak
];

// Kategoriler
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

// Oyunları kategoriye göre filtreleme
function getGamesByCategory(categoryId) {
    return allGames.filter(game => {
        const category = categories.find(cat => cat.id === categoryId);
        return category && game.category === category.name;
    });
}

// Oyunları arama sorgusuna göre filtreleme
function searchGames(query) {
    return allGames.filter(game => 
        game.title.toLowerCase().includes(query.toLowerCase()) || 
        game.category.toLowerCase().includes(query.toLowerCase())
    );
}
