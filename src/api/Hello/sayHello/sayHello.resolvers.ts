import { Greeting, SayHelloQueryArgs } from "src/types/graph";

const resolvers = {
    Query: {
        sayHello: (_, arg: SayHelloQueryArgs) : Greeting => {
            return {
                error: false,
                text: `love you ${arg.name}`
            }
        }
    }
}

export default resolvers;