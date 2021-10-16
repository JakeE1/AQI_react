"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSMS = exports.sendVerificationSMS = void 0;
var twilio_1 = __importDefault(require("twilio"));
var twilioClient = (0, twilio_1.default)(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
var messagingServiceSid = process.env.TWILIO_MESSAGIN_SERVICE_SID;
var sendVerificationSMS = function (to, key) {
    (0, exports.sendSMS)(to, "Your verification key is " + key);
};
exports.sendVerificationSMS = sendVerificationSMS;
var sendSMS = function (to, body) {
    return twilioClient.messages.create({
        body: body,
        to: to,
        messagingServiceSid: messagingServiceSid
    });
};
exports.sendSMS = sendSMS;
//# sourceMappingURL=sendSMS.js.map