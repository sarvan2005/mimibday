if ('ontouchstart' in window) { // ✅ Ensure this runs only on mobile
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

    init(paper) {
      paper.addEventListener('touchstart', (e) => {
        if (this.holdingPaper) return;  
        this.holdingPaper = true;

        // Bring the touched paper to the front
        paper.style.zIndex = highestZ++;
        
        let touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.prevTouchX = this.touchStartX;
        this.prevTouchY = this.touchStartY;
      });

      paper.addEventListener('touchmove', (e) => {
        if (!this.holdingPaper) return;
        e.preventDefault(); // Prevent scrolling while dragging

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

  // Apply only on mobile
  document.querySelectorAll('.paper').forEach(paper => {
    new Paper().init(paper);
  });

  // ✅ Prevent scrolling while dragging papers
  document.addEventListener("touchmove", function (e) {
    if (e.target.closest(".paper")) {
      e.preventDefault();
    }
  }, { passive: false });
}
