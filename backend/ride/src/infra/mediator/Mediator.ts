export default class Mediator {
	services: { event: string, callback: Function }[];

	constructor () {
		this.services = [];
	}

	register (event: string, callback: Function) {
		this.services.push({ event, callback });
	}

	async notify (event: string, data: any) {
		for (const service of this.services) {
			if (service.event === event) {
				await service.callback(data);
			}
		}
	}
}
