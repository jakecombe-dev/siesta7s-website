/* ========================================
   SIESTA 7s - Main JavaScript
   ======================================== */

// ========================================
// Configuration
// ========================================
const CONFIG = {
  eventDate: new Date('2026-05-16T09:00:00-04:00'), // May 16, 2026, 9AM ET (2nd Annual)
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
// Phone Number Formatting
// ========================================
function formatPhoneNumber(value) {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');
  
  // Format based on length
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

function initPhoneFormatting() {
  // Find all phone input fields
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  
  phoneInputs.forEach(input => {
    // Format on input
    input.addEventListener('input', (e) => {
      const cursorPos = e.target.selectionStart;
      const oldLength = e.target.value.length;
      
      e.target.value = formatPhoneNumber(e.target.value);
      
      // Adjust cursor position after formatting
      const newLength = e.target.value.length;
      const diff = newLength - oldLength;
      e.target.setSelectionRange(cursorPos + diff, cursorPos + diff);
    });
    
    // Format on paste
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text');
      e.target.value = formatPhoneNumber(pasted);
    });
    
    // Format existing value if any
    if (input.value) {
      input.value = formatPhoneNumber(input.value);
    }
  });
}

// ========================================
// DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initDynamicContent(); // Load schedule and pricing from localStorage first
  initNavigation();
  initCountdown();
  initScrollReveal();
  initMobileCTA();
  initForms();
  initPhoneFormatting(); // Initialize phone formatting
  highlightCurrentTiers();
  initClubGallery(); // Initialize club photo slideshow
  initSocialFeed(); // Initialize social media feed
  initCyclingPills(); // Initialize cycling pills animation
  initPhotoBanner(); // Initialize seamless photo banner scrolling
  initTeamRegisterInput(); // Initialize hero team registration input
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
  const badgeCountdownEl = document.getElementById('badge-countdown');
  
  // Get related elements that should be hidden when event ends
  const countdownLabel = document.querySelector('.countdown-label-text');
  const limitedTeamsText = document.querySelector('.hero-limited');
  const heroBadge = document.querySelector('.hero-badge-with-countdown');
  
  function updateCountdown() {
    const now = new Date();
    const diff = CONFIG.eventDate - now;
    
    // Event has passed - hide countdown-related elements and show post-event message
    if (diff <= 0) {
      // Hide the "KICKOFF IN" label
      if (countdownLabel) {
        countdownLabel.style.display = 'none';
      }
      // Hide the "Limited to 16 Teams" urgency text
      if (limitedTeamsText) {
        limitedTeamsText.style.display = 'none';
      }
      
      // Update main countdown
      if (countdownEl) {
        countdownEl.innerHTML = `
          <div class="countdown-ended">
            🏆 Stay tuned for next year's tournament!
          </div>
        `;
        countdownEl.classList.add('event-ended');
      }
      
      // Update badge countdown to show event completed
      if (badgeCountdownEl) {
        badgeCountdownEl.innerHTML = `<span class="badge-countdown-text">Event Completed</span>`;
      }
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    // Update main countdown (if exists)
    if (countdownEl) {
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
    
    // Update badge countdown (compact inline format)
    if (badgeCountdownEl) {
      badgeCountdownEl.innerHTML = `
        <span class="badge-countdown-item"><strong>${days}</strong>d</span>
        <span class="badge-countdown-separator">:</span>
        <span class="badge-countdown-item"><strong>${hours.toString().padStart(2, '0')}</strong>h</span>
        <span class="badge-countdown-separator">:</span>
        <span class="badge-countdown-item"><strong>${minutes.toString().padStart(2, '0')}</strong>m</span>
        <span class="badge-countdown-separator">:</span>
        <span class="badge-countdown-item"><strong>${seconds.toString().padStart(2, '0')}</strong>s</span>
      `;
    }
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
  
  // Generate team code for Teams registration
  let teamCode = null;
  if (formType === 'Teams') {
    teamCode = generateTeamCode(data.fields.teamName);
    data.fields.teamCode = teamCode;
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
    showFormSuccess(form, formType, data.fields.amountDue, teamCode);
    
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

function showFormSuccess(form, formType, amount, teamCode = null) {
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
  
  // Team code message for Team registrations with download button
  let teamCodeMessage = '';
  let downloadButton = '';
  if (teamCode) {
    teamCodeMessage = `
      <div id="team-code-card" style="background: linear-gradient(135deg, #1a365d 0%, #2d8b9e 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; text-align: center;">
        <p style="font-size: 0.875rem; margin-bottom: 0.75rem; color: rgba(255,255,255,0.85); font-weight: 500;">Your Team Code:</p>
        <p style="font-size: 1.75rem; font-weight: 800; font-family: monospace; letter-spacing: 3px; margin-bottom: 0.75rem; color: #fff;">${teamCode}</p>
        <p style="font-size: 0.8rem; color: rgba(255,255,255,0.9); font-weight: 500; margin-top: 0.5rem;">⚠️ Save this code! You'll need it to manage your roster.</p>
      </div>
      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 1rem;">
        <button onclick="downloadTeamCodeCard('${teamCode}', ${amount || 0})" style="background: linear-gradient(135deg, #1a365d 0%, #2d8b9e 100%); color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem;">
          📥 Download Team Card
        </button>
      </div>
      <p style="font-size: 0.75rem; color: #718096; margin-bottom: 1rem;">📸 Screenshot this page or download your team card to save your code!</p>
      
      <!-- PWA Install Prompt -->
      <div id="pwa-success-prompt" style="background: linear-gradient(135deg, #f6893a 0%, #e07830 100%); border-radius: 12px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; display: flex; align-items: center; gap: 1rem; text-align: left;">
        <div style="background: white; width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
          <span style="font-size: 1.5rem;">📲</span>
        </div>
        <div style="flex: 1;">
          <p style="color: white; font-weight: 600; font-size: 0.9rem; margin: 0 0 0.25rem 0;">Get the Team Portal App</p>
          <p style="color: rgba(255,255,255,0.9); font-size: 0.75rem; margin: 0; line-height: 1.3;">Install on your phone for instant access to manage your roster!</p>
        </div>
        <a href="team-portal.html" style="background: white; color: #1a365d; padding: 0.6rem 1rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem; text-decoration: none; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">Get App</a>
      </div>
      
      <p style="margin-bottom: 1rem;">
        <a href="team-portal.html" style="color: #2d8b9e; font-weight: 600;">Go to Team Captain Portal →</a>
      </p>
    `;
  }
  
  formCard.innerHTML = `
    <div class="form-success" id="success-card-content">
      <div class="form-success-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3>You're In! 🎉</h3>
      <p>Your ${formType.toLowerCase()} registration has been submitted successfully.</p>
      ${teamCodeMessage}
      ${paymentMessage}
      <p>Questions? Email us at sarasotarugbyclub@gmail.com</p>
    </div>
  `;
  
  // Scroll to success message
  formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Download team code card as image using html2canvas
async function downloadTeamCodeCard(teamCode, amount) {
  const successCard = document.getElementById('success-card-content');
  
  if (!successCard) {
    alert('Unable to capture card. Please take a screenshot instead.');
    return;
  }
  
  // Dynamically load html2canvas if not already loaded
  if (typeof html2canvas === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script.onload = () => captureAndDownload(successCard, teamCode);
    script.onerror = () => {
      alert('Unable to load image capture library. Please take a screenshot instead.');
    };
    document.head.appendChild(script);
  } else {
    captureAndDownload(successCard, teamCode);
  }
}

// Capture the element and download as JPG
async function captureAndDownload(element, teamCode) {
  try {
    // Hide the download button temporarily for clean capture
    const downloadBtn = element.querySelector('button');
    const screenshotHint = element.querySelector('p[style*="color: #718096"]');
    if (downloadBtn) downloadBtn.style.display = 'none';
    if (screenshotHint) screenshotHint.style.display = 'none';
    
    // Capture the element
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2, // Higher resolution
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    
    // Restore button visibility
    if (downloadBtn) downloadBtn.style.display = '';
    if (screenshotHint) screenshotHint.style.display = '';
    
    // Convert to JPG and download
    const link = document.createElement('a');
    link.download = `siesta7s-${teamCode}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    
  } catch (error) {
    console.error('Error capturing card:', error);
    alert('Unable to capture card. Please take a screenshot instead.');
  }
}

// Generate unique team code based on team name
function generateTeamCode(teamName) {
  if (!teamName) {
    // Fallback to random code if no team name
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'S7-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
  
  // Clean team name: uppercase, remove special chars, replace spaces with nothing
  let cleanName = teamName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '') // Remove non-alphanumeric
    .substring(0, 10); // Limit to 10 chars
  
  // Ensure minimum length
  if (cleanName.length < 3) {
    cleanName = cleanName.padEnd(3, 'X');
  }
  
  return `S7-${cleanName}`;
}

// ========================================
// Dynamic Content from localStorage
// ========================================
const DEFAULT_SCHEDULE = [
  {
    day: 'Friday',
    date: 'May 15, 2026',
    title: 'Pre-Tournament Party',
    time: '6:00 PM - 9:00 PM',
    location: 'Daiquiri Deck Southbridge',
    description: 'Kick off the weekend right! Meet other teams, enjoy live music, enter the 50/50 raffle, compete in the cornhole tournament, and grab some giveaways. The perfect warm-up for tournament day.'
  },
  {
    day: 'Saturday',
    date: 'May 16, 2026',
    title: 'Tournament Day',
    time: 'Kickoff at 9:00 AM',
    location: 'Siesta Key Beach',
    description: 'The main event! Beach rugby matches throughout the day on the famous white quartz sand. Food vendors, merchandise, music, and incredible beach atmosphere. Awards ceremony following the final matches.'
  },
  {
    day: 'Saturday',
    date: 'May 16, 2026',
    displayDate: 'Evening',
    title: 'Siesta Stumble Bar Crawl',
    time: 'After Tournament Concludes',
    location: 'Siesta Key Village',
    description: 'Keep the celebration going! Post-tournament bar crawl hitting multiple iconic Siesta Key Village spots. All venues within walking distance — no driving needed. The perfect way to cap off an epic day.'
  }
];

const DEFAULT_TEAM_PRICING = [
  { name: 'Super Early', price: '$200', deadline: 'February 28, 2025' },
  { name: 'Early Bird', price: '$250', deadline: 'March 31, 2025' },
  { name: 'Regular', price: '$300', deadline: 'April 30, 2025' },
  { name: 'Late', price: '$350', deadline: 'May 15, 2025' }
];

const DEFAULT_FREEAGENT_PRICING = [
  { name: 'Earliest Rate', price: '$30', deadline: 'March 15, 2025' },
  { name: 'Normal Rate', price: '$40', deadline: 'May 9, 2025' },
  { name: 'Final Week Rate', price: '$50', deadline: 'May 15, 2025' }
];

function initDynamicContent() {
  loadSchedule();
  loadPricing();
}

function loadSchedule() {
  const container = document.getElementById('schedule-timeline');
  if (!container) return;
  
  let scheduleData;
  try {
    const stored = localStorage.getItem('siesta7s_schedule');
    scheduleData = stored ? JSON.parse(stored) : DEFAULT_SCHEDULE;
  } catch (e) {
    scheduleData = DEFAULT_SCHEDULE;
  }
  
  if (!scheduleData || scheduleData.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:#718096;">No events scheduled yet. Check back soon!</p>';
    return;
  }
  
  // Sort events by date and time
  scheduleData = sortScheduleEvents(scheduleData);
  
  container.innerHTML = scheduleData.map(event => `
    <div class="schedule-item reveal">
      <div class="schedule-time">
        <div class="schedule-day">${event.day}</div>
        <div class="schedule-event-time">${event.time}</div>
        <div class="schedule-date">${event.displayDate || event.date}</div>
      </div>
      <div class="schedule-content">
        <h3>${event.title}</h3>
        <div class="location">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg>
          ${event.location}
        </div>
        <p>${event.description}</p>
      </div>
    </div>
  `).join('');
}

// Sort schedule events by date and time
function sortScheduleEvents(events) {
  return events.slice().sort((a, b) => {
    const dateA = parseEventDateTime(a, events);
    const dateB = parseEventDateTime(b, events);
    return dateA - dateB;
  });
}

// Parse event date and time into a comparable value
function parseEventDateTime(event, allEvents) {
  const dayOrder = { 'Friday': 0, 'Saturday': 1, 'Sunday': 2, 'Monday': 3, 'Tuesday': 4, 'Wednesday': 5, 'Thursday': 6 };
  
  // Try to parse the date field
  let eventDate = null;
  const dateStr = event.date || '';
  
  // Check if it's a full date like "May 15, 2025" or "May 15, 2026"
  const fullDateMatch = dateStr.match(/([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})/);
  if (fullDateMatch) {
    eventDate = new Date(`${fullDateMatch[1]} ${fullDateMatch[2]}, ${fullDateMatch[3]}`);
  } else {
    // If no full date, try to find a reference date from another event on the same day
    const day = event.day || '';
    let referenceDate = null;
    
    // Look for another event on the same day that has a full date
    if (allEvents && allEvents.length > 0) {
      for (const otherEvent of allEvents) {
        if (otherEvent.day === day && otherEvent !== event) {
          const otherDateStr = otherEvent.date || '';
          const otherDateMatch = otherDateStr.match(/([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})/);
          if (otherDateMatch) {
            referenceDate = new Date(`${otherDateMatch[1]} ${otherDateMatch[2]}, ${otherDateMatch[3]}`);
            break;
          }
        }
      }
    }
    
    if (referenceDate) {
      eventDate = referenceDate;
    } else {
      // Fallback: use day of week for ordering relative to event date
      const dayNum = dayOrder[day] !== undefined ? dayOrder[day] : 99;
      // Use the configured event date's year as reference (May 16, 2026)
      eventDate = new Date(2026, 4, 15 + dayNum); // May 15 = Friday, May 16 = Saturday
    }
  }
  
  // Parse time - look for patterns like "6:00 PM", "9:00 AM", "Kickoff at 9:00 AM"
  const timeStr = event.time || '';
  const timeMatch = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(AM|PM|am|pm)/i);
  
  if (timeMatch) {
    let hours = parseInt(timeMatch[1]);
    const minutes = parseInt(timeMatch[2] || '0');
    const isPM = timeMatch[3].toUpperCase() === 'PM';
    
    // Convert to 24-hour format
    if (isPM && hours !== 12) hours += 12;
    if (!isPM && hours === 12) hours = 0;
    
    eventDate.setHours(hours, minutes, 0, 0);
  } else {
    // If time says "Evening" or "After", put it later in the day
    const lowerTime = timeStr.toLowerCase();
    if (lowerTime.includes('evening') || lowerTime.includes('after') || lowerTime.includes('concludes')) {
      eventDate.setHours(20, 0, 0, 0); // 8 PM
    } else {
      eventDate.setHours(12, 0, 0, 0); // Default to noon
    }
  }
  
  return eventDate.getTime();
}

function loadPricing() {
  loadTeamPricing();
  loadFreeAgentPricing();
}

function loadTeamPricing() {
  const tbody = document.querySelector('#team-pricing tbody');
  if (!tbody) return;
  
  let pricingData;
  try {
    const stored = localStorage.getItem('siesta7s_team_pricing');
    pricingData = stored ? JSON.parse(stored) : DEFAULT_TEAM_PRICING;
  } catch (e) {
    pricingData = DEFAULT_TEAM_PRICING;
  }
  
  if (!pricingData || pricingData.length === 0) return;
  
  tbody.innerHTML = pricingData.map((tier, index) => `
    <tr data-tier="${index}">
      <td class="tier-name">${tier.name}</td>
      <td class="tier-price">${tier.price}</td>
      <td class="tier-deadline">${tier.deadline}</td>
    </tr>
  `).join('');
}

function loadFreeAgentPricing() {
  const tbody = document.querySelector('#freeagent-pricing tbody');
  if (!tbody) return;
  
  let pricingData;
  try {
    const stored = localStorage.getItem('siesta7s_freeagent_pricing');
    pricingData = stored ? JSON.parse(stored) : DEFAULT_FREEAGENT_PRICING;
  } catch (e) {
    pricingData = DEFAULT_FREEAGENT_PRICING;
  }
  
  if (!pricingData || pricingData.length === 0) return;
  
  tbody.innerHTML = pricingData.map((tier, index) => `
    <tr data-tier="${index}">
      <td class="tier-name">${tier.name}</td>
      <td class="tier-price">${tier.price}</td>
      <td class="tier-deadline">${tier.deadline}</td>
    </tr>
  `).join('');
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

// ========================================
// Club Gallery Slideshow
// ========================================
function initClubGallery() {
  const gallery = document.querySelector('.gallery-track');
  if (!gallery) return;
  
  const images = gallery.querySelectorAll('img');
  if (images.length === 0) return;
  
  let currentIndex = 0;
  
  // Make first image active
  images[0].classList.add('active');
  
  // Cycle through images every 4 seconds
  setInterval(() => {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
  }, 4000);
}

// ========================================
// Tournament Photo Gallery
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initPhotoGallery();
});

function initPhotoGallery() {
  initHeroSlideshow();
  initPhotoLightbox();
  initLoadMorePhotos();
  initHoverPhotos(); // Initialize inline hover photo triggers
}

// Hero Slideshow
function initHeroSlideshow() {
  const container = document.getElementById('heroSlideshow');
  const dotsContainer = document.getElementById('slideshowDots');
  const prevBtn = document.querySelector('.slideshow-prev');
  const nextBtn = document.querySelector('.slideshow-next');
  
  if (!container) return;
  
  const images = container.querySelectorAll('.slideshow-image');
  if (images.length === 0) return;
  
  let currentSlide = 0;
  let autoplayInterval;
  
  // Create dots
  images.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `slideshow-dot${index === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.slideshow-dot');
  
  function goToSlide(index) {
    images[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    images[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetAutoplay();
  }
  
  function nextSlide() {
    goToSlide((currentSlide + 1) % images.length);
  }
  
  function prevSlide() {
    goToSlide((currentSlide - 1 + images.length) % images.length);
  }
  
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Start autoplay
  startAutoplay();
  
  // Pause on hover
  container.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
  container.addEventListener('mouseleave', startAutoplay);
}

// Photo Lightbox
function initPhotoLightbox() {
  const lightbox = document.getElementById('photoLightbox');
  if (!lightbox) return;
  
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  let allPhotos = [];
  let currentPhotoIndex = 0;
  
  // Collect all photos from the gallery
  function collectPhotos() {
    allPhotos = Array.from(document.querySelectorAll('.photo-gallery .photo-item img'));
  }
  
  // Open lightbox
  function openLightbox(img) {
    collectPhotos();
    currentPhotoIndex = allPhotos.indexOf(img);
    if (currentPhotoIndex === -1) currentPhotoIndex = 0;
    
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Navigate photos
  function showPhoto(index) {
    if (allPhotos.length === 0) return;
    currentPhotoIndex = (index + allPhotos.length) % allPhotos.length;
    const img = allPhotos[currentPhotoIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
  }
  
  // Event delegation for photo clicks
  document.addEventListener('click', (e) => {
    const photoItem = e.target.closest('.photo-item');
    if (photoItem && photoItem.closest('.photo-gallery')) {
      const img = photoItem.querySelector('img');
      if (img) openLightbox(img);
    }
  });
  
  // Lightbox controls
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showPhoto(currentPhotoIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showPhoto(currentPhotoIndex + 1));
  
  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPhoto(currentPhotoIndex - 1);
        break;
      case 'ArrowRight':
        showPhoto(currentPhotoIndex + 1);
        break;
    }
  });
}

// Load More Photos
function initLoadMorePhotos() {
  const loadMoreBtn = document.getElementById('loadMorePhotos');
  const extendedGallery = document.getElementById('extendedGallery');
  
  if (!loadMoreBtn || !extendedGallery) return;
  
  loadMoreBtn.addEventListener('click', () => {
    if (extendedGallery.style.display === 'none') {
      extendedGallery.style.display = 'block';
      loadMoreBtn.textContent = 'Show Less';
      extendedGallery.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      extendedGallery.style.display = 'none';
      loadMoreBtn.textContent = 'View All 47 Photos';
    }
  });
}

// Inline Hover Photos on Keywords
function initHoverPhotos() {
  const triggers = document.querySelectorAll('.hover-photo-trigger[data-photo]');
  if (triggers.length === 0) return;
  
  // Create the hover photo container (single reusable element)
  const container = document.createElement('div');
  container.className = 'hover-photo-container';
  container.innerHTML = `
    <div class="hover-photo-card">
      <img src="" alt="" loading="lazy">
      <div class="hover-photo-title"></div>
    </div>
  `;
  document.body.appendChild(container);
  
  const card = container.querySelector('.hover-photo-card');
  const img = container.querySelector('img');
  const title = container.querySelector('.hover-photo-title');
  
  let currentTrigger = null;
  let isVisible = false;
  let animationFrame = null;
  let startTime = null;
  
  // Mouse position for magnetic effect
  let mouseX = 0;
  let mouseY = 0;
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;
  let targetMagnetX = 0;
  let targetMagnetY = 0;
  let currentMagnetX = 0;
  let currentMagnetY = 0;
  
  // Organic floating animation using sine waves
  function animate(timestamp) {
    if (!isVisible) {
      animationFrame = null;
      return;
    }
    
    if (!startTime) startTime = timestamp;
    const elapsed = (timestamp - startTime) / 1000; // Convert to seconds
    
    // Multiple offset sine waves for organic, non-repetitive motion
    // Different frequencies create complex, natural movement
    const floatX = Math.sin(elapsed * 0.7) * 1.5 + Math.sin(elapsed * 1.3) * 0.8;
    const floatY = Math.cos(elapsed * 0.9) * 1.2 + Math.cos(elapsed * 0.4) * 1.0;
    const floatScale = 1 + Math.sin(elapsed * 0.5) * 0.008; // Very subtle breathing
    
    // Smooth interpolation towards target (lerp)
    const lerpFactor = 0.12;
    currentRotateX += (targetRotateX - currentRotateX) * lerpFactor;
    currentRotateY += (targetRotateY - currentRotateY) * lerpFactor;
    currentMagnetX += (targetMagnetX - currentMagnetX) * lerpFactor;
    currentMagnetY += (targetMagnetY - currentMagnetY) * lerpFactor;
    
    // Combine organic float with mouse-driven rotation
    const finalRotateX = floatY + currentRotateX;
    const finalRotateY = floatX + currentRotateY;
    
    // Apply transforms directly for maximum smoothness
    card.style.transform = `
      translateX(${currentMagnetX}px) 
      translateY(${currentMagnetY}px)
      rotateX(${finalRotateX}deg)
      rotateY(${finalRotateY}deg)
      scale(${floatScale})
    `;
    
    animationFrame = requestAnimationFrame(animate);
  }
  
  // Mouse position tracking for magnetic effect and cursor-centered positioning
  function handleMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (!isVisible || !currentTrigger) return;
    
    // Position card centered on cursor
    positionCardAtCursor(mouseX, mouseY);
    
    const triggerRect = currentTrigger.getBoundingClientRect();
    const triggerCenterX = triggerRect.left + triggerRect.width / 2;
    const triggerCenterY = triggerRect.top;
    
    // Calculate distance from trigger center
    const deltaX = mouseX - triggerCenterX;
    const deltaY = mouseY - triggerCenterY;
    
    // Magnetic pull strength (subtle effect)
    const magnetStrength = 0.06;
    const maxOffset = 20;
    
    targetMagnetX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * magnetStrength));
    targetMagnetY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * magnetStrength));
    
    // Mouse-driven rotation (adds to organic float)
    targetRotateY = (deltaX / 150) * 3;
    targetRotateX = (deltaY / 150) * -2;
  }
  
  // Position card above the cursor
  function positionCardAtCursor(cursorX, cursorY) {
    const cardWidth = 280;
    const cardHeight = 200;
    const offset = 20; // Gap between cursor and card
    
    // Position above the cursor, horizontally centered
    let left = cursorX - (cardWidth / 2);
    let top = cursorY - cardHeight - offset;
    
    // Keep within viewport bounds
    if (left < 10) left = 10;
    if (left + cardWidth > window.innerWidth - 10) {
      left = window.innerWidth - cardWidth - 10;
    }
    if (top < 10) {
      // If not enough room above, show below cursor
      top = cursorY + offset;
    }
    
    container.style.left = `${left}px`;
    container.style.top = `${top}px`;
  }
  
  function positionCard(trigger, initialMouseX, initialMouseY) {
    // Use cursor position if available, otherwise fall back to trigger position
    if (initialMouseX && initialMouseY) {
      positionCardAtCursor(initialMouseX, initialMouseY);
    } else {
      // Fallback: position above the trigger, centered
      const rect = trigger.getBoundingClientRect();
      const cardWidth = 280;
      const cardHeight = 200;
      const offset = 15;
      
      let left = rect.left + (rect.width / 2) - (cardWidth / 2);
      let top = rect.top - cardHeight - offset;
      
      // Keep within viewport bounds
      if (left < 10) left = 10;
      if (left + cardWidth > window.innerWidth - 10) {
        left = window.innerWidth - cardWidth - 10;
      }
      if (top < 10) {
        top = rect.bottom + offset;
      }
      
      container.style.left = `${left}px`;
      container.style.top = `${top}px`;
    }
  }
  
  function showPhoto(trigger, event) {
    let photoPath = trigger.dataset.photo;
    if (!photoPath) return;
    
    // Ensure path is root-relative
    if (!photoPath.startsWith('/') && !photoPath.startsWith('http')) {
      photoPath = '/' + photoPath;
    }
    
    currentTrigger = trigger;
    
    // Set image and title
    img.src = photoPath;
    img.alt = trigger.textContent;
    title.textContent = trigger.textContent;
    
    // Position the card centered on cursor
    const cursorX = event ? event.clientX : null;
    const cursorY = event ? event.clientY : null;
    positionCard(trigger, cursorX, cursorY);
    
    // Reset animation state
    currentRotateX = 0;
    currentRotateY = 0;
    currentMagnetX = 0;
    currentMagnetY = 0;
    targetRotateX = 0;
    targetRotateY = 0;
    targetMagnetX = 0;
    targetMagnetY = 0;
    startTime = null;
    
    // Show and start animation
    requestAnimationFrame(() => {
      card.classList.add('visible');
      isVisible = true;
      if (!animationFrame) {
        animationFrame = requestAnimationFrame(animate);
      }
    });
  }
  
  function hidePhoto() {
    card.classList.remove('visible');
    isVisible = false;
    currentTrigger = null;
  }
  
  // Attach event listeners to each trigger
  triggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', (e) => showPhoto(trigger, e));
    trigger.addEventListener('mouseleave', hidePhoto);
  });
  
  // Global mouse move for magnetic effect
  document.addEventListener('mousemove', handleMouseMove);
}

// ========================================
// Social Media Feed
// ========================================
function initSocialFeed() {
  // Initialize Facebook SDK for Page Plugin
  initFacebookSDK();
  
  // Initialize Instagram feed (placeholder until API configured)
  initInstagramFeed();
}

// Initialize Facebook SDK
function initFacebookSDK() {
  const fbContainer = document.getElementById('facebookFeedContainer');
  if (!fbContainer) return;
  
  // Load Facebook SDK
  window.fbAsyncInit = function() {
    FB.init({
      xfbml: true,
      version: 'v18.0'
    });
    
    // Parse the fb-page element
    FB.XFBML.parse(fbContainer);
  };
  
  // Load the SDK asynchronously
  if (!document.getElementById('facebook-jssdk')) {
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  } else if (window.FB) {
    window.FB.XFBML.parse(fbContainer);
  }
}

// Initialize Instagram Feed (placeholder for now)
function initInstagramFeed() {
  const igContainer = document.getElementById('instagramFeedGrid');
  if (!igContainer) return;
  
  // For now, show a placeholder with a button to follow on Instagram
  // In the future, this could be connected to Behold.so or Instagram Basic Display API
  igContainer.innerHTML = `
    <div class="instagram-feed-placeholder">
      <div class="instagram-feed-placeholder-icon">📸</div>
      <h4>Instagram Feed Coming Soon</h4>
      <p>Follow us for the latest behind-the-scenes action, tournament highlights, and community updates!</p>
      <a href="https://www.instagram.com/srqsurge/" target="_blank" rel="noopener noreferrer" class="btn btn-instagram">
        <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/></svg>
        Follow @srqsurge
      </a>
    </div>
  `;
}

// ========================================
// Cycling Pills Animation
// ========================================
function initCyclingPills() {
  const container = document.getElementById('cycling-pills');
  if (!container) return;
  
  // Massive pool of pills organized by type with estimated character lengths
  const pillsPool = [
    // Player-focused pills (shorter ones preferred for fitting)
    { text: '🏉 16-Team Tournament', type: 'player' },
    { text: '🏆 Win Epic Trophies', type: 'player' },
    { text: '💪 Beach Rugby Glory', type: 'player' },
    { text: '🔥 Compete on Sand', type: 'player' },
    { text: '⚡ Fast-Paced 7s Action', type: 'player' },
    { text: '🎖️ MVP Awards', type: 'player' },
    { text: '🏅 Bracket Tournament', type: 'player' },
    { text: '🤝 Meet New Clubs', type: 'player' },
    { text: '💥 Beach Tackles', type: 'player' },
    { text: '🎯 3 Games Minimum', type: 'player' },
    { text: '🏃 Beach Sprint Drills', type: 'player' },
    { text: '🦵 Sand Training', type: 'player' },
    { text: '🎽 Free Agent Friendly', type: 'player' },
    { text: '🏆 Cup & Plate Brackets', type: 'player' },
    
    // Vendor-focused pills
    { text: '🛍️ Vendor Booths', type: 'vendor' },
    { text: '📍 Prime Beach Location', type: 'vendor' },
    { text: '👥 5000+ Attendees', type: 'vendor' },
    { text: '💼 Grow Your Brand', type: 'vendor' },
    { text: '🎪 Setup Support', type: 'vendor' },
    { text: '📸 Social Media Exposure', type: 'vendor' },
    { text: '🤑 Great Sales Potential', type: 'vendor' },
    { text: '🏖️ Beach Foot Traffic', type: 'vendor' },
    { text: '🎨 Artisan Vendors', type: 'vendor' },
    { text: '🥤 Food & Drink Vendors', type: 'vendor' },
    { text: '👔 Rugby Apparel', type: 'vendor' },
    { text: '🧢 Merchandise Tents', type: 'vendor' },
    
    // Spectator-focused pills
    { text: '🍺 Beer Tent All Day', type: 'spectator' },
    { text: '🎵 Live DJ', type: 'spectator' },
    { text: '🌅 Sunset Views', type: 'spectator' },
    { text: '🎉 Epic Afterparty', type: 'spectator' },
    { text: '🍔 Grub All Day', type: 'spectator' },
    { text: '🌴 Beach Vibes', type: 'spectator' },
    { text: '☀️ Florida Sunshine', type: 'spectator' },
    { text: '🎶 DJ Sets', type: 'spectator' },
    { text: '🍹 Tropical Drinks', type: 'spectator' },
    { text: '📷 Photo Ops', type: 'spectator' },
    { text: '🎊 Free Admission', type: 'spectator' },
    { text: '👨‍👩‍👧 Family Friendly', type: 'spectator' },
    { text: '🪵 Cornhole Tournament', type: 'spectator' },
    { text: '🎁 Giveaways', type: 'spectator' },
    { text: '🎤 Live Announcer', type: 'spectator' },
    { text: '🪑 Beach Chairs Welcome', type: 'spectator' },
    
    // General/atmosphere pills
    { text: '🏖️ Siesta Key Beach', type: 'general' },
    { text: '🔥 Inaugural Event', type: 'general' },
    { text: '✨ Florida\'s Best Beach', type: 'general' },
    { text: '🎪 Festival Atmosphere', type: 'general' },
    { text: '🌞 All-Day Fun', type: 'general' },
    { text: '🎭 Costume Contest', type: 'general' },
    { text: '🍻 Friday Pre-Party', type: 'general' },
    { text: '🍻 Siesta Stumble Crawl', type: 'general' },
    { text: '🚗 Easy Parking', type: 'general' },
    { text: '🎪 Tent Village', type: 'general' },
    { text: '🎈 Beach Party Vibes', type: 'general' },
    { text: '🌅 Saturday Sunset', type: 'general' },
    { text: '💃 Dance Floor', type: 'general' },
    { text: '🎯 50/50 Raffle', type: 'general' },
    { text: '🙌 Community Event', type: 'general' }
  ];
  
  // Animation configurations
  const cycleInterval = 2200; // ms between cycles
  const animationVariants = 6;
  const pillGap = 8; // Gap between pills in px (matches var(--space-sm))
  const pillPadding = 24; // Approximate horizontal padding per pill (left + right)
  const charWidth = 8; // Approximate character width in px for small text
  const safetyMargin = 20; // Extra margin to ensure pills never clip
  
  let activePills = [];
  let usedIndices = new Set();
  let numVisiblePills = 4; // Will be calculated dynamically
  let maxPillTextLength = 30; // Will be calculated dynamically
  
  // Calculate how many pills can fit in the available width
  function calculatePillCapacity() {
    const containerWidth = container.offsetWidth || container.clientWidth || 700;
    const availableWidth = containerWidth - safetyMargin;
    
    // Estimate average pill width (character count * char width + padding)
    const avgPillTextLength = 16; // Average text length
    const avgPillWidth = (avgPillTextLength * charWidth) + pillPadding;
    
    // Calculate how many pills fit
    const pillsWithGaps = Math.floor((availableWidth + pillGap) / (avgPillWidth + pillGap));
    numVisiblePills = Math.max(2, Math.min(5, pillsWithGaps)); // Clamp between 2 and 5
    
    // Calculate max text length based on remaining space per pill
    const spacePerPill = (availableWidth - ((numVisiblePills - 1) * pillGap)) / numVisiblePills;
    maxPillTextLength = Math.floor((spacePerPill - pillPadding) / charWidth);
    
    return numVisiblePills;
  }
  
  // Get pills that fit within the max text length
  function getFilteredPillsPool() {
    return pillsPool.filter(pill => pill.text.length <= maxPillTextLength);
  }
  
  // Shuffle array helper
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  // Get random pill avoiding recently used, respecting max length
  function getRandomPill() {
    const filteredPool = getFilteredPillsPool();
    
    // Reset if we've used most pills
    if (usedIndices.size >= filteredPool.length - numVisiblePills) {
      usedIndices.clear();
    }
    
    let pill;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
      const randomIndex = Math.floor(Math.random() * filteredPool.length);
      pill = filteredPool[randomIndex];
      const originalIndex = pillsPool.indexOf(pill);
      
      if (!usedIndices.has(originalIndex)) {
        usedIndices.add(originalIndex);
        return pill;
      }
      attempts++;
    } while (attempts < maxAttempts);
    
    // Fallback: return any fitting pill
    return filteredPool[Math.floor(Math.random() * filteredPool.length)];
  }
  
  // Get random animation class
  function getRandomInAnimation() {
    return `pill-pop-in-${Math.floor(Math.random() * animationVariants) + 1}`;
  }
  
  function getRandomOutAnimation() {
    return `pill-pop-out-${Math.floor(Math.random() * animationVariants) + 1}`;
  }
  
  // Create pill element
  function createPillElement(pillData) {
    const span = document.createElement('span');
    span.className = 'highlight-tag';
    span.setAttribute('data-type', pillData.type);
    span.textContent = pillData.text;
    return span;
  }
  
  // Initialize visible pills
  function initializePills() {
    container.innerHTML = '';
    activePills = [];
    usedIndices.clear();
    
    // Calculate capacity based on container width
    calculatePillCapacity();
    
    // Get initial set with good variety from filtered pool
    const filteredPool = getFilteredPillsPool();
    const shuffled = shuffle(filteredPool);
    const initial = shuffled.slice(0, numVisiblePills);
    
    initial.forEach((pillData, index) => {
      const el = createPillElement(pillData);
      container.appendChild(el);
      activePills.push({ element: el, data: pillData });
      usedIndices.add(pillsPool.indexOf(pillData));
      
      // Stagger initial pop-in animations
      setTimeout(() => {
        el.classList.add(getRandomInAnimation());
      }, index * 120);
    });
  }
  
  // Track which position was last swapped to avoid repetition
  let lastSwappedIndex = -1;
  
  // Cycle one random pill
  function cycleRandomPill() {
    if (activePills.length === 0) return;
    
    // Pick random position to swap, avoiding the same position as last time
    let swapIndex;
    if (activePills.length > 1) {
      do {
        swapIndex = Math.floor(Math.random() * activePills.length);
      } while (swapIndex === lastSwappedIndex);
    } else {
      swapIndex = 0;
    }
    
    lastSwappedIndex = swapIndex;
    const oldPill = activePills[swapIndex];
    const newPillData = getRandomPill();
    
    // Clear existing animations and apply pop-out
    const outAnim = getRandomOutAnimation();
    oldPill.element.className = 'highlight-tag';
    oldPill.element.setAttribute('data-type', oldPill.data.type);
    oldPill.element.classList.add(outAnim);
    
    // After pop-out completes, replace with new pill
    setTimeout(() => {
      // Create new pill
      const newEl = createPillElement(newPillData);
      
      // Replace in DOM
      container.replaceChild(newEl, oldPill.element);
      
      // Update tracking
      activePills[swapIndex] = { element: newEl, data: newPillData };
      
      // Animate in
      setTimeout(() => {
        newEl.classList.add(getRandomInAnimation());
      }, 30);
    }, 200);
  }
  
  // Start the cycling
  initializePills();
  
  // Start cycling after initial animation
  setTimeout(() => {
    setInterval(cycleRandomPill, cycleInterval);
  }, 1500);
  
  // Handle window resize - reinitialize pills with new capacity
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const oldNumPills = numVisiblePills;
      calculatePillCapacity();
      
      // Only reinitialize if pill count changed significantly
      if (oldNumPills !== numVisiblePills) {
        initializePills();
      }
    }, 250); // Debounce resize events
  });
}

