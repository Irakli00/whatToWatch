function formatDate(dateString) {
  if (!dateString) return ""; // handle null or undefined

  const date = new Date(dateString);
  if (isNaN(date)) return ""; // invalid date

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatRating(num) {
  if (num == null || num === 0) return "Not Rated Yet";
  return Math.round(num * 10) / 10;
}

function parseGenres(genreIds, genresMap) {
  return genreIds.map((genreId) => genresMap[genreId]);
}

function formatPopularityNumber(num) {
  const properNumber = +new String(num).split(".").join(""); //num is a float wtf?

  if (properNumber >= 1000000) {
    return (properNumber / 1000000).toFixed(1).replace(".", ",") + "M";
  } else if (properNumber >= 1000) {
    return (properNumber / 1000).toFixed(1).replace(".", ",") + "k";
  } else {
    return properNumber.toString();
  }
}

export { formatDate, formatRating, parseGenres, formatPopularityNumber };
