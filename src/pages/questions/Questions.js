import { useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import "./questions.scss";
import { useEffect } from "react";
import { getCountries, getState } from "../../data/api";

const Questions = () => {
  //Fetch data and send to Single Component

  const [countries, setCountries] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryStates, setCountryStates] = useState();
  const [selectedState, setSelectedState] = useState();

  useEffect(() => {
    getCountries().then((result) => {
      setCountries(result.data.data);
    });
  }, []);

  useEffect(() => {
    if (selectedCountry !== "Country" && selectedCountry) {
      getState(selectedCountry).then((result) => {
        setCountryStates(result.data.data.states);
      });
    }
  }, [selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.currentTarget.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.currentTarget.value);
  };

  return (
    <div className="top-bar">
      Questions
      <Dropdown
        label="Country"
        options={countries}
        onChange={handleCountryChange}
      />
      <Dropdown
        label="States"
        options={countryStates}
        onChange={handleStateChange}
      />
    </div>
  );
};

export default Questions;
