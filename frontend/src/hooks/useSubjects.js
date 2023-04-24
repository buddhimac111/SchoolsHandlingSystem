import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import axios from "axios";
import utils from "../utils";

export default function useSubjects() {
  const { token } = useContext(AppContext);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/subjects",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        const newSubjects = [];
        for (const data of response.data) {
          newSubjects.push(data._id);
        }
        setSubjects(newSubjects);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  return subjects;
}
