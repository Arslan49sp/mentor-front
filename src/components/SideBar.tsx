import Question from "../assets/question.svg";
import Education from "../assets/education.svg";
import Room from "../assets/building.svg";
import Book from "../assets/book.svg";
import Chapter from "../assets/chapter.svg";
import { Link, useLocation } from "react-router-dom";

interface Props {
  isClose: boolean;
  setIsClose: () => void;
}
const Sidebar = ({ isClose, setIsClose }: Props) => {
  const location = useLocation();

  return (
    <div className={isClose === false ? "sidebar" : "sidebar active"}>
      <div
        className={isClose === false ? "logoContainer" : "logoContainer active"}
      >
        <img src={Education} alt="icon" className="logo" />
        <h2 className="title">mentor </h2>
      </div>
      <div
        className={
          isClose === false ? "burgerContainer" : "burgerContainer active"
        }
      >
        <div className="burgerTrigger" onClick={() => setIsClose()}></div>
        <div className="burgerMenu"></div>
      </div>

      <div
        className={
          isClose === false ? "contentsContainer" : "contentsContainer active"
        }
      >
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <img src={Question} alt="dashboard" />
            <Link to="/">Questions</Link>
          </li>
          <li className={location.pathname === "/classes" ? "active" : ""}>
            <img src={Room} alt="classes" />
            <Link to="/classes">classes</Link>
          </li>
          <li className={location.pathname === "/subjects" ? "active" : ""}>
            <img src={Book} alt="Subject" />
            <Link to="/subjects">Subjects</Link>
          </li>
          <li className={location.pathname === "/chapters" ? "active" : ""}>
            <img src={Chapter} alt="chapters" />
            <Link to="/chapters">chapters</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
