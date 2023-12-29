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
            <Link className="img" to="/">
              <img src={Question} alt="dashboard" />
            </Link>
            <Link to="/">Questions</Link>
          </li>
          <li className={location.pathname === "/classes" ? "active" : ""}>
            <Link className="img" to="/classes">
              <img src={Room} alt="classes" />
            </Link>
            <Link to="/classes">classes</Link>
          </li>
          <li className={location.pathname === "/subjects" ? "active" : ""}>
            <Link className="img" to="/subjects">
              <img src={Book} alt="Subject" />
            </Link>
            <Link to="/subjects">Subjects</Link>
          </li>
          <li className={location.pathname === "/chapters" ? "active" : ""}>
            <Link className="img" to="/chapters">
              <img src={Chapter} alt="chapters" />
            </Link>
            <Link to="/chapters">chapters</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
