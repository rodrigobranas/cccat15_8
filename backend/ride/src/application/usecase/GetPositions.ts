import AccountRepository from "../../infra/repository/AccountRepository";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

// O Ride em questão, não é a entidade Ride, é o conceito Ride que é resultado da junção de informações de Ride e de Accont
export default class GetPositions {

	constructor (readonly positionRepository: PositionRepository) {
	}

	async execute (rideId: string): Promise<Output[]> {
		const positions = await this.positionRepository.listByRideId(rideId);
		const output = [];
		for (const position of positions) {
			output.push({
				positionId: position.positionId,
				rideId: position.rideId,
				lat: position.getLat(),
				long: position.getLong(),
				date: position.date
			});
		}
		return output;
	}
}

type Output = {
	positionId: string,
	rideId: string,
	lat: number,
	long: number,
	date: Date
}
