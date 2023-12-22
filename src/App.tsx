import "./App.css";
import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Questions from "./pages/Questions";
import Chapters from "./pages/Chapters";
import Classes from "./pages/Classes";
import Sidebar from "./components/SideBar";
import Subjects from "./pages/Subjects";
function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Questions />} />
          <Route path="/chapters" element={<Chapters />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/classes" element={<Classes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
