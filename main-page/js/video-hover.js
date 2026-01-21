class VideoHoverManager {
  constructor() {
    this.videoCards = document.querySelectorAll('.video-card');
    this.currentHoveredCard = null;
    this.hoverTimeout = null;
    this.preloadedIframes = new Set();
    
    this.init();
  }

  init() {
    this.videoCards.forEach(card => {
      const iframe = card.querySelector('.hover-iframe');
      
      card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
      card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
      
      iframe.addEventListener('load', () => {
        card.classList.remove('loading');
      });
    });
  }

  handleMouseEnter(e) {
    const card = e.currentTarget;
    const iframe = card.querySelector('.hover-iframe');
    
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }

    this.hoverTimeout = setTimeout(() => {
      this.currentHoveredCard = card;
      
      if (!this.preloadedIframes.has(iframe)) {
        card.classList.add('loading');
        const dataSrc = iframe.getAttribute('data-src');
        if (dataSrc) {
          iframe.src = dataSrc;
          this.preloadedIframes.add(iframe);
        }
      } else {
        this.playVideo(iframe);
      }
    }, 150);
  }

  handleMouseLeave(e) {
    const card = e.currentTarget;
    const iframe = card.querySelector('.hover-iframe');
    
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    
    card.classList.remove('loading');
    this.currentHoveredCard = null;
    
    this.pauseVideo(iframe);
  }

  playVideo(iframe) {
    if (iframe.src && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } catch (e) {
      }
    }
  }

  pauseVideo(iframe) {
    if (iframe.src && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        setTimeout(() => {
          iframe.contentWindow.postMessage('{"event":"command","func":"seekTo","args":[0, true]}', '*');
        }, 100);
      } catch (e) {
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new VideoHoverManager();
});

window.addEventListener('message', (e) => {
  if (e.origin === 'https://www.youtube.com') {
  }
});