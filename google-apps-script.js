// ========================================
// Siesta 7's Registration - Google Apps Script
// Saves to Google Sheet + Sends Confirmation Email
// ========================================
// 
// SETUP INSTRUCTIONS:
// 1. Go to https://script.google.com (logged in as sarasotarugbyclub@gmail.com)
// 2. Click "New Project"
// 3. Delete all the code and paste this entire file
// 4. Click "Deploy" → "New deployment"
// 5. Select Type: "Web app"
// 6. Set "Execute as": Me
// 7. Set "Who has access": Anyone
// 8. Click "Deploy" and authorize when prompted
// 9. Copy the Web App URL and update CONFIG.googleScriptUrl in main.js
//
// ========================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 
        'Form Type', 
        'Team Name', 
        'Team Code', 
        'Captain/Name', 
        'Email', 
        'Phone', 
        'Registration Tier', 
        'Amount Due', 
        'All Fields (JSON)'
      ]);
      // Make header row bold
      sheet.getRange(1, 1, 1, 10).setFontWeight('bold');
    }
    
    // Extract fields from submission
    const fields = data.fields || {};
    const formType = data.formType || 'Unknown';
    const email = fields.email || '';
    const name = fields.captainName || fields.name || 'Registrant';
    const teamName = fields.teamName || '';
    const teamCode = fields.teamCode || '';
    const tier = fields.registrationTier || '';
    const amount = fields.amountDue || '';
    
    // Save registration to Google Sheet
    sheet.appendRow([
      data.timestamp,
      formType,
      teamName,
      teamCode,
      name,
      email,
      fields.phone || '',
      tier,
      amount,
      JSON.stringify(fields)
    ]);
    
    // Send confirmation email to registrant
    if (email) {
      sendConfirmationEmail(email, name, formType, teamName, teamCode, tier, amount);
    }
    
    // Send notification to Sarasota Rugby (optional - you can remove this)
    sendAdminNotification(formType, name, teamName, email, tier, amount);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Registration received and confirmation sent'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Log error for debugging
    console.error('Error processing registration:', error);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ========================================
