import React from "react";
import "./charts.scss";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
} from "chart.js";

const BarChart = ({ data }) => {
  return (
    <div className="chartBox p-4">
      <h5>Average Marks </h5>
      {!data.labels || data.labels.length === 0 ? (
        <h1>No Data</h1>
      ) : (
        <Bar options={options} data={data} />
      )}
    </div>
  );
};

export default BarChart;
Chart.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement
);

const options = {
  responsive: true,
  aspectRatio: 1.789,
  plugins: {
    legend: false,
  },
};
