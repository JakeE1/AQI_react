import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_PRIVATE_KEY || "",
    domain: process.env.MAILGUN_SANDBOX as string
});

const sendEmail = (subject: string, html: string) => {
    const emailData ={
        from: process.env.EMAIL_FOR_MAILGUN as string,
        to: "jake0_0@mail.ru", // process.env.EMAIL_FOR_MAILGUN as string need to upgrade acc because in email send can be only on registrate acc
        subject,
        html
    }
    return mailGunClient.messages().send(emailData)
}

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Verify your email by clicking <a href="http://test.com/verification/${key}">here</a>`;
    return sendEmail(emailSubject, emailBody);
}