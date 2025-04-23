// generate.js
// Node.js ile /games/1 … /games/4000 klasör + index.html üretir

const fs = require('fs');
const path = require('path');

const TOTAL = 4000;
const BASE = path.join(__dirname, 'games');

// 1) Klasörleri ve dosyaları oluştur
for(let i=1; i<=TOTAL; i++) {
  const dir = path.join(BASE, String(i));
  fs.mkdirSync(dir, { recursive: true });                                // Klasör yarat :contentReference[oaicite:6]{index=6}

  // 2) Thumbnail placeholder (istersen kendi png’ini koy)
  const thumbPath = path.join(dir, 'thumbnail.png');
  if(!fs.existsSync(thumbPath)) {
    const canvasPlaceholder = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100">
         <rect width="150" height="100" fill="#ccc"/>
         <text x="75" y="55" font-size="14" text-anchor="middle" fill="#333">Oyun ${i}</text>
       </svg>`
    );
    fs.writeFileSync(thumbPath, canvasPlaceholder);                      // Basit SVG placeholder
  }

  // 3) index.html – Phaser 3 template
  const html = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Oyun ${i}</title>
  <script src="https://cdn.jsdelivr.net/npm/phaser@3/dist/phaser.min.js"></script>
  <style> body{ margin:0;} canvas{display:block;}</style>
</head>
<body>
  <script>
    // Phaser 3 minimal oyun şablonu
    const config = {
      type: Phaser.AUTO,
      width: 480,
      height: 320,
      scene: {
        preload: function() {
          this.load.image('logo', 'thumbnail.png');
        },
        create: function() {
          const logo = this.add.image(240, 160, 'logo');
          this.tweens.add({
            targets: logo,
            y: 50,
            duration: 2000,
            yoyo: true,
            loop: -1
          });
        }
      }
    };
    new Phaser.Game(config);
  </script>
</body>
</html>`;
  fs.writeFileSync(path.join(dir, 'index.html'), html);                  // Oyun dosyasını yaz
}

console.log(`✅ ${TOTAL} oyun klasörü oluşturuldu.`);
