const BASE_URL = process.env.NODE_ENV === 'development' ?
    'http://localhost:8080' : 'https://rsvp-yo-4lec554gkq-as.a.run.app'

const fetchJson = (url, args = {}) => fetch(url, args).then((response) => response.json());

export const api = {
    searchBatteries: async (search = '') => {
        return await fetchJson(`${BASE_URL}/battery?search=${search}`)
    },
    getCart: async () => {
        return await fetchJson(`${BASE_URL}/cart`)
    },
    addToCart: async (battery) => {
        return await fetchJson(
            `${BASE_URL}/cart`,
            {
                method: 'POST',
                body: JSON.stringify(battery),
                headers: {
                    'Content-Type': 'application/json'
                },
            }

        )
    },
};