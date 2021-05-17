import {databasePool} from "../databasePool";
import {RequestHandler} from "express";
import {Battery} from "../model";
import {CartController} from "./CartController";

export const TransactionController: {
    get: RequestHandler,
    add: RequestHandler<{}, {}, { email: string }>,
} = {
    get: async (request, response) => {
        const client = await databasePool.connect();
        const {rows} = await client.query(`SELECT *
                                           FROM transaction`);

        client.release();

        response.send(rows);
    },
    add: async ({body: {email}}, response) => {
        try {
            const price = await CartController.getPrice();
            const client = await databasePool.connect();
            await client.query(`INSERT INTO transaction (email, price) VALUES ('${email}', ${price})`);
            await CartController.deleteAll();
            client.release();
            response.sendStatus(200);
        } catch (error) {
            response.status(500).send(error);
        }
    },
};