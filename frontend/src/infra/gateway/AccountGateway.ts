import axios from "axios";
import HttpClient from "../http/HttpClient";

// Interface Adapter
export default interface AccountGateway {
	signup (input: SignupInput): Promise<SignupOutput>;
}

type SignupInput = {
	isPassenger: boolean,
	name: string,
	email: string,
	cpf: string
}

type SignupOutput = {
	accountId: string
}

export class AccountGatewayHttp implements AccountGateway {

	constructor (readonly httpClient: HttpClient) {
	}

	async signup(input: SignupInput): Promise<SignupOutput> {
		const output = await this.httpClient.post("http://localhost:3001/signup", input);
		return {
			accountId: output.accountId
		}
	}

}
