import { useState, useRef, useEffect } from "react";
import "../../styles/components/Dropdown/Dropdown.scss";

function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      {label && <label className="dropdown__label">{label}</label>}

      <div className="dropdown__selected" onClick={() => setOpen(!open)}>
        {value || "Select..."}
        <span className="dropdown__arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <ul className="dropdown__menu">
          {options.map((opt) => (
            <li
              key={opt}
              className="dropdown__item"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;