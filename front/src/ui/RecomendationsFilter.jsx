import { useContext } from "react";
import { useForm } from "react-hook-form";

import { AppContext } from "../contexts/AppContext";
import { QuestionsContext } from "../contexts/QuestionsContext";
import { useQueryClient } from "@tanstack/react-query";

function RecomendationsFilter({ preferences, isLoading }) {
  const { movieFilterOptions } = useContext(QuestionsContext);
  const { setClientMoviePreferences, clientMoviePreferences } =
    useContext(AppContext);

  const keys = Object.keys(preferences);

  const { register, handleSubmit } = useForm();

  // const queryClient = useQueryClient();

  async function onSubmit(data) {
    const changedPreferences = {
      mediaType: [],
      genres: [],
      language: [],
      rating: [],
      region: [],
      // releaseDate: [],
      // runtime: [],
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

    // queryClient.invalidateQueries(["movieRecomendations"]);
  }
  if (isLoading) return <Spinner></Spinner>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-6 p-6 bg-gray-50 rounded-lg justify-center"
    >
      {keys.map((key) => {
        if (key === "releaseDate") return;

        const options = movieFilterOptions[key];
        return (
          <fieldset
            key={key}
            className="flex flex-col bg-white p-4 rounded-md shadow-sm border border-gray-200 min-w-48"
          >
            <legend className="text-lg font-semibold text-gray-800 mb-3 px-2">
              Add {key}:
            </legend>
            {options?.map((o) => {
              // console.log(clientMoviePreferences[key], key);
              return (
                <div key={o.value} className="flex items-center space-x-2 mb-2">
                  <input
                    {...register(`${key}_${o.value.toString()}`)} //_ is necessary . keeps genre ids as numbers apparently
                    type="checkbox"
                    value={o.value}
                    id={o.value}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={o.value}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {o.key}
                  </label>
                </div>
              );
            })}
          </fieldset>
        );
      })}
      <input
        type="submit"
        value="change preferences"
        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors cursor-pointer self-start mt-4"
      />
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
