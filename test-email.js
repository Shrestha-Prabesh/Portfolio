const nodemailer = require('nodemailer');
const fs = require('fs');

// Read environment variables from .env
const envContent = fs.readFileSync('.env', 'utf8');
const envLines = envContent.split('\n');
envLines.forEach(line => {
  if (line.includes('=') && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    process.env[key.trim()] = value.trim();
  }
});

async function testEmail() {
  console.log('Testing email configuration...');
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log('Verifying transporter...');
    await transporter.verify();
    console.log('✓ Transporter verified successfully');

    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself for testing
      subject: 'Test Email from Portfolio',
      text: 'This is a test email to verify the configuration.',
      html: '<p>This is a test email to verify the configuration.</p>',
    });

    console.log('✓ Email sent successfully:', info.messageId);
  } catch (error) {
    console.error('✗ Error:', error.message);
    console.error('Full error:', error);
  }
}

testEmail();
