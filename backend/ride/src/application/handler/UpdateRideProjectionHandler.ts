import DatabaseConnection from "../../infra/database/DatabaseConnection";

export default class UpdateRideProjectionHandler {

	constructor (readonly connection: DatabaseConnection) {
	}

	async execute (rideId: string) {
		console.log("executing update ride projection", rideId);
		const [data] = await this.connection.query(`
			select
				r.ride_id,
				r.status,
				r.date,
				r.fare,
				r.distance,
				p.name as passenger_name,
				p.email as passenger_email,
				d.name as driver_name,
				d.email as driver_email
			from
				cccat15.ride r
				join cccat15.account p on (r.passenger_id = p.account_id)
				left join cccat15.account d on (r.driver_id = d.account_id)
			where
				r.ride_id = $1
		`, [rideId]);
		await this.connection.query("delete from cccat15.ride_projection where ride_id = $1", [rideId]);
		await this.connection.query("insert into cccat15.ride_projection (ride_id, status, date, fare, distance, passenger_name, passenger_email, driver_name, driver_email) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)", [data.ride_id, data.status, data.date, data.fare, data.distance, data.passenger_name, data.passenger_email, data.driver_name, data.driver_email]);
	}
}
