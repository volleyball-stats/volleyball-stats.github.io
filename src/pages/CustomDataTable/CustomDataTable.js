import React, { PureComponent } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent';

import DateTimePicker from 'components/DateTimePicker/DateTimePicker';
import { getMonthDateRange } from 'utils/helpers';
import tableData from './tableData';

import './CustomDataTable.css';
import FilterDataTable from '../../components/DataTable/FilterDataTable';

class CustomDataTable extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultOrderBy = 'date';
    this.searchBy = 'name';

    this.cols = [
      { id: 'id', label: 'ID' },
      { id: 'name', label: 'Event' },
      { id: 'date', label: 'Date' },
      { id: 'participants', label: 'Participants' }
    ];
  }

  getTableRows = (tableData) => {
    const rows = [];
    tableData.forEach(item => {
      rows.push({
        id: item.id,
        name: item.name,
        date: item.date,
        participants: item.participants
      });
    });

    return rows;
  };

  getDatePickerPresets = () => {
    let presets = [];

    presets.push({
      start: moment().startOf('month'),
      end: moment(),
      label: 'This Month'
    });

    for (let i = 1; i < 6; i++) {
      const offsetMonth = moment().subtract(i, 'months');
      presets.push(getMonthDateRange(offsetMonth));
    }

    return presets;
  };

  onDatesChange = () => {
    //TODO
  };

  render() {
    const { startDate, endDate } = defaultFilterDates;
    return (
      <Card elevation={1} raised className="cardStyle">
        <CardContent>
          <DateTimePicker
            mode={'range'}
            presets={this.getDatePickerPresets()}
            onChange={this.onDatesChange}
            defaultDate={[startDate.toDate(), endDate.toDate()]}
          />

          <FilterDataTable
            cols={this.cols}
            getRows={this.getTableRows}
            sourceData={tableData}
            initialOrderBy={this.defaultOrderBy}
            searchBy={this.searchBy}
          />
        </CardContent>
      </Card>
    );
  }
}

export const defaultFilterDates = {
  startDate: moment().startOf('month'),
  endDate: moment()
};

export default CustomDataTable;
