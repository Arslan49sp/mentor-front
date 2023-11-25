import axios from "axios";

axios.defaults.baseURL = "http://15.207.247.8/api";

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

export { getClasses, getSubjects, getChapters, getQuestions };
