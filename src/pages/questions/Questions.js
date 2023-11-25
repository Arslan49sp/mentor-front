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

  // Get all the classes
  useEffect(() => {
    setQuestions([]);
    getClasses().then((result) => {
      setClasses(result.data.data);
    });
  }, [addedItem]);

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
  }, [selectedClassId, addedItem]);

  // Get all the chapters
  useEffect(() => {
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
    if (selectedSubjId !== "Subjects" && selectedSubjId) {
      getQuestions(selectedSubjId).then((result) => {
        setQuestions(result.data.data);
      });
    }
  }, [selectedSubjId]);

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
    } else setSelectedChapterId(id);
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
          onClick={() => setOpen(true)}
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
    </div>
  );
};

export default Questions;
