import crypto from "crypto";
import { PgPromiseAdapter } from "../../src/infra/database/DatabaseConnection";
import AccountModel from "../../src/infra/orm/AccountModel";
import ORM from "../../src/infra/orm/ORM";
import Account from "../../src/domain/entity/Account";

test("Deve testar o ORM", async function () {
	const accountId = crypto.randomUUID();
	const accountModel = new AccountModel(accountId, "John Doe", "john.doe@gmail.com", "111.111.111-11", "", true, false);
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	await orm.save(accountModel);
	const savedAccountModel = await orm.findBy(AccountModel, "account_id", accountId);
	expect(savedAccountModel.name).toBe("John Doe");
	expect(savedAccountModel.email).toBe("john.doe@gmail.com");
	expect(savedAccountModel.cpf).toBe("111.111.111-11");
	expect(savedAccountModel.carPlate).toBe("");
	await connection.close();
});

test("Deve testar o ORM com um aggregate real", async function () {
	const accountId = crypto.randomUUID();
	const account = Account.restore(accountId, "John Doe", "john.doe@gmail.com", "97456321558", true, false, "");
	const accountModel = AccountModel.fromAggregate(account);
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	await orm.save(accountModel);
	const savedAccountModel = await orm.findBy(AccountModel, "account_id", accountId);
	expect(savedAccountModel.name).toBe("John Doe");
	expect(savedAccountModel.email).toBe("john.doe@gmail.com");
	expect(savedAccountModel.cpf).toBe("97456321558");
	expect(savedAccountModel.carPlate).toBe("");
	await connection.close();
});

test("Deve testar o ORM com um aggregate real", async function () {
	const accountId = crypto.randomUUID();
	const email = `john.doe+${Math.random()}@gmail.com`;
	const account = Account.restore(accountId, "John Doe", email, "97456321558", true, false, "");
	const accountModel = AccountModel.fromAggregate(account);
	const connection = new PgPromiseAdapter();
	const orm = new ORM(connection);
	await orm.save(accountModel);
	const savedAccountModel = await orm.findBy(AccountModel, "email", email);
	expect(savedAccountModel.name).toBe("John Doe");
	expect(savedAccountModel.email).toBe(email);
	expect(savedAccountModel.cpf).toBe("97456321558");
	expect(savedAccountModel.carPlate).toBe("");
	await connection.close();
});
