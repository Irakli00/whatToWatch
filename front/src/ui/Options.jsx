import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../contexts/AppContext";

function Options() {
  const { setValue } = useForm();
  const { movieQuestions, questionNum, setClientPreferences } =
    useContext(AppContext);

  const questionsToAsk = useContext(AppContext)["movieQuestions"];
  const options = movieQuestions[questionNum].questions.options;
  const currentQustion = questionsToAsk[questionNum].questions;

  console.log(currentQustion);

  console.log(currentQustion.followUps);

  const onSelect = (selectedOption) => {
    const key = movieQuestions[questionNum].key;
    setValue(key, selectedOption);
    setClientPreferences((p) => ({ ...p, [key]: selectedOption }));
  };

  return (
    <div className="flex flex-row gap-5 w-full">
      {options.map((el, i) => (
        <button
          key={i}
          type="submit"
          onClick={() => onSelect(el.value)}
          className="w-full px-8 py-5 text-2xl font-semibold bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          {el.text}
        </button>
      ))}
    </div>
  );
}

export default Options;
