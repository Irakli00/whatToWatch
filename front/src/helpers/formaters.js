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
