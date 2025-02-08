let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
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
      if (this.holdingPaper) return;  
      this.holdingPaper = true;
      paper.style.zIndex = highestZ++;
      
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault();
      if (!this.holdingPaper) return;

      let touch = e.touches[0];
      let dx = touch.clientX - this.prevTouchX;
      let dy = touch.clientY - this.prevTouchY;
      
      this.currentPaperX += dx;
      this.currentPaperY += dy;

      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    }, { passive: false });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

// Apply to all papers
document.querySelectorAll('.paper').forEach(paper => {
  new Paper().init(paper);
});

// ✅ Prevent page scrolling while dragging papers
document.addEventListener("touchmove", function (e) {
  if (e.target.closest(".paper")) {
    e.preventDefault();
  }
}, { passive: false });
