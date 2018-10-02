import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Add from '@material-ui/icons/Add';
import History from '@material-ui/icons/History';
import BarChart from '@material-ui/icons/BarChart';

export const submenuItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <Add/>
      </ListItemIcon>
      <ListItemText primary="Add Event"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <History/>
      </ListItemIcon>
      <ListItemText primary="History"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChart/>
      </ListItemIcon>
      <ListItemText primary="Stats"/>
    </ListItem>
  </div>
);
