import styles from "./HeartIcon.module.css";

function HeartIcon({ onClick, className, isSaved }) {
  const fillColor = isSaved ? "black" : "none";
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 271.06 242.62"
        className={styles.heartIcon}
      >
        <path
          fill={fillColor}
          d="M135.13,231.13h0C37.63,167.47-18.04,80.33,23.31,31.13c12.44-14.8,33.03-19.9,51.76-19.9s37.46,6.63,51.76,19.9l8.3,7.72,8.31-7.72c28.58-26.54,80.79-31.05,103.51,0,38.1,52.08,2.02,119.1-111.82,200Z"
        />
      </svg>
    </button>
  );
}

export default HeartIcon;
