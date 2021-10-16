"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        sayHello: function (_, arg) {
            return {
                error: false,
                text: "love you " + arg.name
            };
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=sayHello.resolvers.js.map