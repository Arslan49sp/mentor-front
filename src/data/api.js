import axios from "axios";

axios.defaults.baseURL = "http://13.232.222.199/api";

const getClasses = async () => {
  const url = "/academic-classes";
  return await axios.get(url);
};

const getSubjects = async (classId) => {
  const url = `/academic-subjects?classId=${classId}`;
  return await axios.get(url);
};

const getChapters = async (subjId) => {
  const url = `/chapters?subjectId=${subjId}`;
  return await axios.get(url);
};

const getQuestions = async (id) => {
  const url = `/questions?subjectId=${id}`;
  return await axios.get(url);
};
const deleteQuestion = async (id) => {
  const url = `/questions/${id}`;
  return await axios.delete(url);
};

export { getClasses, getSubjects, getChapters, getQuestions, deleteQuestion };
