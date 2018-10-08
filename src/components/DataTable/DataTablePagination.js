import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

import DataTablePaginationActions from './DataTablePaginationActions';

class DataTableHead extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
  };

  static defaultProps = {
    rowsPerPage: 10,
    rowsPerPageOptions: [5, 10, 20],
    onChangeRowsPerPage: () => {
    },
    onChangePage: () => {
    }
  };

  render() {
    const { count, page, rowsPerPage, onChangePage, onChangeRowsPerPage, rowsPerPageOptions } = this.props;
    const classes = {
      root: 'pagination',
      toolbar: 'paginationToolbar',
      spacer: 'paginationSpacer',
      caption: 'paginationCaption',
      selectRoot: 'paginationSelect'
    };

    return (
      <TablePagination
        component="div"
        ActionsComponent={DataTablePaginationActions}
        classes={classes}
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    );
  }
}


export default DataTableHead;
