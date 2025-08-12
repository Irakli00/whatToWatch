import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

import { useForm } from "react-hook-form";

function MovieSelection() {
  const { movieQuestions, setClientPreferences, questionNum, setQuestionNum } =
    useContext(AppContext);
  const key = movieQuestions[questionNum].key;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setQuestionNum((p) => (p + 1 < movieQuestions.length ? (p += 1) : p));
  };

  const onSelect = (selectedOption) => {
    setValue(key, selectedOption);

    setClientPreferences((p) => ({ ...p, [key]: selectedOption }));
  };

  const [option1, option2] = movieQuestions[questionNum].options;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="selectedOption">
          {movieQuestions[questionNum].question}
        </label>
        <button type="submit" onClick={() => onSelect(option1)}>
          {option1}
        </button>
        <button type="submit" onClick={() => onSelect(option2)}>
          {option2}
        </button>
        <input type="hidden" {...register(key)} />
        {errors.selectedOption && <span>{errors.selectedOption.message}</span>}
      </form>
    </>
  );
}

export default MovieSelection;
