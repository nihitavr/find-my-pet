import nodemailer from "nodemailer";
import { emailTemplates } from "../email-templates/email-templates";
import { env } from "~/env";

// Create a transporter using Hostinger's SMTP server info
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com", // Use the actual SMTP server host from Hostinger
  port: 465, // Commonly used port for SMTP
  secure: true, // True for 465, false for other ports
  auth: {
    user: "contact@findmypet.in", // Your full email address
    pass: "Minimush.12", // Your email account password
  },
});

export async function sendPetTagScanEmail(
  to: string,
  ownerName: string,
  petName: string,
  petId: string,
) {
  const emailTemplateCopy = emailTemplates.petTagScan
    .replace(/{Pet Name}/g, petName)
    .replace(/{Owner Name}/g, ownerName)
    .replace(
      /{Scan History Link}/g,
      `${env.SERVER_URL}/dashboard/pets/${petId}/scan-history`,
    );

  const mailOptions = {
    from: '"Find My Pet" <contact@findmypet.in>', // sender address
    to: to,
    subject: `Find My Pet - ${petName}'s pet tag scanned`, // Subject line
    html: emailTemplateCopy, // HTML body content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
