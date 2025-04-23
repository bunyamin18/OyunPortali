// Node.js script to generate /games/1…4000 with real PNG thumbnails
const fs = require('fs');
const path = require('path');
const request = require('sync-request');
const yazl = require('yazl');

const TOTAL = 4000;
const BASE = path.join(__dirname, 'games');
fs.rmSync(BASE, { recursive: true, force: true });
fs.mkdirSync(BASE, { recursive: true });

// 1) Create games folders
for (let i = 1; i <= TOTAL; i++) {
  const dir = path.join(BASE, String(i));
  fs.mkdirSync(dir, { recursive: true });

  // Download real PNG thumbnail
  const thumbUrl = `https://via.placeholder.com/150x100.png?text=Oyun+${i}`;
  const res = request('GET', thumbUrl);
  fs.writeFileSync(path.join(dir, 'thumbnail.png'), res.getBody());

  // Phaser template index.html
  const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Oyun ${i}</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"></script>
    <style>body{margin:0;}canvas{display:block;}</style></head><body>
    <script>
      const config={ type:Phaser.AUTO, width:480, height:320, parent:null,
        scene:{
          preload(){ this.load.image('logo','thumbnail.png'); },
          create(){ const logo=this.add.image(240,160,'logo'); this.tweens.add({targets:logo,y:50,duration:2000,yoyo:true,loop:-1}); }
        }
      };
      new Phaser.Game(config);
    </script></body></html>`;
  fs.writeFileSync(path.join(dir,'index.html'), html);
}

// 2) ZIP the project
const zip = new yazl.ZipFile();
function addDir(src, root) {
  for (const f of fs.readdirSync(src)) {
    const full = path.join(src,f), rel = path.join(root,f);
    if (fs.statSync(full).isDirectory()) addDir(full, rel);
    else zip.addFile(full, rel);
  }
}
addDir(__dirname, '');
zip.outputStream.pipe(fs.createWriteStream('OyunPortal_4000.zip')).on('close', ()=>console.log('ZIP tamamlandı'));
zip.end();
