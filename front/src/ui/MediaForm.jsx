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

  useEffect(() => {
    setQuestionNum(0);
  }, [questionsType, setQuestionNum]); //q type detector

  useEffect(() => {
    setQToAsk(contextValue[questionsType]);
  }, [questionsType]);

  // console.log(
  //   "----------------",
  //   questionsType,
  //   useContext(QuestionsContext)[questionsType],
  //   questionNum,
  //   qToAsk,
  //   qToAsk[questionNum],
  //   // qToAsk[questionNum].key,
  //   "----------------"
  //question num fails to reset to 0 so || are added in key and currenctQ (idunno it works)
  // );

  const key = qToAsk[questionNum]?.key || qToAsk[0].key;
  // const currentQ = qToAsk[questionNum].questions;
  const currentQ = qToAsk?.[questionNum]?.questions || qToAsk[0].questions;
  const label = currentQ.questionText;
  const options = currentQ.options;

  const { register, handleSubmit } = useForm();

  const contextValue = useContext(QuestionsContext);

  async function onSubmit() {
    navigate(
      `/recomendations/${questionsType === "movieQuestions" ? "movies" : "animes"}` //good so far
    );
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

    if (selectedOptionObj.followUps.length) {
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
      className={`flex flex-col mt-[20dvh] items-center gap-10 p-12  rounded-3xl shadow-xl  mx-auto ${questionsType === "movieQuestions" ? "bg-bright-yellow-tint" : "bg-main-red "}`}
    >
      {/* Question Label */}
      <label
        htmlFor="selectedOption"
        className="text-4xl font-extrabold text-gray-900 text-center"
      >
        {label}
      </label>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {options.map((el, i) => (
          <button
            key={i}
            type={questionNum + 1 === qToAsk.length ? "submit" : "button"}
            onClick={(e) => {
              if (questionNum + 1 !== qToAsk.length) {
                e.preventDefault();
              }
              onSelect(el.value, i);
            }}
            className="flex-1 px-10 py-6 text-2xl md:text-2xl font-semibold bg-light-blue text-dark-blue rounded-2xl shadow-lg hover:bg-default-blue hover:text-white transition duration-300 ease-in-out transform hover:scale-105"
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
