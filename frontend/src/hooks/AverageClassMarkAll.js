import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import axios from "axios";

export default function AverageClassMarkAll() {
  const { token } = useContext(AppContext);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
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
        let newChartData = { labels: [], datasets: [] };
        let colors = [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ];
        newChartData.datasets = response.data.map((item) => {
          return {
            label: "Term-" + item._id,
            data: item.marks,
            borderColor: colors[item._id - 1],
            backgroundColor: colors[item._id - 1],
            borderWidth: 2,
          };
        });
        newChartData.labels = response.data[0].subjects;
        setChartData(newChartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  return chartData;
}
