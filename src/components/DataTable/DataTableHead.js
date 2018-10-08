import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

class DataTableHead extends PureComponent {
  static propTypes = {
    classes: PropTypes.object,
    cols: PropTypes.array.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    showCheckboxes: PropTypes.bool.isRequired
  };

  createSortHandler = (property, event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { cols, showCheckboxes, onSelectAllClick, order, orderBy, numSelected, rowCount, classes } = this.props;
    return (
      <TableHead>
        <TableRow classes={{ root: `rowHead ${classes.tableRowHead}` }}>
          {showCheckboxes ?
            <TableCell className={`tableCellHead ${classes.tableCellHead}`} padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell>
            : null}
          {cols.map(column => ((
            <TableCell
              key={column.id}
              numeric={column.numeric}
              className={`tableCellHead ${classes.tableCellHead}`}
              padding={'default'}
            >
              {!column.disableSort ?
                <Tooltip
                  title='Sort'
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler.bind(this, column.id)}>
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
                :
                column.label
              }
            </TableCell>
          )), this)}
        </TableRow>
      </TableHead>
    );
  }
}

export default DataTableHead;
