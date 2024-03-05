import UpdateRideProjectionHandler from "../../application/handler/UpdateRideProjectionHandler";
import ProcessPayment from "../../application/usecase/ProcessPayment";
import RideCompletedEvent from "../../domain/event/RideCompletedEvent";
import Queue from "./Queue";

export default class QueueController {

	constructor (queue: Queue, processPayment: ProcessPayment, updateRideProjectionHandler: UpdateRideProjectionHandler) {
		queue.consume("rideCompleted", async function (input: any) {
			await processPayment.execute(input);
		});
		queue.consume("rideStarted", async function (input: any) {
			await updateRideProjectionHandler.execute(input.rideId);
		});
	}
}
