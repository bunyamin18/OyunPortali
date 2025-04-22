// game-detail.js
document.addEventListener('DOMContentLoaded', function() {
    // Sekme değiştirme fonksiyonu
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Aktif sekme butonunu güncelle
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Aktif içerik panesini göster
            const tabId = this.getAttribute('data-tab');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Yorum yıldız derecelendirmesi
    const ratingStars = document.querySelectorAll('.rating-select i');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            updateStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            updateStars(selectedRating);
        });
        
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            updateStars(selectedRating);
        });
    });
    
    function updateStars(rating) {
        ratingStars.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            if (starRating <= rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }
    
    // Favori ekleme butonu
    const favoriteBtn = document.querySelector('.add-favorite');
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.className = 'fas fa-heart';
                this.style.color = '#e53e3e';
                alert('Oyun favorilerinize eklendi!');
            } else {
                icon.className = 'far fa-heart';
                this.style.color = '';
                alert('Oyun favorilerinizden çıkarıldı!');
            }
        });
    }
    
    // Paylaş butonu
    const shareBtn = document.querySelector('.share');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            // Web Share API kullanılabilir mi kontrol et
            if (navigator.share) {
                navigator.share({
                    title: document.querySelector('.game-info h1').textContent,
                    text: 'Bu oyunu keşfedin!',
                    url: window.location.href
                })
                .then(() => console.log('Paylaşım başarılı'))
                .catch((error) => console.log('Paylaşım hatası:', error));
            } else {
                // Web Share API desteklenmiyorsa
                const shareUrl = window.location.href;
                const dummy = document.createElement('textarea');
                document.body.appendChild(dummy);
                dummy.value = shareUrl;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                alert('Oyun bağlantısı panoya kopyalandı!');
            }
        });
    }
    
    // Şimdi Oyna butonu
    const playNowBtn = document.querySelector('.play-now');
    if (playNowBtn) {
        playNowBtn.addEventListener('click', function() {
            const gameName = document.querySelector('.game-info h1').textContent;
            // Normalde oyun sayfasına yönlendirecek
            alert(`${gameName} oyunu başlatılıyor...`);
            // window.location.href = `/play-game.html?game=${encodeURIComponent(gameName)}`;
        });
    }
    
    // Yorum formunu gönderme
    const commentForm = document.querySelector('.comment-form form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const comment = document.getElementById('comment').value.trim();
            
            if (!name || !email || !comment || selectedRating === 0) {
                alert('Lütfen tüm alanları doldurun ve bir puan seçin!');
                return;
            }
            
            // Normalde bu veriler bir API'ye gönderilecek
            console.log({
                name,
                email,
                rating: selectedRating,
                comment
            });
            
            // Başarılı gönderim mesajı
            alert('Yorumunuz gönderildi! İncelendikten sonra yayınlanacak.');
            
            // Formu temizle
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('comment').value = '';
            selectedRating = 0;
            updateStars(0);
        });
    }
    
    // Daha fazla yorum yükleme
    const loadMoreBtn = document.querySelector('.load-more .btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Normalde daha fazla yorum yüklenecek
            loadMoreComments();
        });
    }
    
    // Örnek yorum yükleme fonksiyonu
    function loadMoreComments() {
        const commentsList = document.querySelector('.comments-list');
        const loadMoreContainer = document.querySelector('.load-more');
        
        // Örnek yeni yorumlar
        const newComments = [
            {
                name: 'Zeynep B.',
                rating: 4,
                date: '8 Nisan 2025',
                text: 'Çok eğlenceli bir oyun. Arkadaşlarımla birlikte oynamaktan keyif alıyorum.'
            },
            {
                name: 'Okan T.',
                rating: 5,
                date: '5 Nisan 2025',
                text: 'Muhteşem grafikler ve harika bir hikaye. Bu oyuna bayıldım!'
            },
            {
                name: 'Elif D.',
                rating: 3,
                date: '1 Nisan 2025',
                text: 'Oyun güzel ama bazı hatalar var. Geliştiriciler bunları düzeltirse daha iyi olur.'
            }
        ];
        
        // Her yeni yorum için DOM'a yeni elementler ekle
        newComments.forEach(commentData => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            
            // Yıldız HTML'ini oluştur
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= commentData.rating) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }
            
            commentElement.innerHTML = `
                <div class="comment-avatar">
                    <img src="/api/placeholder/50/50" alt="Kullanıcı">
                </div>
                <div class="comment-content">
                    <div class="comment-header">
                        <h4>${commentData.name}</h4>
                        <div class="comment-rating">
                            ${starsHTML}
                        </div>
                        <span class="comment-date">${commentData.date}</span>
                    </div>
                    <div class="comment-text">
                        <p>${commentData.text}</p>
                    </div>
                </div>
            `;
            
            // Yorum listesine ekle (yükleme butonundan önce)
            commentsList.insertBefore(commentElement, loadMoreContainer);
        });
        
        // Yorum sayısını güncelle
        const commentCount = document.querySelector('.comment-count');
        const currentCount = parseInt(commentCount.textContent.replace(/[^0-9]/g, ''));
        commentCount.textContent = `(${currentCount + newComments.length})`;
        
        // Son yorum grubunu yükledikten sonra "Daha Fazla" butonunu kaldır
        loadMoreContainer.style.display = 'none';
    }
    
    // Benzer oyunlar için olay dinleyicileri
    initSimilarGamesEvents();
    
    function initSimilarGamesEvents() {
        const similarGameCards = document.querySelectorAll('#similar .game-card');
        
        similarGameCards.forEach(card => {
            card.addEventListener('click', function() {
                const gameName = this.querySelector('h3').textContent;
                alert(`${gameName} detay sayfasına yönlendiriliyorsunuz...`);
                // window.location.href = `/game-detail.html?game=${encodeURIComponent(gameName)}`;
            });
            
            const playBtn = card.querySelector('.play-btn');
            if (playBtn) {
                playBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const gameName = card.querySelector('h3').textContent;
                    alert(`${gameName} oyunu başlatılıyor...`);
                    // window.location.href = `/play-game.html?game=${encodeURIComponent(gameName)}`;
                });
            }
        });
    }
});
