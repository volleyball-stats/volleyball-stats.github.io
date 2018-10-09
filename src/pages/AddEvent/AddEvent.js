import React, { PureComponent } from 'react';
import Paper from '@material-ui/core/Paper/Paper';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Grid from '@material-ui/core/Grid/Grid';

import FilterDataTable from 'components/DataTable/FilterDataTable';
import DateTimePicker from 'components/DateTimePicker/DateTimePicker';
import users from './participants';
import './AddEvent.css';

class CustomDataTable extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultOrderBy = 'alias';
    this.searchBy = 'alias';

    this.cols = [
      { id: 'alias', label: 'Alias' },
      { id: 'name', label: 'Full Name' },
      { id: 'participations', label: 'Participations' }
    ];

    this.state = {
      goingUsers: [],
      allUsers: users,
      name: '',
      date: '',
      duration: '',
      perHour: '',
      perPlayer: ''
    }
  }

  getTableRows = (tableData) => {
    const rows = [];
    tableData.forEach(item => {
      rows.push({
        id: item.id,
        name: item.name,
        alias: item.alias,
        participations: item.participations
      });
    });

    return rows;
  };

  onDateChange = () => {
    //TODO
  };

  render() {
    return (
      <div className="add-event-wrapper">
        <Typography variant={'display1'} gutterBottom>Event Details</Typography>
        <Paper className="card-style event-details">
          <Grid container wrap={'wrap'}>
            <Grid item sm={6}>
              <TextField label={'Name'}/>
            </Grid>
            <Grid item sm={6}>
              <DateTimePicker onChange={this.onDateChange} mode={'single'}/>
            </Grid>
            <Grid item sm={4}>
              <TextField label={'Duration'}/>
            </Grid>
            <Grid item sm={4}>
              <TextField label={'Per Hour'}/>
            </Grid>
            <Grid item sm={4}>
              <TextField label={'Player Contribution'}/>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant={'display1'} gutterBottom>Participants</Typography>
        <Paper className="card-style">
          <Grid container justify={'space-between'}>
            <Grid item sm={5} xs={12}>
              <FilterDataTable
                cols={this.cols}
                getRows={this.getTableRows}
                sourceData={this.state.goingUsers}
                initialOrderBy={this.defaultOrderBy}
                searchBy={this.searchBy}
                showPagination={false}
              />
            </Grid>
            <Grid item sm={5} xs={12}>
              <FilterDataTable
                cols={this.cols}
                getRows={this.getTableRows}
                sourceData={this.state.allUsers}
                initialOrderBy={this.defaultOrderBy}
                searchBy={this.searchBy}
                showPagination={false}
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default CustomDataTable;
