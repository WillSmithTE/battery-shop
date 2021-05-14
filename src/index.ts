import express, { RequestHandler } from "express";
import cors from 'cors';

const app = express();
const port = process.env['PORT'] || 8080;

type Database = {
    batteries: Battery[];
    cart: Cart;
    transactions: Transaction[];
}

type Transaction = {
    id: string;
    email: string;
    cart: Cart;
}

type Cart = {
    items: CartItem[];
}

type CartItem = {
    item: Battery;
    quantity: number;
}

type Battery = {
    title: string;
    description: string;
    pictureUrl: string;
    price: number;
}

type RequestQuery = {
    search: string;
}

const database: Database = {
    batteries: [],
    cart: { items: [] },
    transactions: [],
};

const getId = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

const getBatteriesHandler: RequestHandler<{}, {}, {}, RequestQuery> = (request, response) => {
    const searchTerm = request.query.search;
    const foundBatteries = searchTerm ?
        database.batteries.filter((battery) => battery.title.includes(searchTerm) || battery.description.includes(searchTerm)) :
        database.batteries;
    response.send(foundBatteries);
};

const addBatteryHandler: RequestHandler<{}, {}, Battery> = (request, response) => {
    database.batteries.push(request.body);
    response.send({
        response: 'success'
    });
};

const getCartHandler: RequestHandler = (_, response) => {
    response.send(database.cart);
};

const addToCartHandler: RequestHandler<{}, {}, Battery> = (request, response) => {
    const existingItemIndex = database.cart.items.findIndex(({ item }) => item.title === request.body.title);
    if (existingItemIndex === -1) {
        database.cart.items.push({ item: request.body, quantity: 1 });
    } else {
        database.cart.items[existingItemIndex].quantity++;
    }
    response.send({
        response: 'success'
    });
};

const deleteFromCartHandler: RequestHandler<{ title: String }, {}, {}> = (request, response) => {
    const existingItemIndex = database.cart.items.findIndex(({ item }) => item.title === request.params.title);
    if (existingItemIndex === -1) {
        response.send({
            response: 'item not found'
        });
    } else {
        if (database.cart.items[existingItemIndex].quantity > 1) {
            database.cart.items[existingItemIndex].quantity--;
        } else {
            database.cart.items.splice(existingItemIndex, 1);
        }
        response.send({
            response: 'success'
        });
    }
};

const getTransactionsHandler: RequestHandler = (request, response) => {
    response.send(database.transactions);
};

const submitTransactionHandler: RequestHandler<{}, {}, { email: string }> = (request, response) => {
    database.transactions.push({
        id: getId(),
        email: request.body.email,
        cart: database.cart
    });

    database.cart = { items: [] };
    response.send({
        response: 'success'
    });
};

function bootstrapDatabase() {
    for (let i = 0; i < 5; i++) {
        database.batteries.push({
            title: `Battery ${i}`,
            description: `This is battery number ${i}`,
            pictureUrl: 'https://d35iimz8nf8xoe.cloudfront.net/media/catalog/product/cache/e763c12cc3f14cf43cb54210f4e7c1c7/h/p/hps-300_wga.jpg',
            price: i,
        })
    }
}

bootstrapDatabase();

app.use(express.json());
app.use(cors());

app.get("/battery", getBatteriesHandler);
app.post("/battery", addBatteryHandler);

app.get("/cart", getCartHandler);
app.post("/cart", addToCartHandler);
app.delete("/cart/:title", deleteFromCartHandler);

app.get("/transaction", getTransactionsHandler);
app.post("/transaction", submitTransactionHandler);

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});