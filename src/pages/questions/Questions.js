import { useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import "./questions.scss";
import { useEffect } from "react";
import {
  getClasses,
  getSubjects,
  getChapters,
  getQuestions,
} from "../../data/api";
import DataTable from "../../components/dataTable/DataTable";
import { mcqsColumns } from "../../data/data";

const Questions = () => {
  //Fetch data and send to Single Component

  const [classes, setClasses] = useState();
  const [selectedClassId, setSelectedClassId] = useState();

  const [subjects, setSubjects] = useState();
  const [selectedSubjId, setSelectedSubjId] = useState();

  const [chapters, setChapters] = useState();
  const [selectedChapterId, setSelectedChapterId] = useState();

  const [questions, setQuestions] = useState([]);

  // Get all the classes
  useEffect(() => {
    setQuestions([]);
    getClasses().then((result) => {
      setClasses(result.data.data);
    });
  }, []);

  // Get all the subjects
  useEffect(() => {
    setQuestions([]);
    setChapters([]);
    setSubjects([]);

    if (selectedClassId != "Classes" && selectedClassId) {
      getSubjects(selectedClassId).then((result) => {
        setSubjects(result.data.data);
      });
    }
  }, [selectedClassId]);

  // Get all the chapters
  useEffect(() => {
    setQuestions([]);
    setChapters([]);
    if (selectedSubjId !== "Subjects" && selectedSubjId) {
      getChapters(selectedSubjId).then((result) => {
        setChapters(result.data.data);
      });
    }
  }, [selectedSubjId]);

  // Get all the Questions
  useEffect(() => {
    if (selectedSubjId !== "Subjects" && selectedSubjId) {
      getQuestions(selectedSubjId).then((result) => {
        setQuestions(result.data.data);
      });
    }
  }, [selectedSubjId]);

  const handleClassChange = (e) => {
    let id = e.currentTarget.value;
    if (id == 0) {
      console.log("ready to add ." + id);
    } else setSelectedClassId(id);
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
      {questions.length === 0 ? (
        <></>
      ) : (
        <DataTable slug="questions" columns={mcqsColumns} rows={questions} />
      )}
    </div>
  );
};

export default Questions;
