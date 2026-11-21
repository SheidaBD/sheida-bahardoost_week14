// import { useState } from 'react'
// import styles from './contactItem.module.css'



// function ContactItem({
//     data: { id, name, job, email, phone }, deleteHandler}) {

//     return (
//         <li className={styles.item}>
//             <p>{name}{job}</p>
//             <p><span> 📬 </span>{email}</p>
//             <p><span>📞</span>{phone}</p>
//             <button onClick={() => deleteHandler(id)} >🗑</button>
//         </li>
//     )
// }

// export default ContactItem
// ----------------------------------------------------------------------------------








import { useState } from "react";
import styles from "./ContactItem.module.css";

function ContactItem({
  data: { id, name, job, email, phone },
  deleteHandler,
  editHandler,
  selectedIds,
  toggleSelectHandler,
}) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <li className={styles.item}>
      <input
        type="checkbox"
        checked={selectedIds.includes(id)}
        onChange={() => toggleSelectHandler(id)}
      />

      <p><span>👤</span>{name}</p>
      <p> <span>💼</span>{job}</p>
      <p><span>📬</span>{email}</p>
      <p><span>📞</span>{phone}</p>

      <button type="button" onClick={() => setOpenMenu(!openMenu)}>...</button>

      {openMenu && (
        <div>
          <button
            type="button"
            onClick={() => {
              setOpenMenu(false);
              editHandler({ id, name, job, email, phone });
            }}
          >
            ویرایش
          </button>
          <button
            type="button"
            onClick={() => {
              setOpenMenu(false);
              deleteHandler(id);
            }}
          >
            حذف
          </button>
        </div>
      )}
    </li>
  );
}

export default ContactItem;