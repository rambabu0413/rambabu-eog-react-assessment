import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Weather from '../Features/Weather/Weather';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

export default () => {
  const classes = useStyles();

  const name = "rambabu's";
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {name} EOG React Visualization Assessment
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Weather />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
