import styles from "./Modal.module.css"
interface ModalProps {
    remainingTime:number
}
function Modal({remainingTime}:ModalProps) {
    return (
      <div className={styles.hystmodal}>
        <div className={styles.hystmodal_window}>
          <h2 className={styles.remove}>Remove:{remainingTime}</h2>
        </div>
      </div>
    );
  }
  export default Modal;