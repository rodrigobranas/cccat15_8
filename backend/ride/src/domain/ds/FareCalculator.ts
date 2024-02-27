export default abstract class FareCalculator {
	calculate (distance: number): number {
		return distance * this.getFare();
	}

	abstract getFare(): number;
}

export class NormalFareCalculator extends FareCalculator {
	FARE = 2.1;

	getFare () {
		return this.FARE;
	}
}

export class OvernightFareCalculator extends FareCalculator {
	FARE = 3.9;

	getFare () {
		return this.FARE;
	}
}

export class SundayFareCalculator extends FareCalculator {
	FARE = 2.9;

	getFare () {
		return this.FARE;
	}
}

export class FareCalculatorFactory {
	static create (date: Date) {
		if (date.getDay() === 0) return new SundayFareCalculator();
		if (date.getHours() > 22 || date.getHours() < 6) return new OvernightFareCalculator();
		if (date.getHours() <= 22 && date.getHours() >= 6) return new NormalFareCalculator();
		throw new Error();
	}
}
