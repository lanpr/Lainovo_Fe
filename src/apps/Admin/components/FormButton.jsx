import FormButtonStyle from "../scss/FormButtonStyle.module.scss";
function FormButton({ content, onClick }) {
  return (
    <button onClick={onClick} className={FormButtonStyle.button}>
      {content}
    </button>
  );
}

export default FormButton;
