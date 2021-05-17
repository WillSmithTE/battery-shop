export type Transaction = {
    id: string;
    email: string;
    cart: Cart;
}

export type Cart = {
    items: CartItem[];
}

export type CartItem = {
    itemId: number;
    quantity: number;
}

export type Battery = {
    title: string;
    description: string;
    pictureUrl: string;
    price: number;
}
