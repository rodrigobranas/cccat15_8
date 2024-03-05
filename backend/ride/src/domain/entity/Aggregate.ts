import DomainEvent from "../event/DomainEvent";

// Observable
export default class Aggregate {
	listeners: { name: string, callback: Function }[];

	constructor () {
		this.listeners = [];
	}

	register (name: string, callback: Function) {
		this.listeners.push({ name, callback });
	}

	notify (event: DomainEvent) {
		for (const listener of this.listeners) {
			if (listener.name === event.name) {
				listener.callback(event);
			}
		}
	}
}
