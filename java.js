/* 1. LY KIMPHEV PORTFOLIO JAVASCRIPT */

document.addEventListener('DOMContentLoaded', () => {
  
  /* 1. Theme Switcher */
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  /* 2. Mobile Navigation Menu Toggle */
  const menuToggleBtn = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggleBtn && navMenu) {
    menuToggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggleBtn.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggleBtn.classList.remove('active');
      });
    });
  }

  /* 3. Scrollspy & Back To Top Button */
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if (navLink) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* 4. Project Category Filtering */
  const filterBtns = document.querySelectorAll('.cyber-filter-btn, .filter-btn');
  const projectCards = document.querySelectorAll('.cyber-project-card, .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* 5. Project Modal Details */
  const modal = document.getElementById('projectModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalBody = document.getElementById('modalBody');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  const projectsData = {
    "1": {
      title: "1. Full-Stack Computer Store Website",
      category: "Full-Stack Web App",
      image: "images/project_1.png",
      description: "Built full-stack e-commerce site for laptops and PC hardware featuring a dynamic React.js frontend, Laravel REST APIs, and PostgreSQL database for orders & inventory.",
      features: [
        "Built full-stack e-commerce site for laptops and PC hardware.",
        "Created dynamic UI with React.js components and product filtering.",
        "Engineered Laravel REST APIs and PostgreSQL database for orders & inventory.",
        "Designed scalable database schema for hardware product variants & user shopping cart."
      ],
      technologies: ["React.js", "Laravel API", "PostgreSQL", "REST APIs"],
      demoUrl: "https://computer-store-front-end.vercel.app/",
      githubUrl: "https://github.com/lykimphev"
    },
    "2": {
      title: "2. Personal Portfolio Website",
      category: "Frontend Web",
      image: "images/portfolio.png",
      description: "Designed clean, responsive portfolio to showcase bio, education, skills, and projects using semantic HTML5, CSS3, and JavaScript.",
      features: [
        "Designed clean, responsive portfolio to showcase bio, education, and projects.",
        "Built using semantic HTML5 tags and structured CSS styling.",
        "Integrated dark and light theme switcher with smooth local storage memory.",
        "Integrated direct FormSubmit background email delivery API."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      demoUrl: "index.html",
      githubUrl: "https://github.com/lykimphev"
    },
    "3": {
      title: "3. Clothing Store POS & Inventory System",
      category: "Management & POS System",
      image: "images/project-3.jpg",
      description: "Engineered a full-featured Point-of-Sale (POS) terminal and real-time inventory management application with stock alerts, barcode scanning, and sales reports.",
      features: [
        "Engineered real-time inventory management application for apparel retail.",
        "Built interactive React.js POS terminal with Tailwind CSS styling.",
        "Integrated Node.js backend services with PostgreSQL database for transaction logs.",
        "Created administrative dashboards for sales reports and low-stock alerts."
      ],
      technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL", "Tailwind CSS"],
      demoUrl: "https://github.com/lykimphev",
      githubUrl: "https://github.com/lykimphev"
    },
    "4": {
      title: "4. Apartment Management System",
      category: "Full-Stack Web App",
      image: "images/project_4.jpg",
      description: "Developed a full-featured apartment management system with tenant tracking, lease management, and maintenance request handling.",
      features: [
        "Designed a comprehensive apartment management solution for property owners.",
        "Built a responsive web interface using React.js (TypeScript) and ASP.NET Core 8.",
        "Integrated PostgreSQL database for efficient data storage and retrieval.",
        "Implemented JWT & RBAC for secure user authentication and authorization."
      ],
      technologies: ["React.js (TypeScript)", "ASP.NET Core 8", "PostgreSQL", "Entity Framework Core", "JWT & RBAC"],
      demoUrl: "https://github.com/lykimphev",
      githubUrl: "https://github.com/lykimphev"
    }
  };

  function openModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="project-tag" style="display:inline-block; margin-bottom: 8px; color: var(--accent-emerald); font-family: 'Space Grotesk', sans-serif;">${data.category}</span>
        <h2 style="font-size: 1.6rem; margin-bottom: 15px; color: var(--text-primary);">${data.title}</h2>
        <img src="${data.image}" alt="${data.title}" style="width: 100%; height: 240px; object-fit: cover; border-radius: 12px; margin-bottom: 20px; border: 1px solid var(--border-cyber);" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80'">
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${data.description}</p>
      
      <h4 style="font-size: 1.05rem; margin-bottom: 10px; color: var(--text-primary); font-family: 'Space Grotesk', sans-serif;">Key Highlights & Features:</h4>
      <ul style="list-style: disc; padding-left: 20px; color: var(--text-secondary); margin-bottom: 20px;">
        ${data.features.map(f => `<li style="margin-bottom: 6px;">${f}</li>`).join('')}
      </ul>

      <h4 style="font-size: 1.05rem; margin-bottom: 10px; color: var(--text-primary); font-family: 'Space Grotesk', sans-serif;">Technologies Used:</h4>
      <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 25px;">
        ${data.technologies.map(t => `<span style="background: rgba(0, 210, 255, 0.1); color: var(--accent-cyan); border: 1px solid rgba(0, 210, 255, 0.3); padding: 4px 12px; border-radius: 6px; font-size: 0.82rem; font-family: 'Space Grotesk', sans-serif;">${t}</span>`).join('')}
      </div>

      <div style="display: flex; gap: 15px; flex-wrap: wrap;">
        <a href="${data.demoUrl}" target="_blank" class="btn btn-cyber modal-demo-btn" style="flex: 1; justify-content: center;">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        <a href="${data.githubUrl}" target="_blank" class="btn btn-glass modal-code-btn" style="flex: 1; justify-content: center;">View Code <i class="fa-brands fa-github"></i></a>
      </div>
    `;

    const demoBtn = modalBody.querySelector('.modal-demo-btn');
    const codeBtn = modalBody.querySelector('.modal-code-btn');

    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        showToast(`Opening Live Demo for ${data.title}...`);
      });
    }

    if (codeBtn) {
      codeBtn.addEventListener('click', () => {
        showToast(`Opening GitHub source code for ${data.title}...`);
      });
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openModal(projectId);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  /* 6. Contact Form Validation & FormSubmit API */
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('userName');
      const emailInput = document.getElementById('userEmail');
      const messageInput = document.getElementById('userMessage');

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.parentElement.classList.add('error');
        isValid = false;
      } else {
        nameInput.parentElement.classList.remove('error');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        emailInput.parentElement.classList.add('error');
        isValid = false;
      } else {
        emailInput.parentElement.classList.remove('error');
      }

      if (!messageInput.value.trim()) {
        messageInput.parentElement.classList.add('error');
        isValid = false;
      } else {
        messageInput.parentElement.classList.remove('error');
      }

      if (isValid) {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subjectInput = document.getElementById('userSubject');
        const subject = subjectInput ? (subjectInput.value.trim() || 'Portfolio Inquiry') : 'Portfolio Inquiry';
        const message = messageInput.value.trim();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<span>SENDING...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
        }

        showToast("Sending message directly to lykimphev@gmail.com...");

        fetch("https://formsubmit.co/ajax/lykimphev@gmail.com", {
          method: "POST",
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: `New Portfolio Message from ${name}: ${subject}`,
            _replyto: email,
            _template: "table",
            _captcha: "false",
            "Sender Name": name,
            "Sender Email": email,
            "Subject": subject,
            "Message": message
          })
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('AJAX submit blocked');
          }
        })
        .then(data => {
          showToast("Success! Message sent directly to lykimphev@gmail.com");
          contactForm.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>SEND MESSAGE</span> <i class="fa-solid fa-paper-plane"></i>';
          }
        })
        .catch(error => {
          showToast("Submitting message to lykimphev@gmail.com...");
          contactForm.submit();
        });
      }
    });
  }

  /* 7. Live Cambodia Time Clock */
  function updateCambodiaClock() {
    const timeBadge = document.getElementById('cambodiaTimeBadge');
    if (!timeBadge) return;

    const options = {
      timeZone: 'Asia/Phnom_Penh',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };

    try {
      const timeString = new Intl.DateTimeFormat('en-US', options).format(new Date());
      timeBadge.textContent = `Phnom Penh ${timeString} ICT (UTC+7)`;
    } catch (err) {
      timeBadge.textContent = `Phnom Penh (UTC+7)`;
    }
  }

  updateCambodiaClock();
  setInterval(updateCambodiaClock, 1000);

});