import React from 'react';
import Paper from '@material-ui/core/Paper';
import {EnhancedTableToolbar} from './EnhancedTableToolbar';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import {EnhancedTableHead} from './EnhancedTableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ROWS_PER_PAGE_OPTIONS = {
  FIVE: 5,
  TEN: 10,
  THIRTY: 30,
  ONE_HUNDRED: 100,
  FIVE_HUNDRED: 500
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        // minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable({orderBy: orderByProp, rows, keyProp, headCells, title}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState(orderByProp);
    const [page, setPage] = React.useState(0);
    const [dense/*, setDense*/] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE_OPTIONS.THIRTY);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //
    // const handleChangeDense = (event) => {
    //     setDense(event.target.checked);
    // };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar title={title}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCells={headCells}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row[keyProp]}
                                        >
                                            {headCells.map((header, index) => <TableCell key={index}>{row[header.id]}</TableCell>)}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={Object.values(ROWS_PER_PAGE_OPTIONS)}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            {/*<FormControlLabel*/}
            {/*    control={<Switch checked={dense} onChange={handleChangeDense}/>}*/}
            {/*    label="Dense padding"*/}
            {/*/>*/}
        </div>
    );
}

EnhancedTable.propTypes = {
    orderBy: PropTypes.string.isRequired,
    keyProp: PropTypes.string.isRequired,
    rows: PropTypes.array.isRequired,
    headCells: PropTypes.array.isRequired
};

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
