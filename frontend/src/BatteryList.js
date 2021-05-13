import EnhancedTable from './component/EnhancedTable';
import { Button, Form, Container, Header } from 'semantic-ui-react'
import { api } from './api';

export const BatteryList = ({ batteries, onAddToCart }) => {

    const addToCart = (battery) => {
        api.addToCart(battery);
        onAddToCart(battery);
    };

    const withAddToCartButton = batteries.map((battery) => {
        return {
            ...battery,
            photo: <img style={{height: '4rem'}} src={battery.pictureUrl} alt='battery'/>,
            addToCart: <Button onClick={() => addToCart(battery)}>Add to cart</Button>
        }
    });

    const headCells = [
        { id: 'title', label: 'Title' },
        { id: 'description', label: 'Description' },
        { id: 'photo', label: '' },
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