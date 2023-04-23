import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import axios from "axios";

export default function SchoolRank() {
  const { token } = useContext(AppContext);
  // eslint-disable-next-line
  const template = {
    labels: [
      "0-10",
      "10-20",
      "20-30",
      "30-40",
      "40-50",
      "50-60",
      "60-70",
      "70-80",
      "80-90",
      "90-100",
    ],
    datasets: [
      {
        label: "Average Student Marks",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 1)",
        borderWidth: 2,
      },
    ],
  };
  const [chartData, setChartData] = useState({ ...template });
  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/schoolAdmins/averages",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then((response) => {
        let newChartData = {
          labels: [
            "0-10",
            "10-20",
            "20-30",
            "30-40",
            "40-50",
            "50-60",
            "60-70",
            "70-80",
            "80-90",
            "90-100",
          ],
          datasets: [
            {
              label: "Average Student Marks",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              borderColor: "rgba(255, 206, 86, 1)",
              backgroundColor: "rgba(255, 206, 86, 1)",
              borderWidth: 2,
            },
          ],
        };
        for (const item of response.data) {
          newChartData.datasets[0].data[item.range / 10] = item.count;
        }
        setChartData(newChartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  return chartData;
}
