const gameGrid = document.getElementById('gameGrid');
const tagFilter = document.getElementById('tagFilter');
const randomBtn = document.getElementById('randomBtn');

// 1’den 4000’e oyun manifest’i
const games = Array.from({ length: 4000 }, (_, i) => ({
  id: i + 1,
  url: `game.html?id=${i+1}`,
  thumbnail: `games/${i+1}/thumbnail.png`,
  tags: (i + 1) % 2 === 0 ? ['action','adventure'] : ['puzzle','kids']
}));

// Etiketleri başlat
const tags = new Set();
games.forEach(g => g.tags.forEach(t => tags.add(t)));
tags.forEach(tag => {
  const opt = document.createElement('option');
  opt.value = tag; opt.textContent = tag;
  tagFilter.appendChild(opt);
});

// Listeyi göster
function display(list) {
  gameGrid.innerHTML = '';
  list.forEach(g => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `<img src="${g.thumbnail}" alt="Oyun ${g.id}"><h3>Oyun ${g.id}</h3>`;
    card.onclick = () => location.href = g.url;
    gameGrid.appendChild(card);
  });
}
display(games);

// Filtreleme
tagFilter.addEventListener('change', () => {
  const f = tagFilter.value;
  display(f === 'all' ? games : games.filter(g => g.tags.includes(f)));
});

// Rastgele oyun
randomBtn.addEventListener('click', () => {
  const r = games[Math.floor(Math.random() * games.length)];
  location.href = r.url;
});
