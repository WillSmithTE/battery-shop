import EnhancedTable from "./table/EnhancedTable";

export const TransactionList = ({items}) => {

    const headCells = [
        { id: 'email', label: 'Email' },
        { id: 'price', label: 'Price' },
    ];

    const tableRows = items.map((item) => ({
        ...item,
        price: `$${item.cart.items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)}`
    }));

    return <EnhancedTable
        title='Transactions'
        orderBy='id'
        keyProp='id'
        rows={tableRows}
        headCells={headCells}
    />;
}