"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_yoga_1 = require("graphql-yoga");
var resolvers = {
    Subscription: {
        NearbyRideSubscription: {
            subscribe: (0, graphql_yoga_1.withFilter)(function (_, __, _a) {
                var pubSub = _a.pubSub;
                return pubSub.asyncIterator("rideRequest");
            }, function (payload, _, _a) {
                var context = _a.context;
                var user = context.currentUser;
                var _b = payload.NearbyRideSubscription, pickUpLat = _b.pickUpLat, pickUpLng = _b.pickUpLng;
                var userLastLat = user.lastLat, userLastLng = user.lastLng;
                return (pickUpLat >= userLastLat - 0.05 &&
                    pickUpLat <= userLastLat + 0.05 &&
                    pickUpLng >= userLastLng - 0.05 &&
                    pickUpLng <= userLastLng + 0.05);
            })
        }
    }
};
exports.default = resolvers;
//# sourceMappingURL=NearbyRideSubscription.resolvers.js.map