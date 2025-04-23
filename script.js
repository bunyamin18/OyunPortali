const grid = document.getElementById('gameGrid');
const randomBtn = document.getElementById('randomBtn');

const games = Array.from({length:4000},(_,i)=>({
  id:i+1,
  url:`games/${i+1}/index.html`,
  thumbnail:`games/${i+1}/thumbnail.png`,
  tags: (i+1)%2===0?['action']:['kids']
}));

// Oyun kartlarını oluştur
games.forEach(g=>{
  const d=document.createElement('div');
  d.className='game-card';
  d.innerHTML=`<img src="${g.thumbnail}"><h3>Oyun ${g.id}</h3>`;
  d.onclick=()=>location.href=g.url;
  grid.appendChild(d);
});

// Rastgele butonu
randomBtn.onclick=()=>{
  const r=games[Math.floor(Math.random()*games.length)];
  location.href=r.url;
};
