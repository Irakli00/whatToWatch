function Logo({ width = 120, height = 120, type = "light" }) {
  const colors = {
    light: {
      bodyTV: "#219ebc",
      screen: "#fff",
      questionMark: "#219ebc",
      buttons: "#fff",
      // antenas: "#fff",
    },
    dark: {
      bodyTV: "#fff",
      screen: "#219ebc",
      questionMark: "#fff",
      buttons: "#219ebc",
      // antenas: "#219ebc",
    },
  };

  return (
    <>
      <svg
        width={`${width}`}
        height={`${height}`}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- TV Antennas --> */}
        <rect
          x="45"
          y="15"
          width="6"
          height="25"
          rx="3"
          ry="3"
          fill={colors[type].bodyTV || "#fff"}
          transform="rotate(-25 48 27.5)"
        />

        <path
          d="M 72 15 L 78 22 L 72 30 L 78 40"
          fill="none"
          stroke={colors[type].bodyTV || "#fff"}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="rotate(55 75 27.5)"
        />

        {/* <!-- TV Body --> */}
        <rect
          x="15"
          y="35"
          width="90"
          height="65"
          rx="12"
          ry="12"
          fill={colors[type].bodyTV || "#fff"}
        />

        {/* <!-- TV Screen --> */}
        <rect
          x="25"
          y="45"
          width="70"
          height="40"
          rx="6"
          ry="6"
          fill={colors[type].screen}
        />

        {/* <!-- Question Mark --> */}
        <g transform="translate(62, 68)">
          {/* <!-- Question mark curve --> */}
          <path
            d="M -7 -9 Q -7 -14 -2.5 -14 Q 2 -14 2 -9 Q 2 -4 -2.5 -2 L -2.5 1"
            fill="none"
            stroke={colors[type].questionMark || "#ffb703"}
            strokeWidth="4.5"
            strokeLinecap="round"
            transform="rotate(65 -1 10)"
          />
          <path
            d="M -7 -9 Q -7 -14 -2.5 -14 Q 2 -14 2 -9 Q 2 -4 -2.5 -2 L -2.5 1"
            fill="none"
            stroke={colors[type].questionMark || "#ffb703"}
            strokeWidth="4.5"
            strokeLinecap="round"
            transform="rotate(-65 -3.8 11)"
          />
          <path
            d="M -7 -9 Q -7 -14 -2.5 -14 Q 2 -14 2 -9 Q 2 -4 -2.5 -2 L -2.5 1"
            fill="none"
            stroke={colors[type].questionMark || "#ffb703"}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* <!-- Question mark dot --> */}
          <circle
            cx="-2.5"
            cy="7"
            r="2.5"
            fill={colors[type].questionMark || "#ffb703"}
          />
        </g>

        {/* <!-- Control buttons --> */}
        <circle cx="82" cy="92" r="4" fill={colors[type].buttons || "#fff"} />
        <circle cx="94" cy="92" r="4" fill={colors[type].buttons || "#fff"} />

        {/* <!-- TV Feet --> */}
        <rect
          x="25"
          y="97"
          width="15"
          height="7"
          rx="4"
          ry="4"
          fill={colors[type].bodyTV || "#fff"}
        />

        <rect
          x="80"
          y="97"
          width="15"
          height="7"
          rx="4"
          ry="4"
          fill={colors[type].bodyTV || "#fff"}
        />
      </svg>
    </>
  );
}

export default Logo;
