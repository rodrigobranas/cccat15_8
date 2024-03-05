import AccountGateway from "../../src/application/gateway/AccountGateway";
import AcceptRide from "../../src/application/usecase/AcceptRide";
import FinishRide from "../../src/application/usecase/FinishRide";
import GetPositions from "../../src/application/usecase/GetPositions";
import GetRide from "../../src/application/usecase/GetRide";
import ProcessPayment from "../../src/application/usecase/ProcessPayment";
import RequestRide from "../../src/application/usecase/RequestRide";
import StartRide from "../../src/application/usecase/StartRide";
import UpdatePosition from "../../src/application/usecase/UpdatePosition";
import DatabaseConnection, { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import AccountGatewayHttp from "../../src/infra/gateway/AccountGatewayHttp";
import { MailerGatewayConsole } from "../../src/infra/gateway/MailerGateway";
import { AxiosAdapter, FetchAdapter } from "../../src/infra/http/HttpClient";
import Mediator from "../../src/infra/mediator/Mediator";
import Queue, { RabbitMQAdapter } from "../../src/infra/queue/Queue";
import { PositionRepositoryDatabase } from "../../src/infra/repository/PositionRepository";
import { RideRepositoryDatabase } from "../../src/infra/repository/RideRepository";
import sinon from "sinon";

let connection: DatabaseConnection;
let requestRide: RequestRide;
let getRide: GetRide;
let acceptRide: AcceptRide;
let startRide: StartRide;
let updatePosition: UpdatePosition;
let getPositions: GetPositions;
let accountGateway: AccountGateway;
let finishRide: FinishRide;
let queue: Queue;

beforeEach(async () => {
	connection = new PgPromiseAdapter();
	const rideRepository = new RideRepositoryDatabase(connection);
	const positionRepository = new PositionRepositoryDatabase(connection);
	accountGateway = new AccountGatewayHttp(new AxiosAdapter());
	requestRide = new RequestRide(rideRepository, accountGateway);
	getRide = new GetRide(rideRepository, accountGateway);
	acceptRide = new AcceptRide(rideRepository, accountGateway);
	startRide = new StartRide(rideRepository);
	updatePosition = new UpdatePosition(rideRepository, positionRepository);
	getPositions = new GetPositions(positionRepository);
	const processPayment = new ProcessPayment(rideRepository);
	const mediator = new Mediator();
	// mediator.register("rideCompleted", async (input: any) => {
	// 	await processPayment.execute(input.rideId);
	// });
	queue = new RabbitMQAdapter();
	await queue.connect();
	finishRide = new FinishRide(rideRepository, mediator, queue);
})

test("Deve finalizar uma corrida em horário normal", async function () {
	const dateStub = sinon.useFakeTimers(new Date("2024-02-26T16:00:00-03:00"));
	const inputSignupPassenger = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		isPassenger: true
	};
	const outputSignupPassenger = await accountGateway.signup(inputSignupPassenger);
	const inputRequestRide = {
		passengerId: outputSignupPassenger.accountId,
		fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
	};
	const outputRequestRide = await requestRide.execute(inputRequestRide);
	const inputSignupDriver = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		carPlate: "AAA9999",
		isDriver: true
	};
	const outputSignupDriver = await accountGateway.signup(inputSignupDriver);
	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputSignupDriver.accountId
	};
	await acceptRide.execute(inputAcceptRide);
	const inputStartRide = {
		rideId: outputRequestRide.rideId,
	};
	await startRide.execute(inputStartRide);
	const inputUpdatePosition = {
		rideId: outputRequestRide.rideId,
		lat: -27.496887588317275,
		long: -48.522234807851476
	}
	await updatePosition.execute(inputUpdatePosition);
	const inputFinishRide = {
		rideId: outputRequestRide.rideId
	};
	await finishRide.execute(inputFinishRide);
	const outputGetRide = await getRide.execute(outputRequestRide.rideId);
	expect(outputGetRide.fare).toBe(21);
	expect(outputGetRide.status).toBe("completed");
	dateStub.restore();
});

test("Deve finalizar uma corrida em horário adicional noturno", async function () {
	const dateStub = sinon.useFakeTimers(new Date("2024-02-26T23:00:00-03:00"));
	const inputSignupPassenger = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		isPassenger: true
	};
	const outputSignupPassenger = await accountGateway.signup(inputSignupPassenger);
	const inputRequestRide = {
		passengerId: outputSignupPassenger.accountId,
		fromLat: -27.584905257808835,
		fromLong: -48.545022195325124,
		toLat: -27.496887588317275,
		toLong: -48.522234807851476
	};
	const outputRequestRide = await requestRide.execute(inputRequestRide);
	const inputSignupDriver = {
		name: "John Doe",
		email: `john.doe${Math.random()}@gmail.com`,
		cpf: "97456321558",
		carPlate: "AAA9999",
		isDriver: true
	};
	const outputSignupDriver = await accountGateway.signup(inputSignupDriver);
	const inputAcceptRide = {
		rideId: outputRequestRide.rideId,
		driverId: outputSignupDriver.accountId
	};
	await acceptRide.execute(inputAcceptRide);
	const inputStartRide = {
		rideId: outputRequestRide.rideId,
	};
	await startRide.execute(inputStartRide);
	const inputUpdatePosition = {
		rideId: outputRequestRide.rideId,
		lat: -27.496887588317275,
		long: -48.522234807851476
	}
	await updatePosition.execute(inputUpdatePosition);
	const inputFinishRide = {
		rideId: outputRequestRide.rideId
	};
	await finishRide.execute(inputFinishRide);
	const outputGetRide = await getRide.execute(outputRequestRide.rideId);
	expect(outputGetRide.fare).toBe(39);
	expect(outputGetRide.status).toBe("completed");
	dateStub.restore();
});

// afterEach(async () => {
// 	await connection.close();
// 	setTimeout(async () => {
// 		await queue.disconnect();
// 	});
// })