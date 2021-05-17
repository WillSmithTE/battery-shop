import {Button} from "semantic-ui-react";
import EnhancedTable from "./table/EnhancedTable";

export const Cart = ({ items, deleteItem }) => {

    const tableRows = items.map(({ title, quantity, id }) => ({
        title: title,
        quantity,
        delete: <Button onClick={() => deleteItem(id)}>Remove</Button>
    }));

    const headCells = [
        { id: 'title', label: 'Title' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'delete', label: '' },
    ];

    return <EnhancedTable
        title='Cart'
        orderBy='title'
        keyProp='title'
        rows={tableRows}
        headCells={headCells}
    />;
}