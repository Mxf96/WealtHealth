import "../../styles/components/Modal/Modal.scss";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Empêche fermeture si on clique dans la modal
      >
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;