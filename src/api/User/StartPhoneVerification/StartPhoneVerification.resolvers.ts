import Verification from "../../../entities/Verification";;
import { StartPhoneVerificationMutationArgs, StartPhoneVerificationResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import { sendVerificationSMS } from "../../../utils/sendSMS";

const resolvers: Resolvers ={
    Mutation: {
        StartPhoneVerification: async (_, args: StartPhoneVerificationMutationArgs): Promise<StartPhoneVerificationResponse> => {
             try {
                const { phoneNumber } = args;
                const existingVerification = await Verification.findOne({ payload: phoneNumber });
                if (existingVerification) {
                    existingVerification.remove();
                }
                const newVerification = await Verification.create({
                    payload: phoneNumber,
                    target: "PHONE"
                }).save();
                await sendVerificationSMS(newVerification.payload, newVerification.key)
                return {
                    ok: true,
                    error: null
                }
             } catch (error) {
                 return {
                     ok: false,
                     error: error.messgae
                 }
             }
        }
    }
}

export default resolvers