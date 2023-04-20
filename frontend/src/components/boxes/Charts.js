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
import { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import AppContext from "../../appContext";
import axios from "axios";

const Chart = () => {
  const { token } = useContext(AppContext);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const data = {
    labels,
    datasets,
  };
  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/teachers/progress",
      headers: {
        "x-auth-token": token,
      },
    };

    axios
      .request(config)
      .then((response) => {
        setLabels(response.data[0].subjects);
        let newDataset = [];
        let colors = [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ];
        response.data.map((item) => {
          newDataset.push({
            label: "Term-" + item._id,
            data: item.marks,
            borderColor: colors[item._id - 1],
            backgroundColor: colors[item._id - 1],
            borderWidth: 2,
          });
          setDatasets(newDataset);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="chartBox p-4">
      <h5>Average Marks Distribution </h5>
      <Line options={options} data={data} />
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