// Send Confirmation Email to Registrant
// ========================================
function sendConfirmationEmail(email, name, formType, teamName, teamCode, tier, amount) {
  
  // Email subject based on registration type
  const subject = formType === 'Teams' 
    ? `🏉 Welcome to Siesta 7's, ${teamName}!`
    : formType === 'Free Agents'
    ? `🏉 You're Registered as a Free Agent for Siesta 7's!`
    : `🏉 Your Siesta 7's Registration is Confirmed!`;
  
  // Team code section (only for team registrations)
  let teamCodeSection = '';
  if (teamCode) {
    teamCodeSection = `
    <div style="background: linear-gradient(135deg, #1a365d 0%, #2d8b9e 100%); color: white; padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center;">
      <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.9);">Your Team Code:</p>
      <p style="margin: 0; font-size: 32px; font-weight: bold; letter-spacing: 4px; font-family: 'Courier New', monospace;">${teamCode}</p>
      <p style="margin: 12px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.85);">⚠️ Save this code! You'll need it to manage your roster.</p>
    </div>
    <p style="text-align: center; margin: 24px 0;">
      <a href="https://siesta7s.com/team-portal.html" style="background: linear-gradient(135deg, #f6893a 0%, #e07830 100%); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; font-size: 16px;">Access Team Captain Portal →</a>
    </p>
    `;
  }
  
  // Build the HTML email
  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f7fafc;">
    
    <div style="background: white; border-radius: 16px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 2px solid #e2e8f0;">
        <h1 style="color: #1a365d; margin: 0; font-size: 28px;">🏉 SIESTA 7's</h1>
        <p style="color: #718096; margin: 8px 0 0 0; font-size: 14px;">Beach Rugby Tournament • Siesta Key Beach</p>
      </div>
      
      <!-- Greeting -->
      <h2 style="color: #1a365d; margin: 0 0 16px 0;">Hey ${name}! 🎉</h2>
      
      <p style="font-size: 16px; margin: 0 0 20px 0;">
        Your <strong>${formType}</strong> registration has been received and confirmed!
      </p>
      
      <!-- Team Code Section (if applicable) -->
      ${teamCodeSection}
      
      <!-- Registration Details -->
      <div style="background: #f7fafc; padding: 20px; border-radius: 12px; margin: 24px 0;">
        <h3 style="margin: 0 0 16px 0; color: #1a365d; font-size: 18px;">📋 Registration Details</h3>
        ${teamName ? `<p style="margin: 8px 0;"><strong>Team Name:</strong> ${teamName}</p>` : ''}
        <p style="margin: 8px 0;"><strong>Registration Type:</strong> ${formType}</p>
        <p style="margin: 8px 0;"><strong>Pricing Tier:</strong> ${tier}</p>
        <p style="margin: 8px 0;"><strong>Amount Due:</strong> $${amount}</p>
      </div>
      
      <!-- Payment Instructions -->
      <div style="background: linear-gradient(135deg, #fef3cd 0%, #fef9e7 100%); padding: 20px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #f6893a;">
        <p style="margin: 0 0 12px 0; font-weight: 700; color: #1a365d; font-size: 16px;">💰 Complete Your Payment</p>
        <p style="margin: 0 0 12px 0;">To secure your spot, please send <strong>$${amount}</strong> via Venmo or Zelle to:</p>
        <p style="font-family: 'Courier New', monospace; background: white; padding: 12px 16px; border-radius: 8px; margin: 0; font-size: 15px; color: #1a365d; font-weight: 600;">sarasotarugbyclub@gmail.com</p>
        <p style="margin: 12px 0 0 0; font-size: 13px; color: #666;">Please include your team name or registration name in the payment note.</p>
      </div>
      
      <!-- Event Details -->
      <div style="background: #e6f4f7; padding: 20px; border-radius: 12px; margin: 24px 0;">
        <h3 style="margin: 0 0 16px 0; color: #1a365d; font-size: 18px;">📅 Event Details</h3>
        <p style="margin: 8px 0;"><strong>Date:</strong> Saturday, May 16, 2026</p>
        <p style="margin: 8px 0;"><strong>Location:</strong> Siesta Key Beach, Sarasota FL</p>
        <p style="margin: 8px 0;"><strong>Kickoff:</strong> 9:00 AM ET</p>
      </div>
      
      <!-- Contact -->
      <p style="margin: 24px 0 0 0;">Questions? Just reply to this email or reach out anytime!</p>
      
      <p style="margin: 24px 0 0 0;">
        See you on the sand! 🏖️<br>
        <strong style="color: #1a365d;">The Siesta 7's Team</strong>
      </p>
      
    </div>
    
    <!-- Footer -->
    <div style="text-align: center; margin-top: 24px; padding: 16px;">
      <p style="font-size: 13px; color: #718096; margin: 0;">
        May 16, 2026 • Siesta Key Beach, Sarasota FL
      </p>
      <p style="margin: 8px 0 0 0;">
        <a href="https://siesta7s.com" style="color: #2d8b9e; text-decoration: none; font-weight: 600;">siesta7s.com</a>
      </p>
    </div>
    
  </body>
  </html>
  `;
  
  // Send the email
  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody,
    replyTo: 'sarasotarugbyclub@gmail.com',
    name: 'Siesta 7s Beach Rugby'
  });
}

// ========================================
// Send Notification to Admin (Optional)
// ========================================
function sendAdminNotification(formType, name, teamName, email, tier, amount) {
  const adminEmail = 'sarasotarugbyclub@gmail.com';
  
  const subject = `📬 New ${formType} Registration: ${teamName || name}`;
  
  const htmlBody = `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>New Registration Received</h2>
    <p><strong>Type:</strong> ${formType}</p>
    <p><strong>Name:</strong> ${name}</p>
    ${teamName ? `<p><strong>Team:</strong> ${teamName}</p>` : ''}
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Tier:</strong> ${tier}</p>
    <p><strong>Amount:</strong> $${amount}</p>
    <hr>
    <p><a href="https://docs.google.com/spreadsheets">View All Registrations in Google Sheets</a></p>
  </div>
  `;
  
  MailApp.sendEmail({
    to: adminEmail,
    subject: subject,
    htmlBody: htmlBody,
    name: 'Siesta 7s Registration System'
  });
}

// ========================================
// Test endpoint (for checking if script is working)
// ========================================
function doGet(e) {
  return ContentService.createTextOutput('✅ Siesta 7s Registration API is running!');
}
