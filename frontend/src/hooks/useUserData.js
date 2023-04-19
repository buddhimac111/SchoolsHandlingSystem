import { useState, useEffect } from "react";
import axios from "axios";
import utils from "../utils";

export default function useUserData(token, role, navigate) {
  const [user, setUser] = useState({});
  const [school, setSchool] = useState({});
  const [classe, setClasse] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (!token || !role) return;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        "x-auth-token": token,
      },
    };
    config.url = `${utils.URI}/api/users/me`;
    axios
      .request(config)
      .then((response) => {
        response.data.role =
          response.data.role === "dAdmin"
            ? "Divisional Admin"
            : response.data.role === "sAdmin"
            ? "School Admin"
            : response.data.role === "teacher"
            ? "Teacher"
            : "restrict";
        const newUser = {
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          id: response.data._id,
          picture: response.data.picture,
        };
        setUser(newUser);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
    if (role === "teacher") {
      config.url = `${utils.URI}/api/classes/me`;
      axios
        .request(config)
        .then((response) => {
          const newClasse = {
            grade: response.data.grade,
            name: response.data.name,
            studentCount: response.data.studentCount,
            year: response.data.year,
          };
          setClasse(newClasse);
        })
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
    }
    if (role !== "dAdmin") {
      config.url = `${utils.URI}/api/schools/me`;
      axios
        .request(config)
        .then((response) => {
          const newSchool = {
            name: response.data.name,
            address: response.data.address,
            picture: response.data.picture,
            studentCount: response.data.studentCount,
            teacherCount: response.data.teacherCount,
          };
          setSchool(newSchool);
        })
        .catch((error) => {
          console.log(error);
          navigate("/");
        });
    }
    config.url = `${utils.URI}/api/${
      role === "sAdmin"
        ? "SchoolAdmins"
        : role === "dAdmin"
        ? "divisionalAdmins"
        : "teachers"
    }/me`;
    axios
      .request(config)
      .then((response) => {
        const newProfile = {
          address: response.data.address,
          dob: response.data.DOB,
          major: response.data.major,
        };
        setProfile(newProfile);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }, [navigate, role, token]);
  return { user, school, classe, profile };
}
