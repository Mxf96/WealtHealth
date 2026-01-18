import "../../styles/components/Button/Button.scss";

function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="btn">
      {children}
    </button>
  );
}

export default Button;