import { createSlice, PayloadAction } from 'redux-starter-kit';
import _ from 'underscore';

export type MatricsList = [];
export type Measurement = {
  metric: String;
  at: Number;
  value: Number;
  unit: String;
};

export type ApiErrorAction = {
  error: string;
};

const initialState = {
  options: Array<any>(),
  metricsMeasurement: [],
  selectedMetrics: {},
  multipleMeasurements: Array<any>(),
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    getMetricsDataRecevied: (state, action: PayloadAction<MatricsList>) => {
      state.options = action.payload;
    },
    getLastKnownMeasurementResp: (state, action: PayloadAction<Measurement>) => {
      const knownMeasurementStates = { ...state.selectedMetrics, ...action.payload };
      const multiMeasures = Array<any>();
      Object.values(knownMeasurementStates).forEach((entity: any) => {
        const dt = new Date();
        multiMeasures.push({
          metricName: entity.metric,
          before: new Date().getTime(),
          after: new Date(dt.getFullYear(), dt.getMonth(), 1).getTime(),
        });
      });
      state.multipleMeasurements = multiMeasures;
      state.selectedMetrics = knownMeasurementStates;
    },
    updateSelectedMetrics: (state, action: PayloadAction<any>) => {
      const selectedMetrics = action.payload;
      const multiMeasures = _.filter(state.multipleMeasurements, (measure) => {
        return selectedMetrics.indexOf(measure.metricName) > -1;
      });
      state.multipleMeasurements = multiMeasures;
    },
    apiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
