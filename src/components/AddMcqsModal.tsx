import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ErrorToast from "./ErrorToast";
import useAddQuestion from "../hooks/useAddQuestion";
import { Question } from "../hooks/useQuestions";
import { addQuestionUrl } from "../data/api";

const schema = z.object({
  stem: z
    .string()
    .min(1, { message: "Statement should at least 3 characters" })
    .max(100, {
      message: "Statement should contain maximum of 100 characters",
    }),
  option_a: z
    .string()
    .min(1, { message: "Option should at least 1 characters" })
    .max(50, {
      message: "Option should contain maximum of 50 characters",
    }),
  option_b: z
    .string()
    .min(1, { message: "Option should at least 1 characters" })
    .max(50, {
      message: "Option should contain maximum of 50 characters",
    }),
  option_c: z
    .string()
    .min(1, { message: "Option should at least 1 characters" })
    .max(50, {
      message: "Option should contain maximum of 50 characters",
    }),
  option_d: z
    .string()
    .min(1, { message: "Option should at least 1 characters" })
    .max(50, {
      message: "Option should contain maximum of 50 characters",
    }),

  correct_answer: z.string(),
  explanation: z.string(),
});
export type QuestionFormData = z.infer<typeof schema>;

interface PreData {
  subjectId: number;
  chapterId: number;
  type: string;
}

interface Props {
  preData: PreData;
  handleClose: () => void;
  isShow: boolean;
  currentChapter?: Question | null;
  slug?: string;
}
const AddMcqsModal = ({
  preData,
  handleClose,
  isShow,
  currentChapter,
  slug,
}: Props) => {
  const [showToast, setShowToast] = useState(true);
  //It's a useform hook which provide us different functionalities for handling form.
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<QuestionFormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (currentChapter) {
      Object.entries(currentChapter).forEach(([key, value]) => {
        value && setValue(key as "stem", value);
      });
    }
  }, [currentChapter, setValue]);
  const CACHE_KEY_QUESTIONS = ["subject", preData.subjectId, "questions"];
  const onAdd = () => {
    reset();
    handleClose();
  };

  let url;
  currentChapter
    ? (url = addQuestionUrl + "/" + currentChapter.id)
    : (url = addQuestionUrl);
  //mutaion hook
  const addQuestion = useAddQuestion(
    onAdd,
    CACHE_KEY_QUESTIONS,
    url,
    slug,
    currentChapter?.id
  );

  return (
    <>
      <Modal
        centered
        show={isShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{slug ? slug : "Add new"} question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit((data) => {
              setShowToast(true);
              const chapterData = {
                type: preData.type,
                chapter_id: preData.chapterId,
                ...data,
              };
              console.log(chapterData);
              addQuestion.mutate(chapterData);
            })}
          >
            <div className="mb-3">
              <label htmlFor="statement">Statement</label>
              <input
                {...register("stem")}
                id="statement"
                type="text"
                className="form-control"
              />
              {errors.stem && (
                <p className="text-danger">{errors.stem.message} </p>
              )}
            </div>

            <div className="container-fluid p-0">
              <div className="row mb-1">
                <div className="col">
                  <label htmlFor="optionA">Option A</label>
                  <input
                    {...register("option_a")}
                    id="optionA"
                    type="text"
                    className="form-control"
                  />
                  {errors.option_a && (
                    <p className="text-danger">{errors.option_a.message} </p>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="optionB">Option B</label>
                  <input
                    {...register("option_b")}
                    id="optionB"
                    type="text"
                    className="form-control"
                  />
                  {errors.option_b && (
                    <p className="text-danger">{errors.option_b.message} </p>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="optionC">Option C</label>
                  <input
                    {...register("option_c")}
                    id="optionC"
                    type="text"
                    className="form-control"
                  />
                  {errors.option_c && (
                    <p className="text-danger">{errors.option_c.message} </p>
                  )}
                </div>
                <div className="col">
                  <label htmlFor="optionD">Option D</label>
                  <input
                    {...register("option_d")}
                    id="optionD"
                    type="text"
                    className="form-control"
                  />
                  {errors.option_d && (
                    <p className="text-danger">{errors.option_d.message} </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="answer">Answer</label>
              <input
                {...register("correct_answer")}
                id="answer"
                type="string"
                className="form-control"
              />
              {errors.correct_answer && (
                <p className="text-danger">{errors.correct_answer.message} </p>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="explaination">Explaination</label>
              <textarea
                {...register("explanation")}
                id="explaination"
                rows={3}
                className="form-control"
              />
              {errors.explanation && (
                <p className="text-danger">{errors.explanation.message} </p>
              )}
            </div>
            <button className="btn btn-primary">
              {slug ? slug : "Submit"}
            </button>
          </form>
          {addQuestion.error && (
            <ErrorToast
              isShow={showToast}
              handleClose={() => setShowToast(false)}
              message={addQuestion.error.message}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddMcqsModal;
