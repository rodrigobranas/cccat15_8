// Framework and Driver
export default interface Storage {
	set (name: string, value: string): void;
	get (name: string): string;
}

export class LocalStorageBrowser implements Storage {

	set(name: string, value: string): void {
		window.localStorage.set(name, value);
	}

	get(name: string): string {
		return window.localStorage.get(name);
	}
}

export class MemoryStorage implements Storage {
	elements: any = {};

	set(name: string, value: string): void {
		this.elements[name] = value;
	}

	get(name: string): string {
		return this.elements[name];
	}
}
