import {databasePool} from "../databasePool";
import {RequestHandler} from "express";
import {CartItem} from "../model";

export const CartController: {
    get: RequestHandler,
    add: RequestHandler<{}, {}, CartItem>,
    delete: RequestHandler<{ itemId: string }>,
    getPrice(): Promise<number>,
    deleteAll(): void,
} = {
    get: async (request, response) => {
        const client = await databasePool.connect();
        const {rows} = await client.query(`SELECT *
                                           FROM item
                                                    JOIN cart_item ON item.id = cart_item.item_id`);

        client.release();

        response.send(rows);
    },
    add: async ({body: {itemId}}, response) => {
        try {
            const client = await databasePool.connect();
            const {rows} = await client.query<CartItem>(`SELECT * from cart_item WHERE item_id = '${itemId}'`);
            if (rows.length) {
                const cartItem = rows[0];
                await client.query(`UPDATE cart_item SET quantity = ${cartItem.quantity + 1} WHERE item_id = '${itemId}'`);
            } else {
                await client.query(`INSERT INTO cart_item (item_id, quantity) VALUES (${itemId}, 1)`);
            }
            client.release();
            response.sendStatus(200);
        } catch (error) {
            response.status(500).send(error);
        }
    },
    delete: async (request, response) => {
        const client = await databasePool.connect();
        const {rows} = await client.query<CartItem>(`SELECT * from cart_item WHERE item_id = '${request.params.itemId}'`);
        if (rows.length) {
            const cartItem = rows[0];
            if (cartItem.quantity > 1) {
                await client.query(`UPDATE cart_item SET quantity = ${cartItem.quantity - 1} WHERE item_id = '${request.params.itemId}'`);
            } else {
                await client.query(`DELETE from cart_item WHERE item_id = '${request.params.itemId}'`);
            }
            response.sendStatus(200);
        } else {
            response.sendStatus(404);
        }
    },
    getPrice: async () => {
        const client = await databasePool.connect();
        const {rows} = await client.query(`SELECT price, quantity
                                           FROM item
                                                    JOIN cart_item ON item.id = cart_item.item_id`);
        client.release();

        return rows.reduce((sum, {price, quantity}) => sum + Number(price) * quantity, 0);
    },
    deleteAll: async () => {
        const client = await databasePool.connect();
        return client.query(`DELETE
                             FROM cart_item`);
    },
};