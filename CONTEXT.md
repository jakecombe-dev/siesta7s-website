# Siesta 7s - Beach Rugby Tournament Website

## Project Overview

Build a one-page website for the **first annual Siesta 7s**, a beach rugby 7s tournament hosted by Sarasota Rugby Club on Siesta Key Beach, Sarasota, Florida.

The site must handle:
- Event information and schedule
- Team registration with tiered pricing
- Free agent (individual player) registration with tiered pricing
- Vendor applications with tiered pricing
- Sponsor inquiries
- Payment instructions
- All form submissions stored in Google Sheets for admin access

**Primary goal:** Drive registrations and vendor/sponsor inquiries with clear CTAs and frictionless forms.
**Secondary goal:** Communicate the full weekend experience and "first annual" momentum.

**Voice & Tone:** upbeat, energetic, welcoming; short sentences; avoid formal corporate language.

---

## Event Details

| Field | Value |
|-------|-------|
| **Event Name** | Siesta 7s |
| **Host** | Sarasota Rugby Club |
| **Tournament Date** | Saturday, May 16, 2025 |
| **Pre-Party Date** | Friday, May 15, 2025 |
| **Location** | Siesta Key Beach, Sarasota, Florida |
| **Tagline** | "Beach Rugby • Music • Community • Competition" |
| **Vibe** | Competitive but fun, laid-back beach atmosphere |

**Timezone:** Eastern Time (ET)

### Marketing Angles
- #1 beach in America
- White quartz sand
- World-famous Siesta Key Village
- First annual event - building something special

**Audience:** rugby clubs, social teams, free agents, local vendors, and potential sponsors.

---

## Weekend Schedule

### Friday, May 15 - Pre-Tournament Party
| Detail | Info |
|--------|------|
| **Time** | 6:00 PM - 9:00 PM |
| **Location** | Daiquiri Deck Southbridge |
| **Activities** | Live music, 50/50 raffle, cornhole tournament, giveaways, team & vendor meet-up |
| **Purpose** | Kickoff to the weekend |

### Saturday, May 16 - Tournament Day
| Detail | Info |
|--------|------|
| **Kickoff** | 9:00 AM |
| **Location** | Siesta Key Beach |
| **Format** | Matches played throughout the day |
| **Extras** | Food vendors, merchandise, music, beach atmosphere |
| **Closing** | Awards ceremony after final matches |

### Saturday Evening - Siesta Stumble (Bar Crawl)
| Detail | Info |
|--------|------|
| **When** | After tournament concludes |
| **Where** | Siesta Key Village |
| **What** | Post-tournament bar crawl hitting multiple iconic spots, all within walking distance |

---

## Divisions

**Current Division:**
- Men's

**Builder Guidance:** Implement division list as data-driven so additional divisions (Women's, Men's Social, etc.) can be added later without changing layout.

---

## Registration & Pricing

### Team Registration

| Tier | Price | Deadline |
|------|-------|----------|
| Super Early | $200 | February 28, 2025 |
| Early Bird | $250 | March 31, 2025 |
| Regular | $300 | April 30, 2025 |
| Late | $350 | May 15, 2025 |

**Roster Requirements:**
- Minimum players: 7
- Maximum players: 12

**Required Documents:**
- Roster form (downloadable) - **Template to be created**
- Liability waiver (downloadable) - **Template to be created**

