import axios from "axios";
import fetch from "node-fetch";

export default interface HttpClient {
	get (url: string): Promise<any>;
	post (url: string, data: any): Promise<any>;
}

// Frameworks and Drivers
export class AxiosAdapter implements HttpClient {

	async get(url: string): Promise<any> {
		const response = await axios.get(url);
		return response.data;
	}

	async post(url: string, data: any): Promise<any> {
		const response = await axios.post(url, data);
		return response.data;
	}
}

// Frameworks and Drivers
export class FetchAdapter implements HttpClient {

	async get(url: string): Promise<any> {
		const response = await fetch(url);
		return response.json();
	}

	async post(url: string, body: any): Promise<any> {
		const response = await fetch(url, {
			method: "post",
			headers: {
				"content-type": "application/json"
			},
			body: JSON.stringify(body)
		});
		return response.json();
	}

}
