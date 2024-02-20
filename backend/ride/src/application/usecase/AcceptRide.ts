import crypto from "crypto";
import AccountRepository from "../../infra/repository/AccountRepository";
import RideRepository from "../../infra/repository/RideRepository";
import Ride from "../../domain/entity/Ride";

export default class AcceptRide {

	constructor (readonly rideRepository: RideRepository, readonly accountRepository: AccountRepository) {

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
