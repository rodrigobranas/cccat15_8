import Mediator from "../../infra/mediator/Mediator";
import Queue from "../../infra/queue/Queue";
import RideRepository from "../../infra/repository/RideRepository";
import ProcessPayment from "./ProcessPayment";

export default class FinishRide {

	constructor (readonly rideRepository: RideRepository, readonly mediator: Mediator, readonly queue: Queue) {
	}

	async execute (input: Input): Promise<void> {
		const ride = await this.rideRepository.get(input.rideId);
		if (!ride) throw new Error("Ride not found");
		ride.finish();
		console.log(ride.getFare());
		await this.rideRepository.update(ride);
		// await this.mediator.notify("rideCompleted", { rideId: ride.rideId });
		await this.queue.publish("rideCompleted", { rideId: ride.rideId });
	}
}

type Input = {
	rideId: string
}
