import React from 'react';
import { useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Provider, createClient, Query } from 'urql';

import { IState } from '../../store';
import AreaChart from './../../components/AreaChart';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
      metric
      measurements {
        at
        value
        metric
        unit
      }
    }
  }
  `;

const Chart = (props: any) => {
  const { multipleMeasurements, selectedMetrics } = useSelector((state: IState) => {
    const { multipleMeasurements, selectedMetrics } = state.metrics;
    return {
      multipleMeasurements,
      selectedMetrics
    };
  });
  const queryOptions = { input: multipleMeasurements };
  return (
    <Provider value={client}>
      {multipleMeasurements && multipleMeasurements.length > 0 && (
        <Query query={query} variables={queryOptions}>
          {queryState => {
            const { fetching, data } = queryState;
            if (fetching) return <LinearProgress />;
            const { getMultipleMeasurements } = data;

            return (
              <div>
                <AreaChart 
                  titleText="Metric Measurements" 
                  data={getMultipleMeasurements}
                  measurements={selectedMetrics} />
              </div>
            );
          }}
        </Query>
      )}
    </Provider>
  );
};

export default Chart;
