import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import axios from "axios";
import utils from "../utils";

export default function AverageSchoolMarks() {
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
      url: utils.URI + "/api/schools/averageMarks",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then((response) => {
        const newChartData = {
          labels: response.data.subjects,
          datasets: [
            {
              data: response.data.marks,
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
        setChartData(newChartData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  return chartData;
}
