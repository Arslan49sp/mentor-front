import useQuestions from "../hooks/useQuestions";
import McsqsTable from "./McsqsTable";

interface Props {
  subjId: number;
  chapterId: number;
  questionType: string;
}
const QuestionsTable = ({ subjId, chapterId, questionType }: Props) => {
  const { data, error, isLoading } = useQuestions(subjId);
  if (isLoading) return <p>Loading....</p>;
  if (error) return <p>{error.message}</p>;

  const allQuestions = data.data;
  const chapterQuestions = allQuestions.filter(
    (question) => question.chapter_id === chapterId
  );

  const mcqsQuestions = chapterQuestions.filter(
    (question) => question.type === "multiple_choice"
  );
  const blankQuestion = chapterQuestions.filter(
    (question) => question.type === "blanks"
  );
  const shortQuestion = chapterQuestions.filter(
    (question) => question.type === "short_question"
  );
  const longQuestion = chapterQuestions.filter(
    (question) => question.type === "long_question"
  );

  if (questionType === "multiple_choice")
    return <McsqsTable mcqs={mcqsQuestions} />;

  return <div>N/A</div>;
};

export default QuestionsTable;
