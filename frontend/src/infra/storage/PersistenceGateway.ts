import Storage from "../storage/Storage";

// Interface Adapter
export default class PersistenceGateway {

	constructor (readonly storage: Storage) {
	}

	saveQueryString (querystring: string) {
		this.storage.set("querystring", querystring);
	}
}
