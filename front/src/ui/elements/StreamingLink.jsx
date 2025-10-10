import { sites } from "../../data/sites";

function StreamingLink({ site, url }) {
  return (
    <li>
      <a
        className="w-[100px] flex flex-col justify-center items-center gap-1 p-3.5 rounded-2xl hover:bg-white-red-tint"
        target="_blank"
        href={url}
      >
        <img
          width="45"
          src={`https://www.google.com/s2/favicons?sz=64&domain=${sites[site]}`}
          alt={site}
        />
        <span className="text-center">{site}</span>
      </a>
    </li>
  );
}

export default StreamingLink;
