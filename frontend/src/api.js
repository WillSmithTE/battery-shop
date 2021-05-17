const BASE_URL = process.env.NODE_ENV === 'development' ?
    'http://localhost:8080' : 'todo'

const jsonFetch = (url, args = {}) => fetch(url, args).then((response) => response.json());

export const api = {
    searchBatteries: async (search = '') => {
        return await jsonFetch(`${BASE_URL}/battery?search=${search}`)
    },
    getCart: async () => {
        return await jsonFetch(`${BASE_URL}/cart`)
    },
    addToCart: async (battery) => {
        return await fetch(
            `${BASE_URL}/cart`,
            {
                method: 'POST',
                body: JSON.stringify({ itemId: battery.id}),
                headers: {
                    'Content-Type': 'application/json'
                },
            }

        )
    },
    deleteFromCart: async (title) => {
        return await fetch(
            `${BASE_URL}/cart/${title}`,
            {
                method: 'DELETE',
            }

        )
    },
    getTransactions: async () => {
        return await jsonFetch(`${BASE_URL}/transaction`)
    },
    submitTransaction: async (email) => {
        return await fetch(
            `${BASE_URL}/transaction`,
            {
                method: 'POST',
                body: JSON.stringify({email}),
                headers: {
                    'Content-Type': 'application/json'
                },
            }

        )
    },
};