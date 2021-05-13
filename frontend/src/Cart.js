import { useEffect, useState } from "react";
import { api } from "./api";
import EnhancedTable from "./component/EnhancedTable";

export const Cart = ({items}) => {

    const onlyTitle = items.map(({item, quantity}) => ({ title: item.title, quantity}))

    const headCells = [
        { id: 'title', label: 'Title' },
        { id: 'quantity', label: 'Quantity' },
    ];

    return <EnhancedTable
        title='Cart'
        orderBy='title'
        keyProp='title'
        rows={onlyTitle}
        headCells={headCells}
    />;
}