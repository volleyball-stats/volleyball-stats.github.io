import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import DefaultLayout from 'pages/DefaultLayout/DefaultLayout';
import Register from 'pages/RegisterPage/Register';
import CustomDataTable from 'pages/CustomDataTable/CustomDataTable';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path={'/register'} component={Register}/>
        <Route path={'/table'} component={CustomDataTable}/>
        <Route path={'/'} component={DefaultLayout}/>
      </Switch>
    );
  }
}

export default App;
