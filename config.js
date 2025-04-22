// API ve uygulama yapılandırması
const CONFIG = {
    API_BASE_URL: 'https://api.oyun-portali.com/v1',
    ITEMS_PER_PAGE: 12,
    DEFAULT_THUMBNAIL: 'assets/images/default-game.jpg',
    DEFAULT_CATEGORY_IMAGE: 'assets/images/default-category.jpg'
};

// Oyun kategorileri
const CATEGORIES = [
    { id: 1, name: 'Aksiyon', slug: 'aksiyon' },
    { id: 2, name: 'Macera', slug: 'macera' },
    { id: 3, name: 'Strateji', slug: 'strateji' },
    { id: 4, name: 'Spor', slug: 'spor' },
    { id: 5, name: 'Yarış', slug: 'yaris' },
    { id: 6, name: 'Bulmaca', slug: 'bulmaca' },
    { id: 7, name: 'Savaş', slug: 'savas' },
    { id: 8, name: 'Çocuk', slug: 'cocuk' },
    { id: 9, name: 'Simülasyon', slug: 'simulasyon' },
    { id: 10, name: 'RPG', slug: 'rpg' }
];

export { CONFIG, CATEGORIES };
