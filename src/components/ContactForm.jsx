import React from "react";
import inputs from "../constants/inputs";
import styles from "./Contacts.module.css";

function ContactForm({
  contact,
  changeHandler,
  addHandler,
  editId,
  alert,
  cancelFormHandler,
}) {
  return (
    <div>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}

        <button type="button" onClick={addHandler}>
          {editId ? "اعمال تغییرات" : "افزودن"}
        </button>

        <button type="button" onClick={cancelFormHandler}>
          بازگشت
        </button>
      </div>

      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
    </div>
  );
}

export default ContactForm;