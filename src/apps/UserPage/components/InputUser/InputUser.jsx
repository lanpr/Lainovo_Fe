import React from "react";
import style from "./InputUser.module.scss";

function InputUser({ title, fields, onSubmit, errors }) {
  return (
    <div className={style.wrapper}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {fields.map((field, index) => (
          <div key={index}>
            <label>{field.label}</label>
            <input
              type={field.type}
              value={field.value}
              placeholder={field.placeholder}
              onChange={field.onChange}
            />
            {errors && errors[index] && (
              <p style={{ color: "red" }}>{errors[index]}</p>
            )}
          </div>
        ))}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default InputUser;
