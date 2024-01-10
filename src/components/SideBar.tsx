import Question from "../assets/question.svg";
import Education from "../assets/education.svg";
import Room from "../assets/building.svg";
import Book from "../assets/book.svg";
import Chapter from "../assets/chapter.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  isClose: boolean;
  setIsClose: () => void;
}

const Sidebar = ({ isClose, setIsClose }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateWithState = (path: string, state: any) => {
    navigate(path, { state });
  };

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
            <Link className="img" to="/" onClick={() => setIsClose()}>
              <img src={Question} alt="dashboard" />
            </Link>
            <Link to="/" onClick={() => navigateWithState("/", location.state)}>
              Questions
            </Link>
          </li>
          <li className={location.pathname === "/classes" ? "active" : ""}>
            <Link className="img" to="/classes" onClick={() => setIsClose()}>
              <img src={Room} alt="classes" />
            </Link>
            <Link
              to="/classes"
              onClick={() => navigateWithState("/classes", location.state)}
            >
              Classes
            </Link>
          </li>
          <li className={location.pathname === "/subjects" ? "active" : ""}>
            <Link className="img" to="/subjects" onClick={() => setIsClose()}>
              <img src={Book} alt="Subject" />
            </Link>
            <Link
              to="/subjects"
              onClick={() => navigateWithState("/subjects", location.state)}
            >
              Subjects
            </Link>
          </li>
          <li className={location.pathname === "/chapters" ? "active" : ""}>
            <Link className="img" to="/chapters" onClick={() => setIsClose()}>
              <img src={Chapter} alt="chapters" />
            </Link>
            <Link
              to="/chapters"
              onClick={() => navigateWithState("/chapters", location.state)}
            >
              Chapters
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
