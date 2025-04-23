const gameGrid = document.getElementById('gameGrid');
const tagFilter = document.getElementById('tagFilter');
const randomBtn = document.getElementById('randomBtn');

// 1’den 4000’e kadar oyun manifest’i
const games = Array.from({ length: 4000 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    title: `Oyun ${id}`,
    // Dinamik loader: game.html şablonuna id parametresi
    url: `game.html?id=${id}`,
    thumbnail: `games/${id}/thumbnail.png`,
    tags: id % 2 === 0 ? ['action','adventure'] : ['puzzle','kids']
  };
});

initTags();
displayGames(games);

function initTags() {
  const tags = new Set();
  games.forEach(g => g.tags.forEach(tag => tags.add(tag)));
  tags.forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag; opt.textContent = tag;
    tagFilter.appendChild(opt);
  });
}

tagFilter.addEventListener('change', () => {
  const filtered = tagFilter.value === 'all'
    ? games
    : games.filter(g => g.tags.includes(tagFilter.value));
  displayGames(filtered);
});

randomBtn.addEventListener('click', () => {
  const rand = games[Math.floor(Math.random() * games.length)];
  window.location.href = rand.url;
});

function displayGames(list) {
  gameGrid.innerHTML = '';
  list.forEach(g => {
    const card = document.createElement('div');
    card.className = 'game-card';
    card.innerHTML = `
      <img src="${g.thumbnail}" alt="${g.title}">
      <h3>${g.title}</h3>
    `;
    card.onclick = () => window.location.href = g.url;
    gameGrid.appendChild(card);
  });
}
