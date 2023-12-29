import useQuestions from "../hooks/useQuestions";

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
    (question) => question.type === questionType
  );
  console.log(allQuestions);
  return <div>QuestionsTable</div>;
};

export default QuestionsTable;
