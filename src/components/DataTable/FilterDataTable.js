import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _debounce from 'lodash/debounce';
import _includes from 'lodash/includes';
import TextField from '@material-ui/core/TextField/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment/InputAdornment';

import DataTable from './DataTable';

class FilterDataTable extends PureComponent {
  static propTypes = {
    searchBy: PropTypes.string.isRequired,
    sourceData: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      searchText: '',
      data: props.sourceData
    };

    this.debounceOnChange = _debounce(this.delayedOnChange, 250);
  }

  componentDidUpdate(prevProps) {
    const { sourceData } = this.props;

    if (sourceData !== prevProps.sourceData) {
      this.onChange(this.state.searchText);
    }
  }

  delayedOnChange = (searchValue) => {
    const { searchBy, sourceData } = this.props;

    const filteredData = sourceData.filter(item =>
      _includes(item[searchBy].toLowerCase(), searchValue.toLowerCase())
    );

    this.setState({ data: filteredData });
  };

  onChange = (event) => {
    event.persist();
    this.debounceOnChange(event.target.value);
  };

  render() {
    return (
      <div className={'table-with-filter'}>
        <div className={'filter-wrapper'}>
          <TextField
            placeholder="Search.."
            type="search"
            variant="standard"
            onChange={this.onChange}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
            }}
          />
        </div>
        <DataTable {...this.props} sourceData={this.state.data}/>
      </div>
    );
  }
}

export default FilterDataTable;
