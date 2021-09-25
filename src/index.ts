import dotenv from "dotenv";
dotenv.config();

import decodeJWT from "./utils/decodeJWT";

import { Options } from "graphql-yoga";
import { createConnection } from "typeorm"
import app from "./app";
import connectionOptions from "./ormConfig";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";


const PORT: number | string = process.env.PORT || 5555;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql"

const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: {
      path: SUBSCRIPTION_ENDPOINT,
      onConnect: async connectionParams => {
        const token = connectionParams["SXS-JWT"];
        if (token) {
          const user = await decodeJWT(token);
          if (user) {
            return {
              currentUser: user
            };
          }
        }
        throw new Error("No JWT. Can't subscribe");
      }
    }
  };

const handleAppStart = () => console.log(`Listening on port ${PORT}`);

createConnection(connectionOptions).then(() => {
    app.start(appOptions, handleAppStart)  
}).catch(err => console.log(err));

