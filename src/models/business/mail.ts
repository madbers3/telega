import {createTransport} from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import secrets from "../../config/secrets";

class MailClass {
  transporter = createTransport(secrets.models.mail.emailTransport);

  constructor() {
  }

  async sendEmail(mailOptions: Mail.Options) {
    const message = await this.transporter.sendMail(mailOptions);

    console.log('Message sent: %s', message.messageId);
  }
}

const mail = new MailClass();

export default mail;
