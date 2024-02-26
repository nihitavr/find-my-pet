import nodemailer from "nodemailer";
import { emailTemplates } from "../email-templates/email-templates";
import { env } from "~/env";

// Create a transporter using Hostinger's SMTP server info
const transporter = nodemailer.createTransport({
  host: env.SMPT_HOST,
  port: env.SMPT_PORT,
  secure: true, // True for 465, false for other ports
  auth: {
    user: env.SMPT_USER,
    pass: env.SMPT_PASS,
  },
});

export async function sendPetTagScanEmail(
  to: string,
  ownerName: string,
  petName: string,
  petId: string,
  locationLink: string,
) {
  const emailTemplateCopy = emailTemplates.petTagScan
    .replace(/{Pet Name}/g, petName)
    .replace(/{Owner Name}/g, ownerName)
    .replace(
      /{Scan History Link}/g,
      `${env.SERVER_URL}/dashboard/pets/${petId}/scan-history`,
    )
    .replace(/{Google Maps Link}/g, locationLink);

  const mailOptions = {
    from: `"Find My Pet" <${env.SMPT_USER}>`, // sender address
    to: to,
    subject: `GPS Alert! ${petName}'s pet tag has been scanned.`, // Subject line
    html: emailTemplateCopy, // HTML body content
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}
