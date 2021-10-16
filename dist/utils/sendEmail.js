"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var mailGunClient = new mailgun_js_1.default({
    apiKey: process.env.MAILGUN_PRIVATE_KEY || "",
    domain: process.env.MAILGUN_SANDBOX
});
var sendEmail = function (subject, html) {
    var emailData = {
        from: process.env.EMAIL_FOR_MAILGUN,
        to: "jake0_0@mail.ru",
        subject: subject,
        html: html
    };
    return mailGunClient.messages().send(emailData);
};
var sendVerificationEmail = function (fullName, key) {
    var emailSubject = "Hello! " + fullName + ", please verify your email";
    var emailBody = "Verify your email by clicking <a href=\"http://test.com/verification/" + key + "\">here</a>";
    return sendEmail(emailSubject, emailBody);
};
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=sendEmail.js.map