
import { sendMail } from "../nodemailer";

export type ContactPayload = {
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  sentAt: string;
};

type NewContactOptions = {
  to: string;
  context: ContactPayload;
};

const appName = process.env.APP_NAME || "Portafolio-JD";

export const newContactNotification = async (options: NewContactOptions) =>
  await sendMail({
    to: options.to,
    subject: `💼 Nuevo Contacto: ${options.context.subject} — ${appName}`,
    template: "newContact",
    context: {
      baseUrl: process.env.BASE_APP_URL || "https://jesusd2405.github.io",
      appName,
      ...options.context,
    },
  });
