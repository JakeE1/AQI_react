import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN); 
const messagingServiceSid = process.env.TWILIO_MESSAGIN_SERVICE_SID

export const sendVerificationSMS = (to: string, key: string) => {
    sendSMS(to, `Your verification key is ${key}`)
}

export const sendSMS = (to: string, body: string): Promise<any> => {
    return twilioClient.messages.create({   
        body,    
        to,
        messagingServiceSid  
    }) 
}

