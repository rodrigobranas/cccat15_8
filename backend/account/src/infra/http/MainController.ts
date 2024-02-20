import { AccountRepositoryDatabase } from "../repository/AccountRepository";
import { PgPromiseAdapter } from "../database/DatabaseConnection";
import GetAccount from "../../application/usecase/GetAccount";
import HttpServer from "./HttpServer";
import { MailerGatewayConsole } from "../gateway/MailerGateway";
import Signup from "../../application/usecase/Signup";
import Registry, { inject } from "../di/Registry";

// Interface Adapter (verde)
export default class MainController {
	@inject("signup")
	signup?: Signup;

	constructor (httpServer: HttpServer) {
		const registry = Registry.getInstance();
		httpServer.register("post", "/signup", async (params: any, body: any) => {
			console.log(this.signup?.execute)
			const output = await this.signup?.execute(body);
			return output;
		});
		
		httpServer.register("get", "/accounts/:accountId", async function (params: any, body: any) {
			const output = await registry.inject("getAccount").execute(params.accountId);
			return output;
		});
	}
}