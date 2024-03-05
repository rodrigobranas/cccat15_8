import DatabaseConnection from "../../infra/database/DatabaseConnection";

// Query Model
export default class GetRideProjectionQuery {

	constructor (readonly connection: DatabaseConnection) {
	}

	async execute (rideId: string) {
		const [data] = await this.connection.query(`select * from cccat15.ride_projection where ride_id = $1`, [rideId]);
		// DTO - Data Transfer Object
		return data;
	}
}
