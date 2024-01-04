import { useState } from "react";
import ClassSelector from "../components/ClassSelector";
import SubjectSelector from "../components/SubjectSelector";
import ChaptorsSelector from "../components/ChaptorsSelector";
import QuestionTypeSelector from "../components/QuestionTypeSelector";
import QuestionsTable from "../components/QuestionsTable";
import AddQuestionModal from "../components/AddQuestionModal";

const Questions = () => {
  const [selectedClassId, setSelectedClassId] = useState<number>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>();
  const [selectedChapterId, setSelectedChapterId] = useState<number>();
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<string>("multiple_choice");
  const [showModal, setShowModal] = useState(false);

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
      <div className="d-flex gap-2 mb-2">
        <ClassSelector
          setSelectedClassId={(classId) => setSelectedClassId(classId)}
        />
        {selectedClassId && (
          <SubjectSelector
            classId={selectedClassId}
            setSelectedSubjId={(subjId) => setSelectedSubjectId(subjId)}
          />
        )}
        {selectedSubjectId && (
          <ChaptorsSelector
            subjId={selectedSubjectId}
            setSelectedChapterId={(chapterId) =>
              setSelectedChapterId(chapterId)
            }
          />
        )}
        {selectedChapterId && (
          <QuestionTypeSelector
            setSelectedQuestionType={(questionType) =>
              setSelectedQuestionType(questionType)
            }
          />
        )}
      </div>
      {selectedSubjectId && selectedChapterId && (
        <>
          <button className="btn btn-success mb-2" onClick={handleShow}>
            Add New
          </button>
          <QuestionsTable
            subjId={selectedSubjectId}
            chapterId={selectedChapterId}
            questionType={selectedQuestionType}
          />
          <AddQuestionModal
            preData={{
              type: selectedQuestionType,
              chapterId: selectedChapterId,
              subjectId: selectedSubjectId,
            }}
            isShow={showModal}
            handleClose={handleClose}
          />
        </>
      )}
    </div>
  );
};

export default Questions;
