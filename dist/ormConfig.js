"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectionOptions = {
    database: "sandex",
    type: 'postgres',
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    synchronize: true,
    logging: true,
    entities: [
        "entities/**/*.*"
    ]
};
exports.default = connectionOptions;
//# sourceMappingURL=ormConfig.js.map