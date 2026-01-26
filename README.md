# Siesta 7s - Beach Rugby Tournament Website

First annual beach rugby tournament on Siesta Key Beach, Sarasota, Florida.

**Live at:** http://localhost:65337 (when server is running)

## Quick Start

```bash
# Start local server
npx serve -p 3000

# Or use Python
python3 -m http.server 3000
```

Open http://localhost:3000 in your browser.

## Features

- ✅ Hero with countdown timer to May 16, 2025
- ✅ About section with feature cards
- ✅ Weekend schedule timeline
- ✅ Team registration with pricing tiers
- ✅ Free agent registration
- ✅ Vendor applications
- ✅ Sponsor inquiries
- ✅ Payment information (Venmo/Zelle)
- ✅ Responsive mobile design
- ✅ Sticky navigation
- ✅ Mobile CTA bar
- ✅ Form validation with error states
- ✅ Auto-calculated pricing tiers

## Google Sheets Setup

To enable form submissions:

1. Create a Google Sheet with 4 tabs: `Teams`, `Free Agents`, `Vendors`, `Sponsors`
2. Go to Extensions → Apps Script
3. Paste this code:

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const tab = sheet.getSheetByName(data.formType);
  
  if (!tab) return ContentService.createTextOutput(JSON.stringify({error: 'Tab not found'}));
  
  tab.appendRow([
    new Date(),
    ...Object.values(data.fields)
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy → New deployment → Web app
5. Set "Who has access" to "Anyone"
6. Copy the URL and paste it in `js/main.js` → `CONFIG.googleScriptUrl`

## Deployment

1. Push to GitHub
2. Connect to Vercel or Netlify
3. Deploy (auto-deploys from main branch)

## File Structure

```
siesta-7s-website/
├── index.html          # Main page
├── css/styles.css      # All styles
├── js/main.js          # JavaScript functionality
├── assets/
│   ├── images/
│   │   └── logo.png    # Event logo
│   └── documents/      # Roster/waiver templates
├── CONTEXT.md          # Full specifications
└── README.md           # This file
```

## Customization

Edit these files:
- **Content:** `index.html`
- **Colors/Fonts:** CSS custom properties in `css/styles.css`
- **Pricing/Dates:** `CONFIG` object in `js/main.js`

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | #1a365d | Headers, primary text |
| Sunset Orange | #f6893a | CTAs, accents |
| Teal | #2d8b9e | Secondary accents |
| Gold | #f4c542 | Highlights |
| Sand | #f5f0e6 | Backgrounds |

---

Built for Sarasota Rugby Club
