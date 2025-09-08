import { GoStar } from "react-icons/go";

import { formatRating } from "../../helpers/formaters";

function MediaHeader({ title, originalTitle, tagline, rating, votesCount }) {
  return (
    <div className="flex justify-between items-center">
      <div className="max-w-[70%]">
        <h1 className="w-fit cursor-default relative text-5xl text-balance flex gap-2 group">
          {title}
          {title !== originalTitle && (
            <span className="opacity-0 absolute bottom-full left-0 text-sm ease-in duration-75 group-hover:opacity-100">
              {originalTitle}
            </span>
          )}
        </h1>
        {tagline && (
          <p className="mt-1.5 opacity-60 text-pretty">
            <i>{tagline}</i>
          </p>
        )}
      </div>
      <div>
        <p className="flex text-2xl items-center justify-end gap-1">
          <GoStar></GoStar>
          {formatRating(rating)}
        </p>
        {votesCount && (
          <p>
            <i>{votesCount} votes</i>
          </p>
        )}
      </div>
    </div>
  );
}

export default MediaHeader;
