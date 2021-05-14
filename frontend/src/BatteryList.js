import EnhancedTable from './table/EnhancedTable';
import { Button, Form, Container, Header } from 'semantic-ui-react'
import { api } from './api';

export const BatteryList = ({ items, onAddToCart }) => {

    const addToCart = async (battery) => {
        await api.addToCart(battery);
        await onAddToCart(battery);
    };

    const withAddToCartButton = items.map((battery) => {
        return {
            ...battery,
            photo: <img style={{height: '4rem'}} src={battery.pictureUrl} alt='battery'/>,
            addToCart: <Button onClick={() => addToCart(battery)}>Add to cart</Button>,
            price: `$${battery.price}`,
        }
    });

    const headCells = [
        { id: 'title', label: 'Title' },
        { id: 'description', label: 'Description' },
        { id: 'photo', label: '' },
        { id: 'price', label: 'Price' },
        { id: 'addToCart', label: ''},
    ];

    return <EnhancedTable
        title='Batteries'
        orderBy='title'
        keyProp='title'
        rows={withAddToCartButton}
        headCells={headCells}
    />;
};