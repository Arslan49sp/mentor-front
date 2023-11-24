import { useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import "./questions.scss";
import { useEffect } from "react";
import { getClasses, getSubjects, getChapters } from "../../data/api";

const Questions = () => {
  //Fetch data and send to Single Component

  const [classes, setClasses] = useState();
  const [selectedClassId, setSelectedClassId] = useState();

  const [subjects, setSubjects] = useState();
  const [selectedSubjId, setSelectedSubjId] = useState();

  const [chapters, setChapters] = useState();
  const [selectedChapterId, setSelectedChapterId] = useState();

  // Get all the classes
  useEffect(() => {
    getClasses().then((result) => {
      setClasses(result.data.data);
    });
  }, []);

  // Get all the subjects
  useEffect(() => {
    if (selectedClassId != "Classes" && selectedClassId) {
      getSubjects(selectedClassId).then((result) => {
        setSubjects(result.data.data);
      });
    }
  }, [selectedClassId]);

  // Get all the chapters
  useEffect(() => {
    if (selectedSubjId != "Subjects" && selectedSubjId) {
      getChapters(selectedSubjId).then((result) => {
        setChapters(result.data.data);
      });
    }
  }, [selectedSubjId]);

  const handleClassChange = (e) => {
    setSelectedClassId(e.currentTarget.value);
  };

  const handleSubjectChange = (e) => {
    setSelectedSubjId(e.currentTarget.value);
  };

  const handleChapterChange = (e) => {
    setSelectedChapterId(e.currentTarget.value);
  };

  return (
    <div>
      <h1>Questions</h1>
      <hr />
      <div className="top-bar">
        <Dropdown
          label="Classes"
          options={classes}
          onChange={handleClassChange}
        />

        <Dropdown
          label="Subjects"
          options={subjects}
          onChange={handleSubjectChange}
        />

        <Dropdown
          label="Chapters"
          options={chapters}
          onChange={handleChapterChange}
        />
      </div>
    </div>
  );
};

export default Questions;
