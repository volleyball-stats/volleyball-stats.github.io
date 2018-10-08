import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

import { ASC_ORD, DESC_ORD, INITIAL_PAGE, INITIAL_PER_PAGE } from 'utils/constants';
import { naturalOrderSort } from 'utils/helpers';

import DataTableHead from './DataTableHead';

import './DataTable.css';
import DataTablePagination from './DataTablePagination';

class DataTable extends Component {
  static propTypes = {
    classes: PropTypes.object,
    cols: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      sortId: PropTypes.string,
      disableSort: PropTypes.bool
    })).isRequired,
    getRows: PropTypes.func.isRequired,
    sourceData: PropTypes.array.isRequired,
    initialPage: PropTypes.number,
    initialOrder: PropTypes.oneOf([ASC_ORD, DESC_ORD]),
    initialOrderBy: PropTypes.string,
    initialRowsPerPage: PropTypes.number,
    showCheckboxes: PropTypes.bool,
    showPagination: PropTypes.bool,
    showToolbar: PropTypes.bool,
    onRowClick: PropTypes.func
  };

  static defaultProps = {
    initialOrder: DESC_ORD,
    initialPage: INITIAL_PAGE,
    initialRowsPerPage: INITIAL_PER_PAGE,
    showCheckboxes: false,
    showPagination: true,
    showToolbar: false,
    classes: {
      root: '',
      tableCell: 'tableCell',
      tableCellHead: 'tableCellHead'
    }
  };

  constructor(props) {
    super(props);
    const { initialOrder, initialOrderBy, getRows, initialRowsPerPage, initialPage, sourceData } = this.props;
    const data = this.getSortedData(getRows(sourceData), initialOrderBy, initialOrder);
    const displayData = this.getDisplayData(data, initialPage, initialRowsPerPage);

    this.state = {
      order: initialOrder,
      orderBy: initialOrderBy,
      page: initialPage,
      rowsPerPage: initialRowsPerPage,
      data,
      displayData,
      selected: []
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { getRows, sourceData } = this.props;

    if (sourceData !== prevProps.sourceData) {
      const { orderBy, order, rowsPerPage } = prevState;
      const page = INITIAL_PAGE;
      const data = this.getSortedData(getRows(sourceData), orderBy, order);
      const displayData = this.getDisplayData(data, page, rowsPerPage);

      this.setState({ data, displayData, page });
    }
  }

  getDisplayData = (data, page, rowsPerPage) => {
    const displayData = [];
    for (let i = page * rowsPerPage; i < page * rowsPerPage + rowsPerPage; i++) {
      data[i] && displayData.push(data[i]);
    }

    return displayData;
  };

  getSortedData = (data, orderBy, order) => {
    const { cols } = this.props;
    const sortId = cols.find(col => col.id === orderBy).sortId;
    const newOrderBy = sortId || orderBy;

    return data.sort((a, b) => naturalOrderSort(a[newOrderBy], b[newOrderBy], order));
  };

  handleRequestSort = (event, newOrderBy) => {
    const page = INITIAL_PAGE;

    let newOrder = this.state.orderBy === newOrderBy && this.state.order === DESC_ORD ? ASC_ORD : DESC_ORD;

    const data = this.getSortedData(this.state.data, newOrderBy, newOrder);
    const displayData = this.getDisplayData(data, page, this.state.rowsPerPage);

    this.setState({
      data,
      displayData,
      page,
      order: newOrder,
      orderBy: newOrderBy
    });
  };

  handleChangePage = (event, page) => {
    const { data, rowsPerPage } = this.state;
    const displayData = this.getDisplayData(data, page, rowsPerPage);

    this.setState({ page, displayData });
  };

  handleChangeRowsPerPage = event => {
    const rowsPerPage = event.target.value;
    const page = INITIAL_PAGE;
    const displayData = this.getDisplayData(this.state.data, page, rowsPerPage);

    this.setState({ rowsPerPage, page, displayData });
  };

  handleClick = id => {
    this.props.onRowClick(id);
  };

  handleSelectAllClick = () => {
    //TODO something someday
  };


  render() {
    const { cols, showPagination, showCheckboxes, classes } = this.props;
    let { order, data, orderBy, rowsPerPage, page, displayData, selected } = this.state;

    const componentClasses = {
      paper: { root: `table-paper ${classes.root}` },
      table: { root: `table ${classes.table}` },
      tableHead: {
        tableCellHead: classes.tableCellHead,
        tableRowHead: classes.tableRowHead
      },
      tableRow: { root: 'tableRow' },
      tableCell: `tableCell ${classes.tableCell}`
    };

    return (
      <Paper classes={componentClasses.paper} elevation={0}>
        <div className={'tableWrapper'}>

          <Table classes={componentClasses.table}>
            <DataTableHead
              cols={cols}
              showCheckboxes={showCheckboxes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
              classes={componentClasses.tableHead}
            />
            <TableBody>
              {displayData.length === 0 && (
                <TableRow classes={componentClasses.tableRow}>
                  <TableCell colSpan={cols.length}>
                    No Data
                  </TableCell>
                </TableRow>
              )}
              {displayData.length > 0 && displayData.map(row => (
                <TableRow
                  classes={componentClasses.tableRow}
                  onClick={this.handleClick.bind(this, row.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {cols.map((column, index) => (
                    <TableCell className={componentClasses.tableCell} key={index}>
                      {row[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {showPagination && (
          <DataTablePagination
            count={data.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </Paper>
    );
  }
}

export default DataTable;
