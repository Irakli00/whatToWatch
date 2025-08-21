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

export { formatDate };

function formatRating(num) {
  if (num == null || num === 0) return "Not Rated Yet";
  return Math.round(num * 10) / 10;
}

export { formatRating };

function parseGenres(genreIds, genresMap) {
  return genreIds.map((genreId) => genresMap[genreId]);
}

export { parseGenres };

function formatNumber(num) {
  const properNumber = +new String(num).split(".").join("");
  if (properNumber >= 1000000) {
    return (properNumber / 1000000).toFixed(1).replace(".", ",") + "M";
  } else if (properNumber >= 1000) {
    return (properNumber / 1000).toFixed(1).replace(".", ",") + "k";
  } else {
    return properNumber.toString();
  }
}

export { formatNumber };
