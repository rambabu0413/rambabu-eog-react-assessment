import React from 'react';
import _ from 'underscore';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export type Options = {
  titleText: String;
  data: Array<any>;
  measurements: {};
};

const AreaChart = (props: Options) => {
  const { titleText, data, measurements } = props;
  const seriesList: any = [];
  const yAxisList: any = [];
  data.forEach((item: any) => {
    const seriesData: any = [];
    _.map(item.measurements, entity => {
      seriesData.push(entity.value);
    });
    seriesList.push({
      type: 'area',
      name: item.metric,
      data: seriesData,
    });
    let yAxisEntity: any = {};
    _.findKey(measurements, (value, key) => {
        if (key === item.metric) {
            yAxisEntity = value;
        }
    });
    yAxisList.push({
      labels: {
        format: '{value}',
        style: {
          color: [0, '#f44336'],
        },
      },
      title: {
        text: `${item.metric} (${yAxisEntity.unit})`,
      },
    });
  });

  const chartOptions = {
    chart: {
      zoomType: 'x',
    },
    title: {
      text: titleText,
    },
    xAxis: {
      type: 'timeline',
    },
    yAxis: yAxisList,
    legend: {
      enabled: false,
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [[0, '#673ab7'], [1, '#03a9f4'], [2, '#4caf50'], [3, '#ffeb3b'], [4, '#ff5722'], [5, '#607d8b']],
        },
        marker: {
          radius: 2,
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1,
          },
        },
        threshold: null,
      },
    },
    series: seriesList,
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default AreaChart;
