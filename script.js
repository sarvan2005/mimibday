let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener('mousemove', (e) => {
      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }
        
      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      
      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('mousedown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      
      paper.style.zIndex = highestZ;
      highestZ += 1;
      
      if (e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

// 🎵 Auto-play music on first click
document.addEventListener("click", function () {
  let music = document.getElementById("background-music");
  if (music.paused) {
    music.play();
  }
}, { once: true });

// 🖼️ Changing background every 3 seconds
const wallpapers = [
  "https://i.pinimg.com/736x/c7/f8/ab/c7f8ab74d0dcc9b397bfda8eb9990810.jpg",
  "https://i.pinimg.com/736x/5a/d5/af/5ad5af086f5e2224ccdb6f6a35dc204e.jpg",
  "https://i.pinimg.com/736x/2c/cc/97/2ccc97cdac00dd6f0cc840ac730e5d80.jpg",
  "https://i.pinimg.com/736x/bd/81/16/bd81162ee3ba1488f24dfa9823bfa49e.jpg",
  "https://i.pinimg.com/736x/9b/61/ae/9b61ae53a888f56004c13e62596bb077.jpg",
  "https://i.pinimg.com/736x/e8/67/32/e8673298fbcaa79be4d2c8a0c436ec07.jpg",
  "https://i.pinimg.com/736x/53/3d/2f/533d2f4c40ba55b97e9ade0dfc1a8974.jpg",  
  "https://i.pinimg.com/736x/d6/7b/79/d67b79101a9dc003a3d2f5fe62109fe2.jpg"
  
];

let currentWallpaper = 0;
function changeBackground() {
  document.body.style.backgroundImage = `url('${wallpapers[currentWallpaper]}')`;
  currentWallpaper = (currentWallpaper + 1) % wallpapers.length;
}
setInterval(changeBackground, 3000);
