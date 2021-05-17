import {databasePool} from "../databasePool";
import {RequestHandler} from "express";
import {Battery} from "../model";

type RequestQuery = {
    search: string;
};

export const BatteryController: {
    get: RequestHandler<{}, {}, {}, RequestQuery>,
    add: RequestHandler<{}, {}, Battery>,
} = {
    get: async (request, response) => {
        const searchTerm = request.query.search;
        const sql = searchTerm ?
            `SELECT * FROM item WHERE title LIKE '%${searchTerm}%' OR description LIKE '%${searchTerm}%'` :
            `SELECT * FROM item`;
        const client = await databasePool.connect();
        const {rows} = await client.query(sql);

        client.release();

        response.send(rows);
    },
    add: async ({body: {title, description, pictureUrl, price}}, response) => {
        try {
            const client = await databasePool.connect();
            await client.query(`INSERT INTO item (title, description, price, picture_url) VALUES ('${title}', '${description}', ${price}, '${pictureUrl}')`);
            client.release();
            response.sendStatus(200);
        } catch (error) {
            response.status(500).send(error);
        }
    },
};