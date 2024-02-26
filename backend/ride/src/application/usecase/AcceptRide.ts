import crypto from "crypto";
import RideRepository from "../../infra/repository/RideRepository";
import Ride from "../../domain/entity/Ride";
import AccountGateway from "../gateway/AccountGateway";

export default class AcceptRide {

	constructor (readonly rideRepository: RideRepository, readonly accountGateway: AccountGateway) {

	}

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		if (!ride) throw new Error("Ride not found");
		ride.accept(input.driverId);
		await this.rideRepository.update(ride);
	}
}

type Input = {
	rideId: string,
	driverId: string
}
