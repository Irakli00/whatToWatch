import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

import { useForm } from "react-hook-form";

function MovieSelection() {
  const { movieQuestions, setClientPreferences, questionNum, setQuestionNum } =
    useContext(AppContext);
  const key = movieQuestions[questionNum].key;

  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = () => {
    setQuestionNum((p) => (p + 1 < movieQuestions.length ? (p += 1) : p));
  };

  const onSelect = (selectedOption) => {
    setValue(key, selectedOption);
    setClientPreferences((p) => ({ ...p, [key]: selectedOption }));
  };

  const label = movieQuestions[questionNum].question;
  const options = movieQuestions[questionNum].options;

  return (
    <section className="container ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-[20dvh] items-center gap-8 p-10 bg-white rounded-2xl shadow-lg "
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
              onClick={() => onSelect(el.value)}
              className="w-full px-8 py-5 text-2xl font-semibold bg-blue-500 text-white rounded-xl shadow-md hover:bg-blue-600 transition transform hover:scale-105"
            >
              {el.text}
            </button>
          ))}
        </div>

        <input type="hidden" {...register(key)} />
      </form>
    </section>
  );
}

export default MovieSelection;
