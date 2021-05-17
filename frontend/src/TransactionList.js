import EnhancedTable from "./table/EnhancedTable";

export const TransactionList = ({items}) => {

    const headCells = [
        { id: 'email', label: 'Email' },
        { id: 'price', label: 'Price' },
    ];

    const tableRows = items.map((item) => ({
        ...item,
        price: `$${item.price}`
    }));

    return <EnhancedTable
        title='Transactions'
        orderBy='id'
        keyProp='id'
        rows={tableRows}
        headCells={headCells}
    />;
}