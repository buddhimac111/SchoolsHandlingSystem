import "./widget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

export const Widget = ({ type, value, title }) => {
  let data;

  switch (type) {
    case "student":
      data = {
        title,
        count: value,
        icon: <FontAwesomeIcon icon={faUserGraduate} />,
      };
      break;

    case "teacher":
      data = {
        title,
        count: value,
        icon: <FontAwesomeIcon icon={faChalkboardTeacher} />,
      };
      break;

    case "subject":
      data = {
        title,
        count: value,
        icon: <FontAwesomeIcon icon={faBookOpen} />,
      };
      break;

    case "rank":
      data = {
        title,
        count: value,
        icon: <FontAwesomeIcon icon={faMedal} />,
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.count}</span>
      </div>
      <div className="right">
        <div className="icons">{data.icon}</div>
      </div>
    </div>
  );
};
