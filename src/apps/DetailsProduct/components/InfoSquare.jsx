import style from "../scss/InfoSquare.module.scss";
function Info({ label, content }) {
  return (
    <div className={style.wrapper}>
      <label htmlFor="">{label}</label>
      <span>{content}</span>
    </div>
  );
}

export default Info;
