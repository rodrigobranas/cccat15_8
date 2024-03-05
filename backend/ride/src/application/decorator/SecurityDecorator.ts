import Usecase from "../usecase/Usecase";

export default class SecurityDecorator implements Usecase {

	constructor (readonly usecase: Usecase) {
	}

	execute(input: any): Promise<any> {
		console.log("validating user security token");
		return this.usecase.execute(input);
	}

}