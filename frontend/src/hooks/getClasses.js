import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import axios from "axios";
import utils from "../utils";

export default function GetClasses() {
  const { token } = useContext(AppContext);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/classes",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        const newClasses = [];
        for (const data of response.data) {
          config.url = utils.URI + "/api/classes" + "/" + data;
          const classData = await axios.request(config);
          newClasses.push(classData.data);
        }
        setClasses(newClasses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);
  return classes;
}
