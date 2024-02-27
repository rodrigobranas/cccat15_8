import Signup from "../../application/usecase/Signup";
import Queue from "./Queue";

export default class QueueController {

	constructor (queue: Queue, signup: Signup) {
		// handler
		queue.consume("signup", async function (input: any) {
			await signup.execute(input);
		});
	}
}