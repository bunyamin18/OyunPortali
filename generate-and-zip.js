// Node.js script to generate /games/1…4000 and zip :contentReference[oaicite:9]{index=9}
const fs = require('fs');
const path = require('path');
const yazl = require('yazl');

const TOTAL = 4000;
const BASE = path.join(__dirname, 'games');

// 1) Oyun klasörlerini yarat
for (let i = 1; i <= TOTAL; i++) {
  const dir = path.join(BASE, String(i));
  fs.mkdirSync(dir, { recursive: true });                       // recursive mkdir :contentReference[oaicite:10]{index=10}

  // thumbnail.svg placeholder
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100">
    <rect width="150" height="100" fill="#ccc"/>
    <text x="75" y="55" font-size="14" text-anchor="middle" fill="#333">Oyun ${i}</text>
  </svg>`;
  fs.writeFileSync(path.join(dir, 'thumbnail.png'), Buffer.from(svg));

  // Phaser index.html
  const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>Oyun ${i}</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"></script>
    <style>body{margin:0;}canvas{display:block;}</style></head><body>
    <script>
      const config={ type:Phaser.AUTO, width:480, height:320, parent:null,
        scene:{ preload(){this.load.image('logo','thumbnail.png');},
                create(){const logo=this.add.image(240,160,'logo');this.tweens.add({targets:logo,y:50,duration:2000,yoyo:true,loop:-1});}
        }
      };
      new Phaser.Game(config);
    </script></body></html>`;
  fs.writeFileSync(path.join(dir,'index.html'), html);
}

// 2) ZIP’e ekle
const zip = new yazl.ZipFile();
function addDir(src, root) {
  for (const f of fs.readdirSync(src)) {
    const full = path.join(src,f), rel = path.join(root,f);
    if (fs.statSync(full).isDirectory()) addDir(full, rel);
    else zip.addFile(full, rel);
  }
}
addDir(__dirname, '');
zip.outputStream.pipe(fs.createWriteStream('OyunPortal_4000.zip')).on('close',()=>console.log('ZIP tamamlandı'));
zip.end();
