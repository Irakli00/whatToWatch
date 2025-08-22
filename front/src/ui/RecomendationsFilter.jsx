import { useContext } from "react";
import { QuestionsContext } from "../contexts/QuestionsContext";
import { useForm } from "react-hook-form";

function RecomendationsFilter({ preferences }) {
  const { movieFilterOptions } = useContext(QuestionsContext);

  const keys = Object.keys(preferences);

  const { register, handleSubmit } = useForm();

  function onSubmit() {
    console.log("here");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {keys.map((key) => {
        const options = movieFilterOptions[key];
        return (
          <fieldset key={key}>
            <legend>Add {key}:</legend>
            {options?.map((o) => (
              <div key={o.value}>
                <input
                  {...register(o.value.toString())} // Unique name for each checkbox
                  type="checkbox"
                  value={o.value}
                  id={o.value}
                />
                <label htmlFor={`${key}_${o.value}`}>{o.key}</label>
              </div>
            ))}
          </fieldset>
        );
      })}
      <input type="submit" value="change preferences" />
    </form>
  );
}

/* 
  <div class="form-group">
    <label for="releaseDate">Release Date:</label>
    <input
      type="date"
      id="releaseDate"
      name="releaseDate"
      value="2000"
      min="1900"
      max="2024"
    />
  </div>
*/

export default RecomendationsFilter;
