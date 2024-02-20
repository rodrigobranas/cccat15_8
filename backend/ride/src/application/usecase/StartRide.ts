import RideRepository from "../../infra/repository/RideRepository";

export default class StartRide {

	constructor (readonly rideRepository: RideRepository) {

	}

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		if (!ride) throw new Error("Ride not found");
		ride.start();
		await this.rideRepository.update(ride);
	}
}

type Input = {
	rideId: string
}
