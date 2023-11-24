import { useState } from "react";
import Dropdown from "../../components/dropdown/Dropdown";
import "./questions.scss";
import { useEffect } from "react";
import { getClasses } from "../../data/api";

const Questions = () => {
  //Fetch data and send to Single Component

  const [classes, setClasses] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [countryStates, setCountryStates] = useState();

  useEffect(() => {
    getClasses().then((result) => {
      setClasses(result.data.data);
    });
  }, []);

  // useEffect(() => {
  //   if (selectedCountry !== "Country" && selectedCountry) {
  //     getState(selectedCountry).then((result) => {
  //       setCountryStates(result.data.data.states);
  //     });
  //   }
  // }, [selectedCountry]);

  const handleClassChange = (e) => {
    console.log(e.currentTarget.value);
  };

  return (
    <div className="top-bar">
      Questions
      <Dropdown
        label="Classes"
        options={classes}
        onChange={handleClassChange}
      />
    </div>
  );
};

export default Questions;
