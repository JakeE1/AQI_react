"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers = {
    Subscription: {
        DriversSubscription: {
            subscribe: (0, graphql_yoga_1.withFilter)(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator("driverUpdate");
            }, function (payload, _, _a) {
                var context = _a.context;
                var user = context.currentUser;
                console.log("This is my user", user); // cannot read propery lastLat of undefined 
                var _b = payload.DriversSubscription, driverLastLat = _b.lastLat, driverLastLng = _b.lastLng;
                var userLastLat = user.lastLat, userLastLng = user.lastLng;
                return (driverLastLat >= userLastLat - 0.05 &&
                    driverLastLat <= userLastLat + 0.05 &&
                    driverLastLng >= userLastLng - 0.05 &&
                    driverLastLng <= userLastLng + 0.05);
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=DriversSubscription.resolvers.js.map