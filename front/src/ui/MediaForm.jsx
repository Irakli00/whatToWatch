import { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { QuestionsContext } from "../contexts/QuestionsContext";

function MediaForm({ questionsType }) {
  const { questionNum, setQuestionNum } = useContext(QuestionsContext);
  const { setClientMoviePreferences, setClientAnimePreferences } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [qToAsk, setQToAsk] = useState(
    useContext(QuestionsContext)[questionsType] // dynamically get questions
  );

  const key = qToAsk[questionNum].key;
  const currentQ = qToAsk[questionNum].questions;
  const label = currentQ.questionText;
  const options = currentQ.options;
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setQuestionNum(0);
  }, [questionsType, setQuestionNum]); //q type detector

  const contextValue = useContext(QuestionsContext);
  useEffect(() => {
    setQToAsk(contextValue[questionsType] || []);
  }, [questionsType, contextValue]);

  async function onSubmit() {
    navigate("/recomendations");
  }

  function onSelect(selectedOption, optionIndex) {
    if (questionsType === "movieQuestions") {
      setClientMoviePreferences((p) => ({ ...p, [key]: selectedOption }));
    }
    if (questionsType === "animeQuestions") {
      setClientAnimePreferences((p) => ({ ...p, [key]: selectedOption }));
    }
    const selectedOptionObj = currentQ.options[optionIndex];

    setQuestionNum((p) => (p + 1 !== qToAsk.length ? (p += 1) : p));
    if (selectedOptionObj.followUps) {
      setQToAsk((p) => [
        ...p.slice(0, questionNum + 1),
        ...selectedOptionObj.followUps,
        ...p.slice(questionNum + 1),
      ]);
    }
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
            type={questionNum + 1 === qToAsk.length ? "submit" : "button"}
            onClick={(e) => {
              if (questionNum + 1 !== qToAsk.length) {
                e.preventDefault(); // preventing for non-final questions
              }
              onSelect(el.value, i);
            }}
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
