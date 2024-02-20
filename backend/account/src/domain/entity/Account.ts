import crypto from "crypto";
import Name from "../vo/Name";
import Email from "../vo/Email";
import Cpf from "../vo/Cpf";
import CarPlate from "../vo/CarPlate";

// Entity e atua como Raiz do Aggregate (Account<AR>, Name, Email, Cpf, CarPlate)
export default class Account {
	private name: Name;
	private email: Email;
	private cpf: Cpf;
	private carPlate?: CarPlate;

	private constructor (readonly accountId: string, name: string, email: string, cpf: string, readonly isPassenger: boolean, readonly isDriver: boolean, carPlate?: string) {
		this.name = new Name(name);
		this.email = new Email(email);
		this.cpf = new Cpf(cpf);
		if (isDriver && carPlate) this.carPlate = new CarPlate(carPlate);
	}

	setCpf (cpf: string) {
		this.cpf = new Cpf(cpf);
	}

	static create (name: string, email: string, cpf: string, isPassenger: boolean, isDriver: boolean, carPlate?: string) {
		const accountId = crypto.randomUUID();
		return new Account(accountId, name, email, cpf, isPassenger, isDriver, carPlate);
	}

	static restore (accountId: string, name: string, email: string, cpf: string, isPassenger: boolean, isDriver: boolean, carPlate?: string) {
		return new Account(accountId, name, email, cpf, isPassenger, isDriver, carPlate);
	}

	setName (name: string) {
		this.name = new Name(name);
	}

	getName () {
		return this.name.getValue();
	}

	getEmail () {
		return this.email.getValue();
	}

	getCpf () {
		return this.cpf.getValue();
	}

	getCarPlate () {
		return this.carPlate?.getValue();
	}
}
