// const nodemailer = require("nodemailer");

// // Debug environment variables
// console.log("🔍 Checking email environment variables:");
// console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✅ Set" : "❌ Missing");
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ Set" : "❌ Missing");

// if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//   console.error("❌ Email credentials are missing from environment variables!");
//   console.error("Make sure EMAIL_USER and EMAIL_PASS are set in your .env file");
// }

// const transporter = nodemailer.createTransport({
//   service: 'gmail', // Use Gmail service instead of manual SMTP config
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   // Additional Gmail-specific options
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// // Verify transporter configuration
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ SMTP configuration error:", error);
//   } else {
//     console.log("✅ SMTP server is ready to send emails");
//   }
// });

// const createMailOptions = (toAddress, fromAddress, subject, body) => ({
//   from: process.env.EMAIL_USER,
//   to: toAddress,
//   subject: subject,
//   text: body,
//   html: `<h1>${body}</h1>`,
// });

// const run = async (subject, body, toEmailId) => {
//   try {
//     console.log("📧 Attempting to send email to:", toEmailId);
//     console.log("📧 Subject:", subject);
    
//     const mailOptions = createMailOptions(
//       toEmailId,
//       process.env.EMAIL_USER,
//       subject,
//       body
//     );
    
//     console.log("📧 Mail options:", mailOptions);
    
//     const result = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully:", result.messageId);
//     return result;
    
//   } catch (error) {
//     console.error("❌ Email sending failed:", error.message);
//     throw error;
//   }
// };

// module.exports = { run };
