import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import axios from "axios";
import utils from "../utils";

export default function useExams() {
  const { token } = useContext(AppContext);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/exams/class",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        const newExams = [];
        for (const exam of response.data) {
          config.url = utils.URI + "/api/students/" + exam.student;
          const student = await axios.request(config);
          exam.name = student.data.name;
          newExams.push(exam);
        }
        setExams(newExams);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  return exams;
}
