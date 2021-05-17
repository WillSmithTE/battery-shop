import express, {RequestHandler} from 'express';
import cors from 'cors';
import {databasePool} from './databasePool';
import {BatteryController} from "./controller/BatteryController";
import {CartController} from "./controller/CartController";
import {TransactionController} from "./controller/TransactionController";

const app = express();
const port = process.env['PORT'] || 8080;

app.use(express.json());
app.use(cors());

app.get("/battery", BatteryController.get);
app.post("/battery", BatteryController.add);

app.get("/cart", CartController.get);
app.post("/cart", CartController.add);
app.delete("/cart/:itemId", CartController.delete);

app.get("/transaction", TransactionController.get);
app.post("/transaction", TransactionController.add);

databasePool.connect((error, client, done) => {
    if (error) throw error;
    console.log('Connected to database');
});


app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});