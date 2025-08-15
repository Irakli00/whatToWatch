import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useForm } from "react-hook-form";

function MediaForm({ questionsType = "movieQuestions" }) {
  const { questionNum, setQuestionNum, setClientPreferences } =
    useContext(AppContext);
  const [qToAsk, setQToAsk] = useState(
    useContext(AppContext)[questionsType] // dynamically get questions
  );
  const [followUpNum, setFollowUpNum] = useState(-1);

  const key = qToAsk[questionNum].key;
  const currentQ = qToAsk[questionNum].questions;
  const label = currentQ.questionText;
  const options = currentQ.options;
  const { register, handleSubmit } = useForm();

  function onSubmit() {
    // setValue(key, selectedOption);
    return;
  }
  function onSelect(selectedOption, optionIndex) {
    setClientPreferences((p) => ({ ...p, [key]: selectedOption }));

    const selectedOptionObj = currentQ.options[optionIndex];

    setQuestionNum((p) => (p < qToAsk.length - 1 ? p + 1 : p));

    if (selectedOptionObj.followUps) {
      setQToAsk((p) => [
        ...p.slice(0, questionNum + 1), // Everything before insertion point
        ...selectedOptionObj.followUps, // Insert follow-ups here
        ...p.slice(questionNum + 1), // Everything after insertion point
      ]);
    }
    console.log(qToAsk, questionNum);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-[20dvh] items-center gap-8 p-10 bg-white rounded-2xl shadow-lg"
    >
      <label
        htmlFor="selectedOption"
        className="text-3xl font-bold text-gray-900 text-center"
      >
        {label}
      </label>
      <div className="flex flex-row gap-5 w-full">
        {options.map((el, i) => (
          <button
            key={i}
            type="submit"
            onClick={() => onSelect(el.value, i)}
            className="w-full px-8 py-5 text-2xl font-semibold bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            {el.text}
          </button>
        ))}
      </div>
      <input type="hidden" {...register(key)} />
    </form>
  );
}
export default MediaForm;
