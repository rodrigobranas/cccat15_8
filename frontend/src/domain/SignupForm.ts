import Observable from "./Observable";

// Model do MV* (C, VM, P)
export default class SignupForm extends Observable {
	isPassenger = false;
	isDriver = false;
	name = "";
	email = "";
	cpf = "";
	password = "";
	confirmPassword = "";
	step = 1;
	error = "";
	success = "";

	constructor () {
		super();
	}

	calculateProgress () {
		let progress = 0;
		if (this.isPassenger) {
			progress += 25;
		}
		if (this.name) {
			progress += 15;
		}
		if (this.email) {
			progress += 15;
		}
		if (this.cpf) {
			progress += 15;
		}
		if (this.password) {
			progress += 15;
		}
		if (this.confirmPassword) {
			progress += 15;
		}
		return progress;
	}

	validate () {
		this.error = "";
		if (this.step === 1) {
			if (!this.isPassenger && !this.isDriver) {
				this.error = "Selecione um tipo de conta: passageiro ou motorista ou ambos";
				return false;
			}
		}
		if (this.step === 2) {
			if (!this.name) {
				this.error = "Digite o nome";
				return false;
			}
			if (!this.email) {
				this.error = "Digite o email";
				return false;
			}
			if (!this.cpf) {
				this.error = "Digite o cpf";
				return false;
			}
		}
		if (this.step === 3) {
			if (!this.password) {
				this.error = "A senha não pode ser vazia";
				return false;
			}
			if (this.password !== this.confirmPassword) {
				this.error = "A senha e a confirmação de senha precisam ser iguais";
				return false;
			}
		}
		return true;
	}

	previous () {
		this.step--;
	}

	showPrevious () {
		return this.step > 1;
	}

	next () {
		if (this.validate()) {
			this.step++;
		}
	}

	showNext () {
		return this.step < 3;
	}

	async submit () {
		if (this.validate()) {
			const data = {
				isPassenger: this.isPassenger,
				name: this.name,
				email: this.email,
				cpf: this.cpf
			}
			this.notify({ event: "submitted", data });
		}
	}

	showSubmit () {
		return this.step === 3;
	}

	setData () {
		this.isPassenger = true;
		this.name = "John Doe";
		this.email = `john.doe${Math.random()}@gmail.com`;
		this.cpf = "97456321558";
		this.password = "123456";
		this.confirmPassword = "123456";
	}

}