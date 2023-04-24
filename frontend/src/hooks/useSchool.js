import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import utils from "../utils";
import axios from "axios";

export default function useSchool() {
  const [School, setSchool] = useState();
  const { token, role } = useContext(AppContext);
  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/schools",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        const newSchool = [];
        for (const school of response.data) {
          config.url = utils.URI + "/api/schools/" + school;
          const response = await axios.request(config);
          newSchool.push(response.data);
        }
        setSchool(newSchool);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, role]);
  return School;
}
