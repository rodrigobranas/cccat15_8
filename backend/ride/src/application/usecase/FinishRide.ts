import DomainEvent from "../../domain/event/DomainEvent";
import RideCompletedEvent from "../../domain/event/RideCompletedEvent";
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
		ride.register("rideCompleted", async (event: DomainEvent) => {
			await this.rideRepository.update(ride);
			await this.queue.publish(event.name, event);
		});
		ride.finish();
	}
}

type Input = {
	rideId: string
}
