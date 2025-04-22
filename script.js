// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Sayfa yüklendiğinde çalışacak kodlar

    // Daha Fazla Oyun Göster butonuna tıklama olayı
    const viewMoreBtn = document.querySelector('.view-more .btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', loadMoreGames);
    }

    // Arama formu gönderildiğinde
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = this.querySelector('input').value.trim();
            if (searchTerm) {
                searchGames(searchTerm);
            }
        });
    }

    // Bülten aboneliği formları
    const newsletterForms = document.querySelectorAll('.newsletter form, .footer-section.newsletter form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value.trim();
            if (validateEmail(email)) {
                subscribeNewsletter(email);
                this.querySelector('input').value = '';
                alert('Bülten aboneliğiniz için teşekkürler!');
            } else {
                alert('Lütfen geçerli bir e-posta adresi girin.');
            }
        });
    });

    // Kategorilere ve oyun kartlarına hover efekti
    addHoverEffects();
});

// Daha fazla oyun yüklemek için
function loadMoreGames() {
    // Bu fonksiyon normalde bir API'den daha fazla oyun yükleyecek
    // Şimdilik örnek olarak yeni oyun kartları oluşturacağız
    
    const gamesGrid = document.querySelector('.games-grid');
    const gameNames = [
        'Yeni Oyun 1', 'Yeni Oyun 2', 'Yeni Oyun 3', 
        'Yeni Oyun 4', 'Yeni Oyun 5', 'Yeni Oyun 6'
    ];
    
    const categories = [
        'Aksiyon', 'Macera', 'Strateji', 'Spor', 'Bulmaca', 'Simulasyon'
    ];
    
    const ratings = [3.5, 4.0, 4.5, 5.0, 3.0, 4.2];
    
    for (let i = 0; i < 6; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomCategory2 = categories[Math.floor(Math.random() * categories.length)];
        const gameCategory = randomCategory === randomCategory2 ? randomCategory : `${randomCategory}, ${randomCategory2}`;
        
        const rating = ratings[Math.floor(Math.random() * ratings.length)];
        
        const gameCard = createGameCard(gameNames[i], gameCategory, rating);
        gamesGrid.appendChild(gameCard);
    }
    
    // Yeni eklenen kartlara da hover efekti ekleyelim
    addHoverEffects();
}

// Oyun kartı oluşturma fonksiyonu
function createGameCard(name, category, rating) {
    const gameCard = document.createElement('div');
    gameCard.className = 'game-card';
    
    // Yıldız sayısını hesapla
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-// script.js (devamı)
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    gameCard.innerHTML = `
        <div class="game-image">
            <img src="/api/placeholder/200/150" alt="${name}">
            <div class="overlay">
                <button class="play-btn">Oyna</button>
            </div>
        </div>
        <div class="game-info">
            <h3>${name}</h3>
            <div class="rating">
                ${starsHTML}
                <span>${rating.toFixed(1)}</span>
            </div>
            <p class="category">${category}</p>
        </div>
    `;
    
    return gameCard;
}

// Arama fonksiyonu
function searchGames(searchTerm) {
    console.log(`Aranan oyun: "${searchTerm}"`);
    // Normal şartlarda bu işlev, veritabanındaki oyunları arayacak
    // ve sonuçları gösterecek
    
    // Örnek olarak bir arama sayfasına yönlendirelim
    alert(`"${searchTerm}" araması için sonuçlar yükleniyor...`);
    // window.location.href = `/search.html?q=${encodeURIComponent(searchTerm)}`;
}

// E-posta doğrulama
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Bülten aboneliği
function subscribeNewsletter(email) {
    console.log(`Bülten aboneliği: ${email}`);
    // Bu işlev normalde e-posta adresini veritabanına kaydedecek
}

// Hover efektleri ekleyen fonksiyon
function addHoverEffects() {
    // Oyun kartları için tıklama olayı
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        // Karta tıklandığında oyun detay sayfasına git
        card.addEventListener('click', function() {
            const gameName = this.querySelector('h3').textContent;
            // window.location.href = `/game-detail.html?game=${encodeURIComponent(gameName)}`;
            alert(`${gameName} detay sayfası açılıyor...`);
        });
        
        // Oyna butonuna tıklandığında yönlendirme yap
        const playBtn = card.querySelector('.play-btn');
        if (playBtn) {
            playBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Kart tıklama olayını engelle
                const gameName = card.querySelector('h3').textContent;
                // window.location.href = `/play-game.html?game=${encodeURIComponent(gameName)}`;
                alert(`${gameName} oyunu başlatılıyor...`);
            });
        }
    });
    
    // Kategori kartlarına tıklandığında
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = this.querySelector('h3').textContent;
            // window.location.href = `/category.html?cat=${encodeURIComponent(categoryName)}`;
            alert(`${categoryName} kategorisindeki oyunlar yükleniyor...`);
        });
    });
}

// Sayfa kaydırma animasyonu
function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Pencere boyutu değiştiğinde düzenleme
window.addEventListener('resize', function() {
    // Tepkisel düzenlemeler
});

// Sayfa yüklenme hızını artırmak için görüntüleri lazy-load etme
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});
