import React, { Component } from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Button from '@material-ui/core/Button';

class DataTablePaginationActions extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  render() {
    const { count, page, rowsPerPage } = this.props;
    return (
      <div className={'paginationActionsWrapper'}>
        <Button className={`actionBtn trailingSpace`}
                onClick={this.handleBackButtonClick}
                disabled={page === 0}
                size={'small'}>
          <KeyboardArrowLeft classes={{root: 'actionBtnIcon'}}/>
        </Button>
        <Button className={'actionBtn'}
                onClick={this.handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                size={'small'}>
          <KeyboardArrowRight classes={{root: 'actionBtnIcon'}}/>
        </Button>
      </div>
    );
  }
}

export default DataTablePaginationActions;
