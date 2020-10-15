import React, {FC, useEffect, useState} from 'react';
import {Chart} from '@bit/primefaces.primereact.chart';

// StackOverflow: https://stackoverflow.com/questions/5092808/how-do-i-randomly-generate-html-hex-color-codes-using-javascript
const getRandomColor = (): string =>
  '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));

interface ChartDataSet {
  data: number[];
  backgroundColor: string[];
  hoverBackgroundColor: string[];
}

interface ChartData {
  labels: string[];
  datasets: ChartDataSet[];
}

const buildChartData = (history: HistoryData[]): ChartData => {
  const labels: string[] = [];
  const values: number[] = [];
  const colors: string[] = [];
  history.forEach(({text, value}) => {
    labels.push(text);
    values.push(value);
    colors.push(getRandomColor());
  });

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };
};

export interface HistoryData {
  text: string;
  value: number;
}

export interface HistoryChartProps {
  history: HistoryData[];
}

const HistoryChart: FC<HistoryChartProps> = ({history}) => {
    console.log(history);
  const [chartData, setChartData] = useState<ChartData>(
    buildChartData(history)
  );

  useEffect(() => {
    setChartData(buildChartData(history));
  }, [history]);

  return <Chart type="pie" data={chartData} />;
};

export default HistoryChart;