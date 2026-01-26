/* ========================================
   SIESTA 7s - Main JavaScript
   ======================================== */

// ========================================
// Configuration
// ========================================
const CONFIG = {
  eventDate: new Date('2025-05-16T09:00:00-04:00'), // May 16, 2025, 9AM ET
  googleScriptUrl: 'https://script.google.com/macros/s/AKfycbyndwQKFl7FMY9PjM525VMR8ImmhMm5ShelQtGU1wcVnZtxCyERMfxQohDzeo8wdgmkpA/exec', // Google Apps Script for form submissions
  
  // Pricing tiers with deadlines
  teamTiers: [
    { name: 'Super Early', price: 200, deadline: new Date('2025-02-28T23:59:59') },
    { name: 'Early Bird', price: 250, deadline: new Date('2025-03-31T23:59:59') },
    { name: 'Regular', price: 300, deadline: new Date('2025-04-30T23:59:59') },
    { name: 'Late', price: 350, deadline: new Date('2025-05-15T23:59:59') }
  ],
  freeAgentTiers: [
    { name: 'Earliest Rate', price: 30, deadline: new Date('2025-03-15T23:59:59') },
    { name: 'Normal Rate', price: 40, deadline: new Date('2025-05-09T23:59:59') },
    { name: 'Final Week Rate', price: 50, deadline: new Date('2025-05-15T23:59:59') }
  ],
  vendorTiers: [
    { name: 'Early Rate', price: 250, deadline: new Date('2025-04-15T23:59:59') },
    { name: 'Standard Rate', price: 300, deadline: new Date('2025-05-09T23:59:59') },
    { name: 'Last-Minute Rate', price: 350, deadline: new Date('2025-05-15T23:59:59') }
  ]
};

// ========================================
// DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCountdown();
  initScrollReveal();
  initMobileCTA();
  initForms();
  highlightCurrentTiers();
});

// ========================================
// Navigation
// ========================================
function initNavigation() {
  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Scroll behavior for header
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }
  
  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ========================================
// Countdown Timer
// ========================================
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;
  
  function updateCountdown() {
    const now = new Date();
    const diff = CONFIG.eventDate - now;
    
    // Event has passed
    if (diff <= 0) {
      countdownEl.innerHTML = `
        <div class="countdown-ended">
          Get ready for the inaugural Siesta 7s — Florida's hottest beach rugby tournament!
        </div>
      `;
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    countdownEl.innerHTML = `
      <div class="countdown-item">
        <div class="countdown-value">${days}</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">${hours.toString().padStart(2, '0')}</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">${minutes.toString().padStart(2, '0')}</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value">${seconds.toString().padStart(2, '0')}</div>
        <div class="countdown-label">Seconds</div>
      </div>
    `;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ========================================
// Scroll Reveal Animation
// ========================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach(el => observer.observe(el));
}

// ========================================
// Mobile Sticky CTA
// ========================================
function initMobileCTA() {
  const mobileCta = document.querySelector('.mobile-cta');
  const hero = document.querySelector('.hero');
  
  if (!mobileCta || !hero) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mobileCta.classList.remove('visible');
      } else {
        mobileCta.classList.add('visible');
      }
    });
  }, {
    threshold: 0
  });
  
  observer.observe(hero);
}

// ========================================
// Pricing Tier Calculation
// ========================================
function getCurrentTier(tiers) {
  const now = new Date();
  for (const tier of tiers) {
    if (now <= tier.deadline) {
      return tier;
    }
  }
  // Return last tier if all deadlines passed
  return tiers[tiers.length - 1];
}

function highlightCurrentTiers() {
  const now = new Date();
  
  // Highlight team tiers
  document.querySelectorAll('#team-pricing tr[data-tier]').forEach(row => {
    const tierIndex = parseInt(row.dataset.tier);
    const tier = CONFIG.teamTiers[tierIndex];
    if (tier && now <= tier.deadline) {
      // Check if this is the current active tier
      const isActive = tierIndex === 0 || now > CONFIG.teamTiers[tierIndex - 1].deadline;
      if (isActive) {
        row.classList.add('tier-active');
      }
    }
  });
  
  // Highlight free agent tiers
  document.querySelectorAll('#freeagent-pricing tr[data-tier]').forEach(row => {
    const tierIndex = parseInt(row.dataset.tier);
    const tier = CONFIG.freeAgentTiers[tierIndex];
    if (tier && now <= tier.deadline) {
      const isActive = tierIndex === 0 || now > CONFIG.freeAgentTiers[tierIndex - 1].deadline;
      if (isActive) {
        row.classList.add('tier-active');
      }
    }
  });
  
  // Highlight vendor tiers
  document.querySelectorAll('#vendor-pricing tr[data-tier]').forEach(row => {
    const tierIndex = parseInt(row.dataset.tier);
    const tier = CONFIG.vendorTiers[tierIndex];
    if (tier && now <= tier.deadline) {
      const isActive = tierIndex === 0 || now > CONFIG.vendorTiers[tierIndex - 1].deadline;
      if (isActive) {
        row.classList.add('tier-active');
      }
    }
  });
}

