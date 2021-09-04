import User from "../../../entities/User";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
    Mutation: {
        FacebookConnect: async(_, args: FacebookConnectMutationArgs): Promise<FacebookConnectResponse> => {
            const { fbId } = args;
            try {
                const isUserExist = await User.findOne({ fbId })
                if (isUserExist) {
                    const token = createJWT(isUserExist.id)
                    return {
                        ok: true,
                        error: null,
                        token  
                    }
                } 

            } catch(error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                }
            }
            try {
                const newUser = await User.create({
                    ...args,
                    profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`
                }).save()
                const token = createJWT(newUser.id)
                return {
                    ok: true,
                    error: null,
                    token
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