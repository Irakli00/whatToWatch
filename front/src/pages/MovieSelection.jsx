import { AppContext } from "../contexts/AppContext";
import { useContext } from "react";

import { useForm } from "react-hook-form";
import Options from "../ui/Options";

function MovieSelection({ questionsType = "movieQuestions" }) {
  const { questionNum, setQuestionNum } = useContext(AppContext);

  const questionsToAsk = useContext(AppContext)[questionsType];
  const key = questionsToAsk[questionNum].key;

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    setQuestionNum((p) => (p + 1 < questionsToAsk.length ? (p += 1) : p));
  };

  const label = questionsToAsk[questionNum].question;

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

        <Options></Options>

        <input type="hidden" {...register(key)} />
      </form>
    </section>
  );
}

export default MovieSelection;
