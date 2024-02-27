import AccountGateway from "../../application/gateway/AccountGateway";
import axios from "axios";
import HttpClient from "../http/HttpClient";

// Interface Adapter
export default class AccountGatewayHttp implements AccountGateway {

	constructor (readonly httpClient: HttpClient) {
	}
	
	async getById(accountId: string): Promise<any> {
		return this.httpClient.get(`http://localhost:3001/accounts/${accountId}`);
	}

	async signup(input: any): Promise<any> {
		return this.httpClient.post(`http://localhost:3001/signup`, input);
	}

}