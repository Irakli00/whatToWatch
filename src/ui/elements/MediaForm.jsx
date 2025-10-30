import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { QuestionsContext } from "@/contexts/QuestionsContext";

function MediaForm({ questionsType }) {
  const lookUpObj = {
    movieQs: {
      navigateUrl: `/recomendations/movies`,
      updatePreferences: (selectedOption) =>
        setClientMoviePreferences((p) => ({
          ...p,
          [key]: selectedOption,
        })),
      bg: `bg-bright-yellow-tint`,
      label: `text-dark-blue`,
      btn: `bg-light-blue text-dark-blue hover:bg-dark-blue hover:text-white`,
    },
    animeQs: {
      navigateUrl: `/recomendations/animes`,
      updatePreferences: (selectedOption) =>
        setClientAnimePreferences((p) => ({
          ...p,
          [key]: selectedOption,
        })),
      bg: `bg-main-red`,
      label: `text-white`,
      btn: `bg-dark-blue text-white hover:bg-dark-blue hover:text-white`,
    },
  };

  const soultrack = lookUpObj[questionsType]; //idunno what to name it

  const { questionNum, setQuestionNum } = useContext(QuestionsContext);
  const { setClientMoviePreferences, setClientAnimePreferences } =
    useContext(AppContext);

  const navigate = useNavigate();

  const [qToAsk, setQToAsk] = useState(
    useContext(QuestionsContext)[questionsType]
  );

  useEffect(() => {
    setQuestionNum(0);
  }, [questionsType, setQuestionNum]); //q type detector

  const contextValue = useContext(QuestionsContext);

  useEffect(() => {
    setQToAsk(contextValue[questionsType]);
  }, [questionsType]);

  // console.log(
  //   "----------------",
  //   // "type:",
  //   // questionsType,
  //   // "qNum:",
  //   // questionNum,
  //   'qToAsk:"',
  //   qToAsk,
  //   qToAsk[questionNum],
  //   "qurrentQ:",
  //   qToAsk?.[questionNum]?.questions,
  //   // qToAsk[questionNum].key,
  //   "----------------"
  // );
  // question num fails to reset to 0 so || are added in key and currenctQ (idunno it works)

  const key = qToAsk[questionNum]?.key || qToAsk[0].key;
  // const currentQ = qToAsk[questionNum].questions;
  const currentQ = qToAsk?.[questionNum]?.questions || qToAsk[0].questions;
  // const label = currentQ.questionText;
  const label = currentQ.qText;
  const options = currentQ.options;

  const { register, handleSubmit } = useForm();

  async function onSubmit() {
    navigate(soultrack.navigateUrl);
  }

  function onSelect(selectedOption, optionIndex) {
    soultrack.updatePreferences(selectedOption);

    const selectedOptionObj = currentQ.options[optionIndex];

    if (selectedOptionObj.followUps.length) {
      setQToAsk((p) => [
        ...p.slice(0, questionNum + 1),
        ...selectedOptionObj.followUps,
        ...p.slice(questionNum + 1),
      ]);

      setQuestionNum((p) => (p += 1));
    } else {
      setQuestionNum((p) => (p + 1 !== qToAsk.length ? (p += 1) : p));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col mt-[20dvh] items-center gap-10 p-12  rounded-3xl shadow-xl  mx-auto ${soultrack.bg}`}
    >
      <label
        htmlFor="selectedOption"
        className={`text-4xl font-extrabold ${soultrack.label} text-center`}
      >
        {label}
      </label>

      <div className="flex flex-col md:flex-row gap-6 w-full">
        {options.map((el, i) => {
          return (
            <button
              key={i}
              type={
                questionNum === qToAsk.length - 1 && !el.followUps.length
                  ? "submit"
                  : "button"
              }
              onClick={(e) => {
                if (
                  !(questionNum === qToAsk.length - 1 && !el.followUps.length)
                ) {
                  e.preventDefault();
                }
                onSelect(el.value, i);
              }}
              className={`flex-1 px-10 py-6 text-2xl rounded-2xl shadow-lg md:text-2xl font-semibold ${soultrack.btn} transition duration-300 ease-in-out transform hover:scale-105`}
            >
              {el.text}
            </button>
          );
        })}
      </div>

      <input type="hidden" {...register(key)} />
    </form>
  );
}
export default MediaForm;
