export default class Email {
	private value: string;

	constructor (email: string) {
		if (this.isInvalidEmail(email)) throw new Error("Invalid email");
		this.value = email;
	}

	private isInvalidEmail (email: string) {
		return !email.match(/^(.+)@(.+)$/)
	}

	getValue () {
		return this.value;
	}

}
