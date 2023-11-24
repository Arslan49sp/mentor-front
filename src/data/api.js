import axios from "axios";

axios.defaults.baseURL = "https://countriesnow.space/api/v0.1/countries";

const getCountries = async () => {
  const url = "/positions";
  return await axios.get(url);
};

const getState = async (country) => {
  const url = `/states/q?country=${country}`;
  return await axios.get(url);
};

const getCities = async (country, state) => {
  const url = `/state/cities/q?country=${country}&state=${state}`;
  return await axios.get(url);
};

export { getCountries, getState, getCities };
