import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import utils from "../utils";
import axios from "axios";

export default function useStudents() {
  const [students, setStudents] = useState();
  const { token, role } = useContext(AppContext);
  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        utils.URI +
        (role === "teacher" ? "/api/students/class" : "/api/schools/students"),
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        const newStudents = [];
        for (const student of response.data) {
          config.url = utils.URI + "/api/students/" + student;
          const response = await axios.request(config);
          newStudents.push(response.data);
        }
        setStudents(newStudents);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, role]);
  return students;
}
