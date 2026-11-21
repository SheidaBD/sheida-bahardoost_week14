// import React, { useState } from 'react'
// import { v4 } from "uuid";
// import ContactList from './ContactList';
// import inputs from '../constants/inputs';
// import  styles from "./Contacts.module.css";

// function Contacts() {
//     const [contacts, setContacts] = useState([]);
//     const [alert, setAlert] = useState("");
//     const [contact, setContact] = useState({
//         id: "",
//         name: "",
//         job: "",
//         email: "",
//         phone: "",
//     })
//     const changeHandler = (event) => {
//         const name = event.target.name;
//         const value = event.target.value;

//         setContact(contact => ({ ...contact, [name]: value }))
//     }
//     const addHandler = () => {
//         if (!contact.name || !contact.job || !contact.phone || !contact.email) {
//             setAlert("please enter valid data");
//             return;
//         }
//         setAlert("");
//         const newContact = { ...contact, id: v4() }
//         setContacts(contacts => [...contacts, newContact])
//         setContact({
//             name: "",
//             job: "",
//             email: "",
//             phone: "",
//         })
//     };
//     const deleteHandler = (id)=>{
//         const newContacts=contacts.filter(contact=>contact.id !==id)
//         setContacts(newContacts);
//     };

//     return (
//         <div className={styles.container}>
//             <div className={styles.form}>
//                 {inputs.map((input, index) => (
//                     <input
//                         key={index}
//                         type={input.type}
//                         placeholder={input.placeholder}
//                         name={input.name}
//                         value={contact[input.name]}
//                         onChange={changeHandler}
//                     />
//                 ))}

//                 <button onClick={addHandler}>افزودن</button>
//             </div>
//             <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
//             <ContactList contacts={contacts} deleteHandler={deleteHandler} />
//         </div>
//     )
// }

// export default Contacts;
// -----------------------------------






import React, { useState } from "react";
import { v4 } from "uuid";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ContactSearch from "./ContactSearch";
import ConfirmModal from "./ConfirmModal";
import styles from "./Contacts.module.css";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    job: "",
    email: "",
    phone: "",
  });

  const [view, setView] = useState("list");
  const [editId, setEditId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    action: "",
    deleteId: "",
  });

  const closeModal = () => {
    setModal({ isOpen: false, message: "", action: "", deleteId: "" });
  };

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact({ ...contact, [name]: value });
  };

  const openAddForm = () => {
    setEditId("");
    setContact({ id: "", name: "", job: "", email: "", phone: "" });
    setAlert("");
    setView("form");
  };

  const cancelFormHandler = () => {
    setContact({ id: "", name: "", job: "", email: "", phone: "" });
    setEditId("");
    setAlert("");
    setView("list");
  };

  const editHandler = (item) => {
    setEditId(item.id);
    setContact(item);
    setAlert("");
    setView("form");
  };

  const addHandler = () => {
    if (!contact.name || !contact.job || !contact.phone || !contact.email) {
      setAlert("تمام اطلاعات را وارد کنید");
      return;
    }

    if (!contact.email.includes("@") || !contact.email.includes(".")) {
      setAlert("یک ایمیل معتبر وارد کنید");
      return;
    }
    setAlert("");

    if (editId) {
      setModal({
        isOpen: true,
        message: "مطمئنید می‌خواهید این مخاطب رو ویرایش کنید؟",
        action: "edit",
        deleteId: "",
      });
    } else {
      setModal({
        isOpen: true,
        message: "مطمئنید می‌خواهید این مخاطب رو اضافه کنید؟",
        action: "add",
        deleteId: "",
      });
    }
  };

  const deleteHandler = (id) => {
    setModal({
      isOpen: true,
      message: "مطمئنید می‌خواهید این مخاطب رو حذف کنید؟",
      action: "delete",
      deleteId: id,
    });
  };

  const toggleSelectHandler = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const bulkDeleteHandler = () => {
    if (selectedIds.length === 0) return;

    setModal({
      isOpen: true,
      message: `مطمئنید می‌خواهید ${selectedIds.length} مخاطب انتخاب‌شده رو حذف کنید؟`,
      action: "bulkDelete",
      deleteId: "",
    });
  };

  const confirmModalHandler = () => {
    if (modal.action === "add") {
      const newContact = { ...contact, id: v4() };
      setContacts([...contacts, newContact]);
      cancelFormHandler();
    }

    if (modal.action === "edit") {
      const updatedContacts = contacts.map((item) =>
        item.id === editId ? { ...contact, id: editId } : item
      );
      setContacts(updatedContacts);
      cancelFormHandler();
    }

    if (modal.action === "delete") {
      const newContacts = contacts.filter(
        (item) => item.id !== modal.deleteId
      );
      setContacts(newContacts);
      setSelectedIds(selectedIds.filter((itemId) => itemId !== modal.deleteId));
    }

    if (modal.action === "bulkDelete") {
      const remainingContacts = contacts.filter(
        (item) => !selectedIds.includes(item.id)
      );
      setContacts(remainingContacts);
      setSelectedIds([]);
    }

    closeModal();
  };

  const filteredContacts = contacts.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.job.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.container}>
      {view === "list" ? (
        <div>
          <ContactSearch
            search={search}
            setSearch={setSearch}
            openAddForm={openAddForm}
            selectedIds={selectedIds}
            bulkDeleteHandler={bulkDeleteHandler}
          />

          <ContactList
            contacts={filteredContacts}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
            selectedIds={selectedIds}
            toggleSelectHandler={toggleSelectHandler}
          />
        </div>
      ) : (
        <ContactForm
          contact={contact}
          changeHandler={changeHandler}
          addHandler={addHandler}
          editId={editId}
          alert={alert}
          cancelFormHandler={cancelFormHandler}
        />
      )}

      <ConfirmModal
        isOpen={modal.isOpen}
        message={modal.message}
        onConfirm={confirmModalHandler}
        onCancel={closeModal}
      />
    </div>
  );
}

export default Contacts;