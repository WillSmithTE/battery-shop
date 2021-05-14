import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { api } from "./api";
import EnhancedTable from "./table/EnhancedTable";

export const Cart = ({ items, deleteItem }) => {

    const tableRows = items.map(({ item, quantity }) => ({
        title: item.title,
        quantity,
        delete: <Button onClick={() => deleteItem(item.title)}>Remove</Button>
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