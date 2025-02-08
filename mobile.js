let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  touchMoveX = 0;
  touchMoveY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      if (e.touches.length === 2) {
        this.rotating = true;
      } else {
        this.holdingPaper = true;
        this.rotating = false;
        paper.style.zIndex = highestZ++;
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      }
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      this.touchMoveX = e.touches[0].clientX;
      this.touchMoveY = e.touches[0].clientY;
      this.velX = this.touchMoveX - this.prevTouchX;
      this.velY = this.touchMoveY - this.prevTouchY;

      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      } else {
        const dirX = this.touchMoveX - this.touchStartX;
        const dirY = this.touchMoveY - this.touchStartY;
        const angle = Math.atan2(dirY, dirX);
        this.rotation = (360 + Math.round((180 * angle) / Math.PI)) % 360;
      }

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;

      this.prevTouchX = this.touchMoveX;
      this.prevTouchY = this.touchMoveY;
    });

    paper.addEventListener('touchend', () => {
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

// 🎵 Fix autoplay music issue on mobile
document.addEventListener("click", function () {
  let music = document.getElementById("background-music");
  if (music && music.paused) {
    music.play().catch(error => console.log("Autoplay blocked:", error));
  }
});
