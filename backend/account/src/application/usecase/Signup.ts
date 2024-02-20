import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/entity/Account";
import AccountRepository from "../../infra/repository/AccountRepository";

// Use case
export default class Signup {

	constructor (readonly accountRepository: AccountRepository, readonly mailerGateway: MailerGateway) {
	}

	async execute (input: any) {
		console.log("signup", input);
		const existingAccount = await this.accountRepository.getByEmail(input.email);
		if (existingAccount) throw new Error("Account already exists");
		const account = Account.create(input.name, input.email, input.cpf, input.isPassenger, input.isDriver, input.carPlate);
		await this.accountRepository.save(account);
		await this.mailerGateway.send("Welcome", account.getEmail(), "Use this link to confirm your account");
		return {
			accountId: account.accountId
		};
	}
}