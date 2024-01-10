import { memo, useState, useEffect } from "react";
import ClassSelector from "../components/ClassSelector";
import SubjectSelector from "../components/SubjectSelector";
import ChaptorsSelector from "../components/ChaptorsSelector";
import QuestionTypeSelector from "../components/QuestionTypeSelector";
import QuestionsTable from "../components/QuestionsTable";
import AddQuestionModal from "../components/AddQuestionModal";
import AddMcqsModal from "../components/AddMcqsModal";

const Questions = memo(() => {
  const [selectedClassId, setSelectedClassId] = useState<number>(
    parseInt(sessionStorage.getItem("questionClass") || "") || 0
  );
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(
    parseInt(sessionStorage.getItem("questionSubject") || "") || 0
  );
  const [selectedChapterId, setSelectedChapterId] = useState<number>(
    parseInt(sessionStorage.getItem("questionChapter") || "") || 0
  );
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<string>("multiple_choice");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("questionClass", selectedClassId.toString());
  }, [selectedClassId]);

  useEffect(() => {
    sessionStorage.setItem("questionSubject", selectedSubjectId.toString());
  }, [selectedSubjectId]);

  useEffect(() => {
    sessionStorage.setItem("questionChapter", selectedChapterId.toString());
  }, [selectedChapterId]);

  // use to clear the session storage when a user refresh the page.
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <div className="p-5">
      <h1>Questions</h1>
      <hr />
      <div className="row row-cols-1 row-cols-md-4 gap-md-0 mb-2">
        <ClassSelector
          selectedClassId={selectedClassId}
          setSelectedClassId={(classId) => {
            setSelectedClassId(classId);
            setSelectedSubjectId(0);
            setSelectedChapterId(0);
          }}
        />
        {selectedClassId !== 0 && (
          <SubjectSelector
            selectedSubjectId={selectedSubjectId}
            classId={selectedClassId}
            setSelectedSubjId={(subjId) => {
              setSelectedSubjectId(subjId);
              setSelectedChapterId(0);
            }}
          />
        )}
        {selectedSubjectId !== 0 && (
          <ChaptorsSelector
            selectedChapterId={selectedChapterId}
            subjId={selectedSubjectId}
            setSelectedChapterId={(chapterId) =>
              setSelectedChapterId(chapterId)
            }
          />
        )}
        {selectedChapterId !== 0 && (
          <QuestionTypeSelector
            setSelectedQuestionType={(questionType) =>
              setSelectedQuestionType(questionType)
            }
          />
        )}
      </div>
      {selectedSubjectId !== 0 && selectedChapterId !== 0 && (
        <>
          <button className="btn btn-success mb-2" onClick={handleShow}>
            Add New
          </button>
          <QuestionsTable
            subjId={selectedSubjectId}
            chapterId={selectedChapterId}
            questionType={selectedQuestionType}
          />
          {selectedQuestionType === "multiple_choice" ? (
            <AddMcqsModal
              preData={{
                type: selectedQuestionType,
                chapterId: selectedChapterId,
                subjectId: selectedSubjectId,
              }}
              isShow={showModal}
              handleClose={handleClose}
            />
          ) : (
            <AddQuestionModal
              preData={{
                type: selectedQuestionType,
                chapterId: selectedChapterId,
                subjectId: selectedSubjectId,
              }}
              isShow={showModal}
              handleClose={handleClose}
            />
          )}
        </>
      )}
    </div>
  );
});

export default Questions;
