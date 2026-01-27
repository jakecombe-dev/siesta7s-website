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
  
  // Team code message for Team registrations
  let teamCodeMessage = '';
  if (teamCode) {
    teamCodeMessage = `
      <div style="background: #f8fafc; border: 2px solid #1a365d; padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0; text-align: center;">
        <p style="font-size: 0.875rem; margin-bottom: 0.75rem; color: #4a5568; font-weight: 500;">Your Team Code:</p>
        <p style="font-size: 1.75rem; font-weight: 800; font-family: monospace; letter-spacing: 3px; margin-bottom: 0.75rem; color: #1a365d; background: #e2e8f0; padding: 0.5rem 1rem; border-radius: 8px; display: inline-block;">${teamCode}</p>
        <p style="font-size: 0.8rem; color: #c53030; font-weight: 600; margin-top: 0.5rem;">⚠️ Save this code! You'll need it to manage your roster.</p>
      </div>
      <p style="margin-bottom: 1rem;">
        <a href="team-portal.html" style="color: #2d8b9e; font-weight: 600;">Go to Team Captain Portal →</a>
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
      ${teamCodeMessage}
      ${paymentMessage}
      <p>Questions? Email us at sarasotarugbyclub@gmail.com</p>
    </div>
  `;
  
  // Scroll to success message
  formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
    date: 'May 15, 2025',
    title: 'Pre-Tournament Party',
    time: '6:00 PM - 9:00 PM',
    location: 'Daiquiri Deck Southbridge',
    description: 'Kick off the weekend right! Meet other teams, enjoy live music, enter the 50/50 raffle, compete in the cornhole tournament, and grab some giveaways. The perfect warm-up for tournament day.'
  },
  {
    day: 'Saturday',
    date: 'May 16, 2025',
    title: 'Tournament Day',
    time: 'Kickoff at 9:00 AM',
    location: 'Siesta Key Beach',
    description: 'The main event! Beach rugby matches throughout the day on the famous white quartz sand. Food vendors, merchandise, music, and incredible beach atmosphere. Awards ceremony following the final matches.'
  },
  {
    day: 'Saturday',
    date: 'Evening',
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
        <div class="schedule-date">${event.date}</div>
      </div>
      <div class="schedule-content">
        <h3>${event.title}</h3>
        <div class="time">${event.time}</div>
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
    const dateA = parseEventDateTime(a);
    const dateB = parseEventDateTime(b);
    return dateA - dateB;
  });
}

// Parse event date and time into a comparable value
function parseEventDateTime(event) {
  const dayOrder = { 'Friday': 0, 'Saturday': 1, 'Sunday': 2, 'Monday': 3, 'Tuesday': 4, 'Wednesday': 5, 'Thursday': 6 };
  
  // Try to parse the date field
  let eventDate = null;
  const dateStr = event.date || '';
  
  // Check if it's a full date like "May 15, 2025" or "May 15, 2026"
  const fullDateMatch = dateStr.match(/([A-Za-z]+)\s+(\d{1,2}),?\s*(\d{4})/);
  if (fullDateMatch) {
    eventDate = new Date(`${fullDateMatch[1]} ${fullDateMatch[2]}, ${fullDateMatch[3]}`);
  } else {
    // If no full date, use day of week for ordering
    const day = event.day || '';
    const dayNum = dayOrder[day] !== undefined ? dayOrder[day] : 99;
    // Create a reference date (use 2026 as base year)
    eventDate = new Date(2026, 0, 1 + dayNum);
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
