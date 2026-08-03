export const TodoActionButton = (props) => {
  return (
    <button
      disabled={props.disabled || false}
      onClick={props.onClick}
      className={props.className}
    >
      {props.text}
    </button>
  );
};
