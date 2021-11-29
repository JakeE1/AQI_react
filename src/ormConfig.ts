import { ConnectionOptions } from "typeorm";

const connectionOptions: ConnectionOptions = {
    database: process.env.DB_NAME || "sandex",
    type: 'postgres',
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [
        "entities/**/*.*"
    ],
    ssl: {
        rejectUnauthorized: false,
    }
} 

export default connectionOptions;
