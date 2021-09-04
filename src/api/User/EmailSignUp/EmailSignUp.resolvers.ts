import User from "../../../entities/User";
import { Resolvers } from "src/types/resolvers";
import createJWT from "../../../utils/createJWT";
import {
    EmailSignUpMutationArgs,
    EmailSignUpResponse
} from "../../../types/graph";

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
                    const newUser = await User.create({ ...args }).save();
                    const token = createJWT(newUser.id)
                    return {
                        ok: true,
                        error: null,
                        token
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