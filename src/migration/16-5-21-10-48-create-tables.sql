CREATE TABLE item
(
    id          SERIAL PRIMARY KEY,
    title       TEXT    NOT NULL,
    description TEXT    NOT NULL,
    price       NUMERIC NOT NULL,
    picture_url TEXT    NOT NULL
);

CREATE TABLE cart_item
(
    item_id   SERIAL PRIMARY KEY references item (id),
    quantity INTEGER
);

CREATE TABLE transaction
(
    id    SERIAL PRIMARY KEY,
    email TEXT,
    price NUMERIC NOT NULL
);