// ========================================
// Seamless Photo Banner Scroll
// ========================================
function initPhotoBanner() {
  const bannerTracks = document.querySelectorAll('.banner-track');
  
  if (!bannerTracks.length) return;
  
  // Function to setup all tracks
  function setupAllTracks() {
    bannerTracks.forEach(track => {
      setupBannerLoop(track);
    });
  }
  
  // Wait for all banner images to load for accurate measurements
  function waitForImages() {
    const allImages = document.querySelectorAll('.banner-track img');
    const imagePromises = Array.from(allImages).map(img => {
      if (img.complete && img.naturalWidth > 0) {
        return Promise.resolve();
      }
      return new Promise(resolve => {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // Resolve even on error to not block
      });
    });
    
    return Promise.all(imagePromises);
  }
  
  // Check if document is already loaded
  if (document.readyState === 'complete') {
    // Page already loaded, wait for images then setup
    waitForImages().then(setupAllTracks);
  } else {
    // Wait for page load, then wait for images
    window.addEventListener('load', () => {
      waitForImages().then(setupAllTracks);
    });
  }
  
  // Also run on resize to recalculate
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(setupAllTracks, 200);
  });
}

function setupBannerLoop(track) {
  // Skip if already processed
  if (track.dataset.loopInitialized === 'true') {
    recalculateScrollAmount(track);
    return;
  }
  
  const images = track.querySelectorAll('img');
  if (images.length === 0) return;
  
  // Get all unique image sources in order of first appearance
  const seenSources = new Set();
  const originalImages = [];
  
  for (const img of images) {
    const src = img.getAttribute('src');
    if (seenSources.has(src)) {
      // Found first duplicate - stop collecting originals
      break;
    }
    seenSources.add(src);
    originalImages.push(img);
  }
  
  // Remove any existing duplicates (we'll create our own)
  const allImages = Array.from(track.querySelectorAll('img'));
  for (let i = originalImages.length; i < allImages.length; i++) {
    allImages[i].remove();
  }
  
  // Clone all original images TWICE to create a seamless loop
  // This ensures we always have enough content visible during the animation
  for (let i = 0; i < 2; i++) {
    originalImages.forEach(img => {
      const clone = img.cloneNode(true);
      clone.classList.add('banner-clone');
      track.appendChild(clone);
    });
  }
  
  // Mark as initialized
  track.dataset.loopInitialized = 'true';
  
  // Calculate scroll amount after images are fully rendered
  // Use multiple frames to ensure layout is complete
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      recalculateScrollAmount(track);
    });
  });
}

