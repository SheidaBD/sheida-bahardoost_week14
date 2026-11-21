import React from "react";
import styles from "./ContactSearch.module.css";


function ContactSearch({
  search,
  setSearch,
  openAddForm,
  selectedIds,
  deleteHandler,
}) {
  return (
    <div className={styles.container}>
      
      <label>جست و جو در مخاطبین:</label>
      <input
        type="text"
        placeholder=""
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button type="button" onClick={openAddForm} className={styles.btnAdd}>
        ➕
      </button>

      

      {selectedIds.length > 0 && (
        <button type="button" onClick={deleteHandler}>
          ✔✔({selectedIds.length})
        </button>
      )}
    </div>
  );
}

export default ContactSearch;