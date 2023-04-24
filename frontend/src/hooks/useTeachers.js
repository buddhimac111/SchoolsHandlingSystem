import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import utils from "../utils";
import axios from "axios";

export default function useTeachers() {
  const [teachers, setTeachers] = useState();
  const { token, role } = useContext(AppContext);
  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/teachers",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        const newTeachers = [];
        for (const teacher of response.data) {
          config.url = utils.URI + "/api/teachers/" + teacher;
          const response = await axios.request(config);
          config.url = utils.URI + "/api/classes/" + response.data.classe;
          const classe = await axios.request(config);
          response.data.classe = `${classe.data.grade}-${classe.data.name}`;
          newTeachers.push(response.data);
        }
        setTeachers(newTeachers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, role]);
  return teachers;
}
