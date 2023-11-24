import axios from "axios";

// axios.defaults.baseURL = "https://countriesnow.space/api/v0.1/countries";
axios.defaults.baseURL = "http://15.207.247.8/api";

const getClasses = async () => {
  const url = "/academic-classes";
  return await axios.get(url);
};

const getSubjects = async (classId) => {
  const url = `/academic-subjects?classId=${classId}`;
  return await axios.get(url);
};

export { getClasses, getSubjects };
