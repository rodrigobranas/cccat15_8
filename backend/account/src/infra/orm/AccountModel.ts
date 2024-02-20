import Account from "../../domain/entity/Account";
import { Model, column, model } from "./ORM";

@model("cccat15", "account")
export default class AccountModel extends Model {
	@column("account_id", true)
	accountId: string;
	@column("name")
	name: string;
	@column("email")
	email: string;
	@column("cpf")
	cpf: string;
	@column("car_plate")
	carPlate: string;
	@column("is_passenger")
	isPassenger: boolean;
	@column("is_driver")
	isDriver: boolean;

	constructor (accountId: string, name: string, email: string, cpf: string, carPlate: string, isPassenger: boolean = false, isDriver: boolean = false) {
		super();
		this.accountId = accountId;
		this.name = name;
		this.email = email;
		this.cpf = cpf;
		this.carPlate = carPlate;
		this.isPassenger = isPassenger;
		this.isDriver = isDriver;
	}

	static fromAggregate (account: Account) {
		return new AccountModel(account.accountId, account.getName(), account.getEmail(), account.getCpf(), account.getCarPlate() || "", account.isPassenger, account.isDriver);
	}

	getAggregate () {
		return Account.restore(this.accountId, this.name, this.email, this.cpf, this.isPassenger, this.isDriver, this.carPlate);
	}
}
