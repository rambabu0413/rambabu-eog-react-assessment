import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardHeader } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Provider, createClient, useQuery } from 'urql';
import { IState } from '../../store';
import { actions } from './reducer';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const getLastKnownMeasurementQuery = `
    query($metricName: String!) {
        getLastKnownMeasurement(metricName: $metricName) {
            metric
            at
            value
            unit
        }
    }
`;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '4px',
    backgroundColor: '#42a5f5',
  },
}));

const InfoCard = (props: any) => {
  const { title } = props;
  const dispatch = useDispatch();
  const selectorData: any = useSelector((state: IState) => {
    const { selectedMetrics } = state.metrics;
    return {
      selectedMetrics,
    };
  });
  const classes = useStyles();
  const [result] = useQuery({
    query: getLastKnownMeasurementQuery,
    variables: {
      metricName: title,
    },
  });

  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.apiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getLastKnownMeasurement } = data;
    const actionPayload: any = {};
    actionPayload[title] = getLastKnownMeasurement;
    dispatch(actions.getLastKnownMeasurementResp(actionPayload));
  }, [dispatch, data, error, title]);

  const cardInfoData: any = selectorData && selectorData.selectedMetrics && selectorData.selectedMetrics[title];

  if (fetching) return <LinearProgress />;
  return (
    <React.Fragment>
      {cardInfoData && (
        <Provider value={client}>
          <Card className={classes.root}>
            <CardHeader title={cardInfoData.value} subheader={cardInfoData.metric} />
          </Card>
        </Provider>
      )}
    </React.Fragment>
  );
};

export default InfoCard;
