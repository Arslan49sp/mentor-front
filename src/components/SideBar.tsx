import { useState } from "react";
import Question from "../assets/question.svg";
import Education from "../assets/education.svg";
import Room from "../assets/building.svg";
import Book from "../assets/book.svg";
import Chapter from "../assets/chapter.svg";

import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
      <div
        className={
          closeMenu === false ? "logoContainer" : "logoContainer active"
        }
      >
        <img src={Education} alt="icon" className="logo" />
        <h2 className="title">mentor </h2>
      </div>
      <div
        className={
          closeMenu === false ? "burgerContainer" : "burgerContainer active"
        }
      >
        <div
          className="burgerTrigger"
          onClick={() => {
            handleCloseMenu();
          }}
        ></div>
        <div className="burgerMenu"></div>
      </div>

      <div
        className={
          closeMenu === false ? "contentsContainer" : "contentsContainer active"
        }
      >
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <img src={Question} alt="dashboard" />
            <a href="/">Questions</a>
          </li>
          <li className={location.pathname === "/classes" ? "active" : ""}>
            <img src={Room} alt="classes" />
            <a href="/classes">classes</a>
          </li>
          <li className={location.pathname === "/subjects" ? "active" : ""}>
            <img src={Book} alt="Subject" />
            <a href="/subjects">Subjects</a>
          </li>
          <li className={location.pathname === "/chapters" ? "active" : ""}>
            <img src={Chapter} alt="chapters" />
            <a href="/chapters">chapters</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
