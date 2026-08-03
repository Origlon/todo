import styles from "../page.module.css";

export const TodoButton = ({ text, stateValue, onClick, className }) => {
  return (
    <button
      className={`${className} ${
        (stateValue === "" && text === "All") || stateValue === text
          ? styles.selected
          : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
