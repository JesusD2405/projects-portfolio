
import { createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Hbs from "nodemailer-express-handlebars";
import Path from "path";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const getAccessToken = async () => {
  const oauth2Client = new OAuth2(
    process.env.OAUTH2_GMAIL_CLIENT_ID,
    process.env.OAUTH2_GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH2_GMAIL_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.log("ERROR ACCESS TOKEN: ", err);
        reject();
      }
      resolve(token);
    });
  });

  return accessToken;
};

const isServiceGmail =
  process.env.EMAIL_HOST &&
  process.env.EMAIL_HOST.includes("gmail") &&
  process.env.OAUTH2_GMAIL_REFRESH_TOKEN?.length;

const isServiceGmailOauth2 =
  process.env.OAUTH2_GMAIL_CLIENT_ID?.length &&
  process.env.OAUTH2_GMAIL_CLIENT_SECRET?.length &&
  process.env.OAUTH2_GMAIL_REFRESH_TOKEN?.length;

const optionsTransport = isServiceGmail
  ? {
      service: "gmail",
      auth: {
        type: "OAuth2",
      },
      logger: true,
    }
  : {
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === "true",
      requireTLS: process.env.EMAIL_REQUIRE_TLS === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      logger: true,
    };

const transporter = createTransport(optionsTransport as SMTPTransport.Options);

const templatesPath = Path.normalize(`${process.env.ROOT_EMAIL_TEMPLATES}`);

transporter.use(
  "compile",
  Hbs({
    viewEngine: {
      extname: ".html",
      layoutsDir: templatesPath,
      defaultLayout: undefined,
      partialsDir: templatesPath,
    },
    viewPath: templatesPath,
    extName: ".html",
  })
);

export type mailOptions = {
  from?: string;
  to: string;
  subject: string;
  template: string;
  context: any;
  headers?: any;
};

export const sendMail = async (mailOptions: mailOptions) => {
  let options: any = {
    from: process.env.EMAIL_USER,
    ...mailOptions,
  };

  if (isServiceGmail && isServiceGmailOauth2) {
    const accessToken = await getAccessToken();

    options = {
      ...mailOptions,
      auth: {
        user: process.env.EMAIL_USER,
        accessToken,
      },
    };
  } else if (isServiceGmail) {
    options = {
      service: "gmail",
      ...mailOptions,
    };
  }

  console.log(`Sending email to: ${mailOptions.to}`);

  return new Promise((resolve, reject) => {
    return transporter.sendMail(options, (error: any, info: any) => {
      if (info) {
        console.log("Email sent: ", info);
        resolve(true);
      } else {
        reject(error);
        console.log("Error sending email: ", error);
      }
    });
  });
};
