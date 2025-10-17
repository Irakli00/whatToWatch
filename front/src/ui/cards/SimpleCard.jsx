import { Link } from "react-router";

function SimpleCard({
  id,
  img,
  type,
  onClick = null,
  coverImgMaxW = "180px",
  coverImgMinW = "180px",
}) {
  return (
    <Link
      key={id}
      to={`/${type}/${id}`}
      onClick={onClick}
      relative="path"
      className="card--simple"
    >
      <img
        draggable="false"
        src={img}
        // className={`h-[280px] rounded-[7px] select-none `}
        alt={`${type} poster`}
        className={`max-w-[${coverImgMaxW}] min-w-${coverImgMinW} h-full  rounded-[7px] select-none `}
      />
    </Link>
  );
}

export default SimpleCard;
