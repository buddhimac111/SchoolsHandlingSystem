import { useContext, useEffect, useState } from "react";
import AppContext from "../appContext";
import utils from "../utils";
import axios from "axios";

export default function useSAdmin() {
  const [SAdmin, setSAdmin] = useState();
  const { token, role } = useContext(AppContext);
  useEffect(() => {
    if (!token) return;
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: utils.URI + "/api/schoolAdmins",
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .request(config)
      .then(async (response) => {
        const newSAdmin = [];
        for (const SAdmin of response.data) {
          config.url = utils.URI + "/api/schoolAdmins/" + SAdmin;
          const response = await axios.request(config);
          newSAdmin.push(response.data);
        }
        setSAdmin(newSAdmin);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token, role]);
  return SAdmin;
}
