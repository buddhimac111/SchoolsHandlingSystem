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
import axios from "axios";
import AppContext from "../../appContext";
import utils from "../../utils";
import { useContext, useEffect, useState } from "react";

const BarChart = () => {
  const { token } = useContext(AppContext);
  const [labels, setLabels] = useState([]);
  const [marks, setMarks] = useState([]);
  const data = {
    labels,
    datasets: [
      {
        data: marks,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
      },
    ],
  };
  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/classes/marks/average",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setLabels(response.data.subjects);
        setMarks(response.data.marks);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, data]);
  return (
    <div className="chartBox p-4">
      <h5>Average Marks </h5>
      <Bar options={options} data={data} />
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
