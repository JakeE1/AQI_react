"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers = {
    Subscription: {
        RideStatusSubscription: {
            subscribe: (0, graphql_yoga_1.withFilter)(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator("rideUpdate");
            }, function (payload, _, _a) {
                var context = _a.context;
                var user = context.currentUser;
                var _b = payload.RideStatusSubscription, driverId = _b.driverId, passengerId = _b.passengerId;
                return user.id === driverId || user.id === passengerId;
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=RideStatusSubscription.resolvers.js.map