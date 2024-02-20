import Position from "../../domain/entity/Position";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface PositionRepository {
	save (position: Position): Promise<void>;
	listByRideId (rideId: string): Promise<Position[]>;
}

export class PositionRepositoryDatabase implements PositionRepository {

	constructor (readonly connection: DatabaseConnection) {

	}

	async save(position: Position): Promise<void> {
		await this.connection.query("insert into cccat15.position (position_id, ride_id, lat, long, date) values ($1, $2, $3, $4, $5)", [position.positionId, position.rideId, position.getLat(), position.getLong(), position.date]);
	}

	async listByRideId(rideId: string): Promise<Position[]> {
		const positionsData = await this.connection.query("select * from cccat15.position where ride_id = $1", [rideId]);
		const positions = [];
		for (const positionData of positionsData) {
			positions.push(new Position(positionData.position_id, positionData.ride_id, parseFloat(positionData.lat), parseFloat(positionData.long), positionData.date))
		}
		return positions;
	}
}