**Team Registration Form Fields:**
- Team name
- Division (dropdown: Men's) - *expandable for future divisions*
- Captain/Manager name
- Captain email
- Captain phone number
- Number of players
- How did you hear about us? (optional)

**Team Registration Submission Notes:**
- Collect "Registration Tier" and "Amount Due" as hidden fields or computed client-side based on current date.
- Auto-calculate tier based on submission date.

---

### Free Agent (Individual Player) Registration

For players without a team who want to be placed on one.

| Tier | Price | Deadline |
|------|-------|----------|
| Earliest Rate | $30 | March 15, 2025 |
| Normal Rate | $40 | May 9, 2025 |
| Final Week Rate | $50 | May 15, 2025 |

**Free Agent Form Fields:**
- Full name
- Email
- Phone number
- Division preference (Men's) - *expandable for future divisions*
- Experience level (Beginner / Intermediate / Experienced)
- Position preference (optional)
- Any notes (optional)

**Free Agent Submission Notes:**
- Collect "Registration Tier" and "Amount Due" like team form.
- Auto-calculate tier based on submission date.

---

### Vendor Application

| Tier | Price | Deadline |
|------|-------|----------|
| Early Rate | $250 | April 15, 2025 |
| Standard Rate | $300 | May 9, 2025 |
| Last-Minute Rate | $350 | May 15, 2025 |

**What's Included:**
- Same-day setup and teardown: 9:00 AM - 5:00 PM
- Transportation assistance available (ATVs or similar to help move gear)

**Vendor Application Form Fields:**
- Business/vendor name
- Contact person name
- Email
- Phone number
- Vendor type (dropdown: Food & Beverage / Retail & Merchandise / Services / Other)
- Description of what you're selling/offering
- Do you need power access? (Yes/No)
- Special requirements or notes (optional)

**Vendor Submission Notes:**
- Collect "Registration Tier" and "Amount Due" like team form.
- Auto-calculate tier based on submission date.

---

### Sponsor Inquiries

**Confirmed:** General inquiry form for sponsor interest (no tiered packages).

**Sponsor Inquiry Form Fields:**
- Company/organization name
- Contact person name
- Email
- Phone number
- Sponsorship interest level (dropdown: Title Sponsor / Gold / Silver / Bronze / Custom/Other)
- What type of exposure are you looking for?
- Additional notes (optional)

**Potential Sponsor Benefits to Mention:**
- Brand exposure
- On-site signage
- Social media promotion
- On-site presence/activation opportunities

---

## Payment Information

| Method | Account |
|--------|---------|
| **Venmo** | sarasotarugbyclub@gmail.com |
| **Zelle** | sarasotarugbyclub@gmail.com |

**Instructions:**
- All team, free agent, and vendor payments accepted via Venmo or Zelle
- Both are registered under the same email
- QR code to be displayed on site **[QR CODE IMAGE - PENDING]**

**Suggested Payment Copy:** "Pay by Venmo or Zelle after submitting your form. Use the email `sarasotarugbyclub@gmail.com`."

---

## Branding & Design

### Logo
- File: Provided (tropical beach theme)
- Elements: Palm trees, lifeguard tower, two rugby players, sunset, ocean wave, "7s" prominent
- Text: "SARASOTA, FLORIDA" (top), "SIESTA 7s" (center), "SARASOTA RUGBY CLUB" (bottom)

### Color Palette (extracted from logo)
| Color | Hex | Usage |
|-------|-----|-------|
| Navy Blue | #1a365d | Primary text, headers |
| Sunset Orange | #f6893a | Accents, CTAs, highlights |
| Teal/Aqua | #2d8b9e | Secondary accents |
| Gold/Yellow | #f4c542 | Highlights, special callouts |
| Sand/Cream | #f5f0e6 | Backgrounds |
| White | #ffffff | Cards, contrast areas |

### Design Direction
- Beach/tropical vibes
- Fun but professional
- Mobile-first (most users will access on phones)
- Single-page scrolling layout with anchor navigation
- Clean, modern, easy to scan

**Design Intent:** Bold, energetic hero; warm sand + sunset palette; playful yet legible typography; clear section separation with beach-themed shapes or gradients.

### Images
- Use logo as primary branding element
- Use stock beach/rugby imagery for backgrounds and section visuals
- Optimize all images for fast loading

### CTA Hierarchy
1. Primary: Team registration
2. Secondary: Free agent registration
3. Tertiary: Vendor application and sponsor inquiry

**Mobile CTA:** Use a sticky bottom bar with two buttons (Team + Free Agent) once the user scrolls past the hero.

### Content Blocks (Copy Starters)
**About Paragraph (starter):**
"Siesta 7s is the first annual beach rugby tournament hosted by Sarasota Rugby Club on the white quartz sand of Siesta Key. Expect high-energy matches, live music, and a full weekend of beach community vibes."

**Vendor Pitch (starter):**
"Get your brand in front of players, fans, and tourists on America's #1 beach. Food, retail, and service vendors welcome."

**Sponsor Pitch (starter):**
"Align your brand with a new marquee beach rugby event and reach a highly engaged local and traveling audience."

---

## Social Media

| Platform | Link |
|----------|------|
| **Instagram** | https://www.instagram.com/srqsurge/ |
| **Facebook** | https://www.facebook.com/srqsurge |

---

## Technical Specifications

### Form UX & Validation
- Required fields marked clearly
- Inline validation + friendly error copy
- Success message confirms submission and repeats payment instructions
- Add a hidden honeypot field to reduce spam
- On success, clear form and show "Submitted" state
- Add a short privacy note: "Submissions go to Sarasota Rugby Club and are not shared."

### Hosting & Infrastructure
| Component | Solution | Cost |
|-----------|----------|------|
| **Hosting** | Vercel or Netlify | Free |
| **Backend/Database** | Google Sheets | Free |
| **Domain** | **[PENDING - TBD]** | ~$12/year if needed |
| **Forms** | Custom forms → Google Sheets API | Free |

### Google Sheets Structure

Create one Google Sheet workbook with the following tabs:

**Tab 1: Teams**
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Team Name |
| C | Division |
| D | Captain Name |
| E | Captain Email |
| F | Captain Phone |
| G | Number of Players |
| H | How Heard About Us |
| I | Registration Tier |
| J | Amount Due |
| K | Payment Status (Paid/Unpaid) |
| L | Notes |

**Tab 2: Free Agents**
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Full Name |
| C | Email |
| D | Phone |
| E | Division Preference |
| F | Experience Level |
| G | Position Preference |
| H | Notes |
| I | Registration Tier |
| J | Amount Due |
| K | Payment Status |
| L | Team Assigned |

**Tab 3: Vendors**
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Business Name |
| C | Contact Name |
| D | Email |
| E | Phone |
| F | Vendor Type |
| G | Description |
| H | Needs Power |
| I | Special Requirements |
| J | Registration Tier |
| K | Amount Due |
| L | Payment Status |
| M | Notes |

**Tab 4: Sponsors**
| Column | Data |
|--------|------|
| A | Timestamp |
| B | Company Name |
| C | Contact Name |
| D | Email |
| E | Phone |
| F | Interest Level |
| G | Exposure Goals |
| H | Notes |
| I | Status (New/Contacted/Confirmed/Declined) |
| J | Amount |

### Admin Access
- Admin accesses Google Sheets directly
- Can view, edit, delete, export data
- Can add "Paid" status manually
- Can filter/sort as needed
- Share sheet with relevant organizers

---

## Site Structure (Single Page)

### Navigation (Sticky Header)
```
[LOGO] Siesta 7s    About | Schedule | Register | Vendors | Sponsors | Contact
```

**Anchor IDs (recommended):**
- `#about`
- `#schedule`
- `#register`
- `#vendors`
- `#sponsors`
- `#payment`
- `#contact`

### Section 1: Hero
- Full-width hero with background image or gradient
- Logo prominently displayed
- Event name: "SIESTA 7s"
- Date: "May 16, 2025"
- Location: "Siesta Key Beach • Sarasota, FL"
- Tagline: "Beach Rugby • Music • Community • Competition"
- **Countdown timer to May 16, 2025** (confirmed)
- Primary CTA button: "Register Your Team"
- Secondary CTA: "Join as Free Agent"

**Countdown Behavior:** If the date has passed, replace with "Thanks for an amazing first year - see you next year."

**Hero Microcopy Options:**
- "First annual beach rugby showdown on America's #1 beach."
- "Sun, sand, and 7s. Bring your squad to Siesta Key."

### Section 2: About
- Brief intro paragraph about the event
- Key selling points:
  - First annual tournament
  - #1 beach in America
  - Competitive but fun atmosphere
  - Full weekend experience
- Three feature cards:
  - "On the Field" - competitive beach rugby
  - "Off the Field" - music, food, community
  - "Weekend Experience" - pre-party, tournament, bar crawl

### Section 3: Weekend Schedule
Visual timeline or cards showing:
1. **Friday Night** - Pre-Tournament Party details
2. **Saturday Morning** - Tournament kickoff
3. **Saturday Day** - Matches, vendors, atmosphere
4. **Saturday Evening** - Awards + Siesta Stumble bar crawl

### Section 4: Team Registration
- Optional: short "Registration Hub" row with cards linking to Team, Free Agent, Vendor, Sponsor sections
- Division breakdown (Men's)
- Pricing tier table with deadlines
- What's included
- Roster requirements (7-12 players)
- Download links for roster form and liability waiver
- **Team Registration Form** (embedded)
- Payment instructions with Venmo/Zelle info

### Section 5: Free Agent Registration
- Explanation: "Don't have a team? No problem!"
- Pricing tier table with deadlines
- **Free Agent Form** (embedded)
- Payment instructions

### Section 6: Vendors
- Introduction for potential vendors
- What's included (setup times, transportation help)
- Pricing tier table
- **Vendor Application Form** (embedded)
- Payment instructions

### Section 7: Sponsors
- Why sponsor Siesta 7s
- Exposure opportunities
- **Sponsor Inquiry Form** (embedded)
- Or contact email for sponsorship discussions

### Section 8: Payment Information
- Clear display of payment methods
- Venmo: sarasotarugbyclub@gmail.com
- Zelle: sarasotarugbyclub@gmail.com
- QR code (when provided)
- Note: "Scan and go!"

### Section 9: Contact / Footer
- Sarasota Rugby Club
- Email: sarasotarugbyclub@gmail.com
- Instagram: https://www.instagram.com/srqsurge/
- Facebook: https://www.facebook.com/srqsurge
- Optional: embedded map showing Siesta Key Beach
- Copyright 2025 Sarasota Rugby Club

---

## Tech Stack Recommendation

```
Frontend:        HTML/CSS/JavaScript (vanilla or lightweight framework)
                 OR Next.js/React for more structure

Styling:         Tailwind CSS (fast, responsive, modern)

Forms:           Custom forms with fetch API to Google Sheets
                 Using Google Apps Script as webhook endpoint

Hosting:         Vercel (free tier)

Domain:          User to provide or purchase
```

### Google Sheets Integration

**Method:** Google Apps Script Web App

1. Create Google Sheet with tabs as specified above
2. Create Google Apps Script attached to sheet
3. Deploy as web app (anyone can submit)
4. Forms POST data to the script URL
5. Script appends data to appropriate tab

**Sample Apps Script Structure:**
```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const tab = sheet.getSheetByName(data.formType);

  // Auto-calculate registration tier based on current date
  const today = new Date();
  let tier, amount;

  // Tier calculation logic here based on form type and deadlines

  tab.appendRow([new Date(), ...data.fields, tier, amount, 'Unpaid']);
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**Form Type Names (must match sheet tabs):**
- Teams
- Free Agents
- Vendors
- Sponsors

---

## Pricing Tier Logic (for auto-calculation)

### Team Registration
```javascript
const teamTiers = [
  { name: 'Super Early', price: 200, deadline: new Date('2025-02-28') },
  { name: 'Early Bird', price: 250, deadline: new Date('2025-03-31') },
  { name: 'Regular', price: 300, deadline: new Date('2025-04-30') },
  { name: 'Late', price: 350, deadline: new Date('2025-05-15') }
];
```

### Free Agent Registration
```javascript
const freeAgentTiers = [
  { name: 'Earliest Rate', price: 30, deadline: new Date('2025-03-15') },
  { name: 'Normal Rate', price: 40, deadline: new Date('2025-05-09') },
  { name: 'Final Week Rate', price: 50, deadline: new Date('2025-05-15') }
];
```

### Vendor Registration
```javascript
const vendorTiers = [
  { name: 'Early Rate', price: 250, deadline: new Date('2025-04-15') },
  { name: 'Standard Rate', price: 300, deadline: new Date('2025-05-09') },
  { name: 'Last-Minute Rate', price: 350, deadline: new Date('2025-05-15') }
];
```

---

## Outstanding Items (Minimal)

### Still Pending
- [ ] QR code image for payments (when available)
- [ ] Domain name decision
- [ ] Roster form template (to be created together)
- [ ] Liability waiver template (to be created together)

### Technical Setup Required
- [ ] Create Google Sheet with proper tabs
- [ ] Set up Google Apps Script for form submissions
- [ ] Vercel/Netlify account setup

---

## File Structure (Recommended)

```
siesta-7s-website/
├── index.html              # Main single-page site
├── css/
│   └── styles.css          # All styles (or use Tailwind)
├── js/
│   └── main.js             # Form handling, countdown, navigation
├── assets/
│   ├── images/
│   │   ├── logo.png        # Main logo
│   │   ├── hero-bg.jpg     # Hero background (stock)
│   │   └── qr-code.png     # Payment QR code (when available)
│   └── documents/
│       ├── roster-form.pdf     # (to be created)
│       └── liability-waiver.pdf # (to be created)
├── CONTEXT.md              # This file
└── README.md               # Setup instructions
```

---

## Success Criteria

The website is complete when:

1. **All sections render correctly** on desktop and mobile
2. **All four forms submit successfully** to Google Sheets
3. **Navigation works** smoothly between sections
4. **Payment information** is clear and prominent
5. **Countdown timer** displays correctly and counts down to May 16, 2025
6. **Site loads fast** (< 3 seconds)
7. **Admin can access** Google Sheets and manage all submissions
8. **All pricing tiers and deadlines** are clearly displayed
9. **Registration tier auto-calculates** based on submission date

---

## Notes for Builder

1. **Mobile-first** - Most users will be on phones
2. **Forms are critical** - Test thoroughly before launch
3. **Keep it simple** - One page, smooth scrolling, clear CTAs
4. **Beach vibes** - Use the color palette, keep it fun but professional
5. **Accessibility** - Proper contrast, readable fonts, alt text on images
6. **SEO basics** - Meta tags, Open Graph for social sharing
7. **Fast load times** - Optimize images, minimal dependencies
8. **Tier auto-calculation** - Forms should automatically determine pricing tier based on current date
9. **Division flexibility** - Keep division list data-driven for easy future expansion
10. **Placeholder for pending items** - Use "Coming soon" or similar for QR code until provided
11. **Accessibility details** - 4.5:1 contrast minimum, 44px tap targets, visible focus states
12. **SEO/OG** - Title, description, OG image, and social card preview

---

## Quick Reference: All Deadlines

| Category | Tier | Price | Deadline |
|----------|------|-------|----------|
| **Teams** | Super Early | $200 | Feb 28, 2025 |
| **Teams** | Early Bird | $250 | Mar 31, 2025 |
| **Teams** | Regular | $300 | Apr 30, 2025 |
| **Teams** | Late | $350 | May 15, 2025 |
| **Free Agents** | Earliest | $30 | Mar 15, 2025 |
| **Free Agents** | Normal | $40 | May 9, 2025 |
| **Free Agents** | Final Week | $50 | May 15, 2025 |
| **Vendors** | Early | $250 | Apr 15, 2025 |
| **Vendors** | Standard | $300 | May 9, 2025 |
| **Vendors** | Last-Minute | $350 | May 15, 2025 |

---

*Document created: January 2025*
*Event date: May 16, 2025*
*Last updated: January 25, 2025*
