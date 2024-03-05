import RideRepository from "../../infra/repository/RideRepository";

export default class ProcessPayment {

	constructor (readonly rideRepository: RideRepository) {
	}

	async execute (input: Input) {
		console.log("processPayment", input);
	}
}

type Input = {
	rideId: string,
	creditCardToken: string,
	amount: number
}
