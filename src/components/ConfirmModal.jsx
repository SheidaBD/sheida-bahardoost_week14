import styles from './ConfirmModal.module.css'
function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.alert}>
        <p>{message}</p>
        <button type="button" onClick={onCancel}>انصراف</button>
        <button type="button" onClick={onConfirm}>تایید</button>
      </div>
    </div>
  );
}

export default ConfirmModal;