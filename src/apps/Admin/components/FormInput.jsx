import FormInputStyle from "../scss/FormInputStyle.module.scss";
function FormInput({
  label,
  placeholder,
  value,
  type,
  validate,
  disable,
  onChange,
}) {
  const showError = validate && validate.error && !value.trim();
  return (
    <div className={FormInputStyle.formInputWrapper}>
      <label htmlFor="">{label}</label>
      <input
        onChange={onChange}
        className={FormInputStyle.input}
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={disable}
      />
      <p>{showError && <p style={{ color: "red" }}>{validate.error}</p>}</p>
    </div>
  );
}

export default FormInput;
