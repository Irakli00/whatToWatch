import { useContext } from "react";
import { useForm } from "react-hook-form";

import { AppContext } from "../contexts/AppContext";
import { QuestionsContext } from "../contexts/QuestionsContext";

function RecomendationsFilter({ preferences }) {
  const { movieFilterOptions } = useContext(QuestionsContext);
  const { setClientMoviePreferences, clientMoviePreferences } =
    useContext(AppContext);

  const keys = Object.keys(preferences);

  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);

    const changedPreferences = {
      mediaType: [],
      genres: [],
      language: [],
      rating: [],
      region: [],
      releaseDate: [],
      runtime: [],
    };

    Object.entries(data).map((el) => {
      const [key, value] = el;
      const formattedKey = key.split("_")[0];
      if (value) {
        changedPreferences[formattedKey].push(value);
      }
    });

    //flatten if single option
    Object.entries(data).map((el) => {
      const [key, value] = el;
      const formattedKey = key.split("_")[0];

      if (value) {
        changedPreferences[formattedKey] =
          changedPreferences[formattedKey].length <= 1
            ? changedPreferences[formattedKey][0]
            : changedPreferences[formattedKey];
      }
    });
    setClientMoviePreferences(changedPreferences);
    console.log(changedPreferences, clientMoviePreferences);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {keys.map((key) => {
        const options = movieFilterOptions[key];
        return (
          <fieldset key={key}>
            <legend>Add {key}:</legend>
            {options?.map((o) => {
              return (
                <div key={o.value}>
                  <input
                    {...register(`${key}_${o.value.toString()}`)} //_ is necessary . keeps genre ids as numbers apparently
                    type="checkbox"
                    value={o.value}
                    id={o.value}
                  />
                  <label htmlFor={`${key}_${o.value}`}>{o.key}</label>
                </div>
              );
            })}
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
