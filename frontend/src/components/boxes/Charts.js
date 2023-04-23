import "./charts.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const Chart = ({ data }) => {
  return (
    <div className="chartBox p-4">
      <h5>Average Marks Distribution </h5>
      {data.datasets.length === 0 ? (
        <h1>No Data</h1>
      ) : (
        <Line options={options} data={data} />
      )}
    </div>
  );
};

export default Chart;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  aspectRatio: 1.789,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
