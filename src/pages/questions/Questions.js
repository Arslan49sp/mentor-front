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
import {
  mcqsColumns,
  classColumns,
  baseURL,
  subjectColumns,
  storeChapterCol,
} from "../../data/data";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
import { stepClasses } from "@mui/material";

const Questions = () => {
  //Fetch data and send to Single Component
  const [open, setOpen] = useState(false);
  const [addType, setAddType] = useState("");
  const [addedItem, setAddedItem] = useState("");

  const [classes, setClasses] = useState();
  const [selectedClassId, setSelectedClassId] = useState();

  const [subjects, setSubjects] = useState();
  const [selectedSubjId, setSelectedSubjId] = useState();
  const [addSubjData, setAddSubjData] = useState({});

  const [chapters, setChapters] = useState();
  const [selectedChapterId, setSelectedChapterId] = useState();
  const [addChapterData, setAddChapterData] = useState();

  const [questions, setQuestions] = useState([]);
  const [chapterQuestions, setChapterQuestions] = useState({});

  const [addMcqsData, setAddMcqsData] = useState({});

  // Get all the classes
  useEffect(() => {
    setAddedItem("");
    setQuestions([]);
    getClasses().then((result) => {
      setClasses(result.data.data);
    });
  }, [addedItem]);

  // Get all the subjects
  useEffect(() => {
    setChapterQuestions([]);
    setQuestions([]);
    setChapters([]);
    setSubjects([]);
    setAddedItem("");

    if (selectedClassId != "Classes" && selectedClassId) {
      getSubjects(selectedClassId).then((result) => {
        setSubjects(result.data.data);
      });
    }
  }, [selectedClassId, addedItem]);

  // Get all the chapters
  useEffect(() => {
    setChapterQuestions([]);
    setAddedItem("");
    setQuestions([]);
    setChapters([]);
    if (selectedSubjId !== "Subjects" && selectedSubjId) {
      getChapters(selectedSubjId).then((result) => {
        setChapters(result.data.data);
      });
    }
  }, [selectedSubjId, addedItem]);

  // Get all the Questions
  useEffect(() => {
    setAddedItem("");
    if (selectedSubjId !== "Subjects" && selectedSubjId) {
      getQuestions(selectedSubjId).then((result) => {
        setQuestions(result.data.data);
      });
    }
  }, [selectedSubjId, addedItem]);

  const handleClassChange = (e) => {
    let id = e.currentTarget.value;
    if (id == 0) {
      setAddType("class");
    } else setSelectedClassId(id);
  };

  const handleSubjectChange = (e) => {
    let id = e.currentTarget.value;
    if (id == 0 && selectedClassId !== 0 && selectedClassId) {
      setAddSubjData({
        academic_class_id: selectedClassId,
      });
      setAddType("subject");
    } else setSelectedSubjId(id);
  };

  const handleChapterChange = (e) => {
    let id = e.currentTarget.value;
    if (id == 0 && selectedSubjId !== 0 && selectedSubjId) {
      setAddChapterData({
        academic_subject_id: selectedSubjId,
      });
      setAddType("chapter");
    } else {
      setSelectedChapterId(id);
      setChapterQuestions(
        questions.filter((question) => question.chapter_id == id)
      );
    }
  };

  return (
    <div>
      <h1>Questions</h1>
      <hr />
      <div className="top-bar">
        <Dropdown
          label="Classes"
          value={selectedClassId}
          options={classes}
          onChange={handleClassChange}
          onClick={() => setOpen(true)}
        />

        <Dropdown
          label="Subjects"
          value={selectedSubjId}
          options={subjects}
          onChange={handleSubjectChange}
        />

        <Dropdown
          label="Chapters"
          value={selectedChapterId}
          options={chapters}
          onChange={handleChapterChange}
        />
      </div>
      {selectedChapterId ? (
        <>
          <div className="info">
            <h2>MCQS</h2>
            <button
              onClick={() => {
                if (selectedChapterId && setSelectedChapterId !== 0) {
                  {
                    setAddMcqsData({
                      chapter_id: selectedChapterId,
                      type: "multiple_choice",
                    });
                    setAddType("question");
                    setOpen(true);
                  }
                } else alert("Please choose a chapter first...");
              }}
            >
              Add New
            </button>
          </div>
          <DataTable
            slug="questions"
            columns={mcqsColumns}
            rows={chapterQuestions}
          />
        </>
      ) : (
        <>
          <p>Please choose class subject and then chapter</p>
        </>
      )}

      <>
        {open && (
          <Add
            slug="question"
            columns={mcqsColumns}
            setOpen={setOpen}
            setAddType={setAddType}
            setAddedItem={setAddedItem}
            url={baseURL + "/questions"}
            data={addMcqsData}
          />
        )}
        {addType === "class" && (
          <Add
            slug="Class"
            columns={classColumns}
            setOpen={setOpen}
            setAddType={setAddType}
            setAddedItem={setAddedItem}
            url={baseURL + "/academic-classes"}
            data={{}}
          />
        )}

        {addType === "subject" && (
          <Add
            slug="Subject"
            columns={subjectColumns}
            setOpen={setOpen}
            setAddType={setAddType}
            setAddedItem={setAddedItem}
            url={baseURL + "/academic-subjects"}
            data={addSubjData}
          />
        )}
        {addType === "chapter" && (
          <Add
            slug="Chapter"
            columns={storeChapterCol}
            setOpen={setOpen}
            setAddType={setAddType}
            setAddedItem={setAddedItem}
            url={baseURL + "/chapters"}
            data={addChapterData}
          />
        )}
      </>
    </div>
  );
};

export default Questions;