// Helper function to calculate and set the scroll amount
function recalculateScrollAmount(track) {
  const originalImages = track.querySelectorAll('img:not(.banner-clone)');
  if (originalImages.length === 0) return;
  
  const computedStyle = getComputedStyle(track);
  const gap = parseFloat(computedStyle.gap) || 8;
  
  // Calculate total width of original content (all original images + gaps between them)
  let originalWidth = 0;
  originalImages.forEach((img, index) => {
    // Use getBoundingClientRect for precise measurements
    const rect = img.getBoundingClientRect();
    originalWidth += rect.width;
    // Add gap for each image (including last one since clones follow)
    originalWidth += gap;
  });
  
  // Ensure we have a valid width before setting
  if (originalWidth > 0) {
    // Set the CSS variable to scroll exactly one set of original images
    track.style.setProperty('--scroll-amount', `${-originalWidth}px`);
  }
}

// ========================================
// Registration Sidebar Parallax Scroll
// ========================================
function initRegistrationParallax() {
  const registrationSections = document.querySelectorAll('.registration-grid');
  
  if (registrationSections.length === 0 || window.innerWidth <= 900) return;
  
  registrationSections.forEach(grid => {
    const sidebar = grid.querySelector('.registration-info');
    const formCard = grid.querySelector('.form-card');
    
    if (!sidebar || !formCard) return;
    
    // Add parallax-active class for smooth transitions
    sidebar.classList.add('parallax-active');
    
    // Create scroll handler for this section
    const handleScroll = () => {
      const gridRect = grid.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      const formRect = formCard.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far into the section we've scrolled
      const sectionTop = gridRect.top;
      const sectionHeight = gridRect.height;
      const sidebarHeight = sidebar.offsetHeight;
      const formHeight = formCard.offsetHeight;
      
      // Only apply parallax when the section is in view
      if (gridRect.bottom < 0 || gridRect.top > viewportHeight) {
        sidebar.style.setProperty('--scroll-offset', '0px');
        return;
      }
      
      // Calculate the scroll progress through the form
      // We want the sidebar to scroll up alongside the form content
      const headerOffset = 100; // Match the sticky top value
      const maxSidebarTravel = Math.max(0, formHeight - sidebarHeight);
      
      // How far past the top of viewport is the grid (accounting for header)
      const scrolledPast = Math.max(0, -sectionTop + headerOffset);
      
      // Calculate parallax offset - sidebar moves with a slight delay for satisfaction
      // The sidebar scrolls at a slightly slower rate to create the parallax feel
      const parallaxRatio = 0.15; // Subtle parallax effect
      const rawOffset = scrolledPast * parallaxRatio;
      
      // Clamp the offset so sidebar doesn't scroll past its natural boundaries
      const clampedOffset = Math.min(rawOffset, maxSidebarTravel * 0.3);
      
      // Apply smooth eased offset
      sidebar.style.setProperty('--scroll-offset', `${clampedOffset}px`);
    };
    
    // Throttled scroll listener for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    // Initial call
    handleScroll();
  });
}

