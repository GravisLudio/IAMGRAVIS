import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply fade-up class to sections and project cards
  const elementsToAnimate = document.querySelectorAll('section, .project-card, .skill-category');
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // Project filtering logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filterValue === 'all') {
          card.style.display = 'block';
          // Re-trigger animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          if (card.getAttribute('data-category') === filterValue) {
            card.style.display = 'block';
            card.classList.remove('visible');
            setTimeout(() => card.classList.add('visible'), 50);
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Modal Logic
  const modal = document.getElementById('project-modal');
  const closeBtn = document.querySelector('.close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalExtended = document.getElementById('modal-extended');
  const modalTech = document.getElementById('modal-tech');

  // Open modal on project card click
  document.querySelectorAll('.project-card').forEach(card => {
    // Ensure the card acts as a button cursor-wise
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', () => {
      const title = card.querySelector('h3').innerText;
      const desc = card.querySelector('p').innerText;
      const extendedHtml = card.querySelector('.project-extended-info').innerHTML;
      const techStackHtml = card.querySelector('.tech-stack').innerHTML;
      
      modalTitle.innerText = title;
      modalDesc.innerText = desc;
      modalExtended.innerHTML = extendedHtml;
      modalTech.innerHTML = techStackHtml;
      
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  });

  // Close modal logic
  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  };

  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Scope Accordion Logic
  const scopeAccordion = document.getElementById('scope-accordion');
  if (scopeAccordion) {
    const scopeHeader = scopeAccordion.querySelector('.scope-header');
    scopeHeader.addEventListener('click', () => {
      scopeAccordion.classList.toggle('expanded');
    });
  }

  // Security Terminal Logic
  const secureBtn = document.getElementById('secure-contact-btn');
  const terminalBox = document.getElementById('terminal-output');
  const terminalText = document.getElementById('terminal-text');
  const revealedContact = document.getElementById('revealed-contact');

  if (secureBtn) {
    secureBtn.addEventListener('click', () => {
      secureBtn.style.display = 'none';
      terminalBox.style.display = 'block';

      const lines = [
        { text: "> Iniciando protocolo de enlace seguro...", class: "" },
        { text: "> Analizando encabezados HTTP y Content-Security-Policy...", class: "" },
        { text: "> [OK] Política CSP restrictiva detectada.", class: "success" },
        { text: "> Verificando firmas de comportamiento del usuario...", class: "" },
        { text: "> [OK] Patrones de movimiento humano confirmados. Ningún bot detectado.", class: "success" },
        { text: "> Escaneando entorno en busca de inyecciones XSS...", class: "warning" },
        { text: "> [OK] Entorno limpio. Desencriptando información de contacto...", class: "success" }
      ];

      let currentLine = 0;
      
      const typeLine = () => {
        if (currentLine < lines.length) {
          const lineEl = document.createElement('div');
          lineEl.className = `terminal-line ${lines[currentLine].class}`;
          lineEl.innerText = lines[currentLine].text;
          
          // Remove cursor from previous
          const oldCursor = document.querySelector('.cursor-blink');
          if (oldCursor) oldCursor.remove();

          terminalText.appendChild(lineEl);
          
          const cursor = document.createElement('span');
          cursor.className = 'cursor-blink';
          terminalText.appendChild(cursor);

          currentLine++;
          setTimeout(typeLine, 800 + Math.random() * 600); // Random delay between lines
        } else {
          // Finished typing
          setTimeout(() => {
            const oldCursor = document.querySelector('.cursor-blink');
            if (oldCursor) oldCursor.remove();
            
            revealedContact.style.display = 'block';
            revealedContact.classList.add('fade-up', 'visible');
          }, 1000);
        }
      };

      // Initial cursor
      const cursor = document.createElement('span');
      cursor.className = 'cursor-blink';
      terminalText.appendChild(cursor);
      
      setTimeout(typeLine, 1000);
    });
  }
});
