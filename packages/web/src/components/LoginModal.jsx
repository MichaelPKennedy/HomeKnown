import { Link } from "react-router-dom";
import styles from "./LoginModal.module.css";

const LoginModal = ({
  onClose,
  message = "You must be logged in to save locations.",
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h5 className={styles.modalTitle}>Login Required</h5>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <p className={styles.message}>{message}</p>
        </div>
        <div className={styles.modalFooter}>
          <Link to="/login" className={styles.button}>
            <button
              type="button"
              className={`${styles.button} ${styles.coralButton}`}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