// ========================================
// Form Handling
// ========================================
function initForms() {
  const forms = document.querySelectorAll('form[data-form-type]');
  
  forms.forEach(form => {
    form.addEventListener('submit', handleFormSubmit);
  });
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const formType = form.dataset.formType;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Check honeypot
  const honeypot = form.querySelector('.form-hp input');
  if (honeypot && honeypot.value) {
    console.log('Bot detected');
    return;
  }
  
  // Validate form
  if (!validateForm(form)) {
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = `
    <svg class="spinner" width="20" height="20" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="30 70" style="animation: spin 1s linear infinite;"/>
    </svg>
    Submitting...
  `;
  
  // Collect form data
  const formData = new FormData(form);
  const data = {
    formType: formType,
    timestamp: new Date().toISOString(),
    fields: {}
  };
  
  formData.forEach((value, key) => {
    if (!key.startsWith('hp_')) {
      data.fields[key] = value;
    }
  });
  
  // Calculate tier and amount
  let tiers;
  switch (formType) {
    case 'Teams':
      tiers = CONFIG.teamTiers;
      break;
    case 'Free Agents':
      tiers = CONFIG.freeAgentTiers;
      break;
    case 'Vendors':
      tiers = CONFIG.vendorTiers;
      break;
    default:
      tiers = null;
  }
  
  if (tiers) {
    const currentTier = getCurrentTier(tiers);
    data.fields.registrationTier = currentTier.name;
    data.fields.amountDue = currentTier.price;
  }
  
  try {
    // If Google Script URL is configured, submit to it
    if (CONFIG.googleScriptUrl) {
      const response = await fetch(CONFIG.googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    }
    
    // Show success state
    showFormSuccess(form, formType, data.fields.amountDue);
    
  } catch (error) {
    console.error('Form submission error:', error);
    alert('There was an error submitting your form. Please try again or contact us directly.');
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;
  }
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');
  
  // Clear previous errors
  form.querySelectorAll('.form-group').forEach(group => {
    group.classList.remove('error');
  });
  
  requiredFields.forEach(field => {
    const group = field.closest('.form-group');
    
    if (!field.value.trim()) {
      isValid = false;
      if (group) {
        group.classList.add('error');
      }
    }
    
    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        if (group) {
          group.classList.add('error');
        }
      }
    }
    
    // Phone validation (basic)
    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
        isValid = false;
        if (group) {
          group.classList.add('error');
        }
      }
    }
  });
  
  // Scroll to first error
  if (!isValid) {
    const firstError = form.querySelector('.form-group.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  return isValid;
}

function showFormSuccess(form, formType, amount) {
  const formCard = form.closest('.form-card');
  
  let paymentMessage = '';
  if (amount) {
    paymentMessage = `
      <p><strong>Amount Due: $${amount}</strong></p>
      <p>Please complete your payment via Venmo or Zelle to:</p>
      <p style="font-family: monospace; background: rgba(45, 139, 158, 0.1); padding: 10px; border-radius: 8px; margin: 10px 0;">
        sarasotarugbyclub@gmail.com
      </p>
    `;
  }
  
  formCard.innerHTML = `
    <div class="form-success">
      <div class="form-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3>You're In! 🎉</h3>
      <p>Your ${formType.toLowerCase()} registration has been submitted successfully.</p>
      ${paymentMessage}
      <p>Questions? Email us at sarasotarugbyclub@gmail.com</p>
    </div>
  `;
  
  // Scroll to success message
  formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ========================================
// Utility: Spinner Animation
// ========================================
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spinner {
    animation: spin 1s linear infinite;
  }
`;
document.head.appendChild(style);
