// import React from 'react'
// import ContactItem from './ContactItem';
// import styles from './ContactList.module.css'

// function ContactList({ contacts ,deleteHandler }) {
//     return (
//         <div className={styles.container}>
//             <h3>Contacts List</h3>
//             {contacts.length ? (<ul className={styles.contacts}>
//                 {contacts.map((contact) => (
//                     <ContactItem key ={contact.id} data={contact} deleteHandler={deleteHandler}/>
//                     ))}
//             </ul>) : (<p className={styles.message}>no contact yet</p>)}

//         </div> 

//     )
// }

// export default ContactList

// ----------------------------------------------------



import React from "react";
import ContactItem from "./ContactItem";
import styles from "./ContactList.module.css";

function ContactList({
  contacts,
  deleteHandler,
  editHandler,
  selectedIds,
  toggleSelectHandler,
}) {
  return (
    <div className={styles.container}>
      
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              editHandler={editHandler}
              selectedIds={selectedIds}
              toggleSelectHandler={toggleSelectHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>مخاطبی وجود ندارد</p>
      )}
    </div>
  );
}

export default ContactList;