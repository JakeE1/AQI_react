import User from "../../../entities/User";
import { Resolvers } from "src/types/resolvers";
import createJWT from "../../../utils/createJWT";
import {
    EmailSignUpMutationArgs,
    EmailSignUpResponse
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";

const resolvers: Resolvers = {
    Mutation: {
        EmailSignUp: async (_, args: EmailSignUpMutationArgs): Promise<EmailSignUpResponse> => {
            const { email } = args
            try {
                const existingUser = await User.findOne({ email })
                if (existingUser) {
                    return {
                        ok: false,
                        error: "Email is already registrated",
                        token: null
                    }
                } else {
                     const phoneVerification = await Verification.findOne({payload: args.phoneNumber, verified: true});
                     if (phoneVerification) {
                        const newUser = await User.create({ ...args }).save();
                        if (newUser.email) {
                            const emailVerification = await Verification.create({
                                payload: newUser.email,
                                target: "EMAIL"
                            }).save()
                            await sendVerificationEmail(newUser.fullName, emailVerification.key); // if we need send email not only to one acc need to upgrade acc
                        }
                        const token = createJWT(newUser.id)
                        return {
                            ok: true,
                            error: null,
                            token
                        }
                     } else {
                         return {
                             ok: false,
                             error: "You haven't verified your phone number",
                             token: null
                         }
                     }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
        }
    }
}

export default resolvers