// Initialize on DOMContentLoaded after other inits
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for layout to settle before initializing parallax
  setTimeout(initRegistrationParallax, 100);
});

// Re-initialize on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    // Remove old parallax state
    document.querySelectorAll('.registration-info').forEach(el => {
      el.classList.remove('parallax-active');
      el.style.setProperty('--scroll-offset', '0px');
    });
    // Re-initialize if screen is large enough
    if (window.innerWidth > 900) {
      initRegistrationParallax();
    }
  }, 250);
});

// ========================================
// Team Registration Input Handler
// ========================================
function initTeamRegisterInput() {
  const input = document.getElementById('hero-team-name-input');
  const submitBtn = document.getElementById('hero-team-submit');
  const container = document.querySelector('.team-register-input-container');
  
  if (!input || !submitBtn) return;
  
  // Handle input changes for visual feedback
  input.addEventListener('input', () => {
    if (input.value.trim().length > 0) {
      container.classList.add('has-text');
    } else {
      container.classList.remove('has-text');
    }
  });
  
  // Handle Enter key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitTeamRegistration(input.value);
    }
  });
  
  // Handle button click
  submitBtn.addEventListener('click', () => {
    submitTeamRegistration(input.value);
  });
}

function submitTeamRegistration(teamName) {
  const trimmedName = teamName.trim();
  
  // Build the URL with team name as parameter
  let url = 'register.html';
  if (trimmedName) {
    url += '?teamName=' + encodeURIComponent(trimmedName);
  }
  
  // Navigate to registration page
  window.location.href = url;
}
