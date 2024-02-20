import AccountRepository from "../../infra/repository/AccountRepository";

export default class GetAccount {

	constructor (readonly accountRepository: AccountRepository) {
	}

	async execute (accountId: string) {
		console.log("getAccount", accountId);
		const account = await this.accountRepository.getById(accountId);
		if (!account) throw new Error("Account does not exist");
		return {
			accountId: account.accountId,
			name: account.getName(),
			email: account.getEmail(),
			cpf: account.getCpf(),
			carPlate: account.getCarPlate(),
			isPassenger: account.isPassenger,
			isDriver: account.isDriver
		};
	}
}
