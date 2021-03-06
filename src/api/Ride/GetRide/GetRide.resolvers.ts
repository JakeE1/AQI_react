import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetRideQueryArgs, GetRideResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/resolversMiddleware";

const resolvers: Resolvers = {
  Query: {
    GetRide: privateResolver(
      async (_, args: GetRideQueryArgs, { req }): Promise<GetRideResponse> => {
        const user: User = req.user;

        try {
          const ride = await Ride.findOne({
            id: args.rideId
          });
          if (ride) {
            if (ride.passengerId) {
              const passenger = await User.findOne({
                id: ride.passengerId
              })
              if (passenger) {
                ride.passenger = passenger;
              }
            }
            if (ride.driverId) {
              const driver = await User.findOne({
                id: ride.driverId
              })
              if (driver) {
                ride.driver = driver;
              }
            }
            
            if (ride.passengerId === user.id || ride.driverId === user.id) {
              return {
                ok: true,
                error: `${JSON.stringify(ride)}`,
                ride: ride,
              };
            } else {
              return {
                ok: false,
                error: "Not Authorized",
                ride: null
              };
            }
          } else {
            return {
              ok: false,
              error: "Ride not found",
              ride: null
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;