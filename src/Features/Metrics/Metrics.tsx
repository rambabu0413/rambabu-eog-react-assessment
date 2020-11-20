import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from './reducer';
import { Provider, createClient, Query } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Paper, Select, Input, MenuItem, makeStyles } from '@material-ui/core';

import InfoCard from './InfoCard';
import Chart from './Chart';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getMetricsQuery = `
    query {
        getMetrics
    }
`;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: '100vw',
    margin: theme.spacing(2),
  },
  select: {
    minWidth: '50%',
  },
  dFlexRowEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  m1: {
    marginTop: '2rem',
  },
  gridContentWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
}));

const Metrics = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedMetrics, setSelectedMetrics] = React.useState([]);

  useEffect(() => {
    if (selectedMetrics && selectedMetrics.length > 0) {
      dispatch(actions.updateSelectedMetrics(selectedMetrics));
    }
  }, [dispatch, selectedMetrics]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.dFlexRowEnd}>
          <Query query={getMetricsQuery}>
            {response => {
              const { fetching, data } = response;
              if (fetching) return <LinearProgress />;
              const { getMetrics } = data;
              return (
                <Select
                  name="select-metrics-name"
                  id="select-metrics"
                  multiple
                  value={selectedMetrics}
                  onChange={(event: any) => setSelectedMetrics(event.target.value)}
                  className={classes.select}
                  input={<Input />}
                >
                  {getMetrics.map((entity: any) => (
                    <MenuItem key={entity} value={entity}>
                      {entity}
                    </MenuItem>
                  ))}
                </Select>
              );
            }}
          </Query>
        </div>
        <div className={classes.m1}>
          <div className={classes.gridContentWrapper}>
            {selectedMetrics &&
              selectedMetrics.map(metric => {
                return <InfoCard title={metric} />;
              })}
          </div>
          <div>{selectedMetrics && selectedMetrics.length > 0 && <Chart />}</div>
        </div>
      </Paper>
    </div>
  );
};

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};
