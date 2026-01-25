import { useState, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Home.scss";
import { useDispatch } from "react-redux";
import { addEmployee } from "../store/employeesSlice";
import Button from "../components/Button/Button";

// Modal React
import { Modal } from "react-modal-wealthealth";
import "react-modal-wealthealth/style.css";

// Lazy load du DatePicker
const DatePicker = lazy(() => import("react-datepicker"));
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATES FORMULAIRE
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState("");

  // ERREURS
  const [errors, setErrors] = useState({});

  // MODAL
  const [showModal, setShowModal] = useState(false);

  // VALIDATION
  function validateForm() {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!dateOfBirth) newErrors.dateOfBirth = "Birth date is required";
    if (!startDate) newErrors.startDate = "Start date is required";
    if (!street.trim()) newErrors.street = "Street is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!stateValue) newErrors.stateValue = "State is required";
    if (!zipCode.trim()) newErrors.zipCode = "Zip Code is required";
    if (zipCode.trim().length < 4)
      newErrors.zipCode = "Zip Code must be at least 4 digits";
    if (!department) newErrors.department = "Department is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // SUBMIT
  function handleSave() {
    if (!validateForm()) return;

    const employee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toLocaleDateString("fr-FR"),
      startDate: startDate.toLocaleDateString("fr-FR"),
      street,
      city,
      state: stateValue,
      zipCode,
      department,
    };

    dispatch(addEmployee(employee));

    setShowModal(true);

    setTimeout(() => {
      navigate("/employee-list");
    }, 1500);
  }

  return (
    <main className="home">
      <div className="title">
        <h1>HRnet</h1>
      </div>

      <div className="navigation">
        <Link to="/employee-list">View Current Employees</Link>
      </div>

      <div className="form-container">
        <h2>Create Employee</h2>

        <form onSubmit={(e) => e.preventDefault()} className="form">
          {/* FIRST NAME */}
          <label>First Name</label>
          <input
            type="text"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "error" : ""}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}

          {/* LAST NAME */}
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? "error" : ""}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}

          {/* DATE OF BIRTH */}
          <label>Date of Birth</label>
          <Suspense fallback={<div className="loading">Loading calendar…</div>}>
            <DatePicker
              selected={dateOfBirth}
              onChange={(date) => setDateOfBirth(date)}
              dateFormat="dd/MM/yyyy"
              aria-label="Select birth date"
              className={errors.dateOfBirth ? "error" : "datepicker-input"}
            />
          </Suspense>
          {errors.dateOfBirth && (
            <p className="error-text">{errors.dateOfBirth}</p>
          )}

          {/* START DATE */}
          <label>Start Date</label>
          <Suspense fallback={<div className="loading">Loading calendar…</div>}>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              aria-label="Select start date"
              className={errors.startDate ? "error" : "datepicker-input"}
            />
          </Suspense>
          {errors.startDate && <p className="error-text">{errors.startDate}</p>}

          {/* ADDRESS */}
          <fieldset className="address">
            <legend>Address</legend>

            {/* STREET */}
            <label>Street</label>
            <input
              type="text"
              placeholder="1 Main Street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className={errors.street ? "error" : ""}
            />
            {errors.street && <p className="error-text">{errors.street}</p>}

            {/* CITY */}
            <label>City</label>
            <input
              type="text"
              placeholder="New York"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={errors.city ? "error" : ""}
            />
            {errors.city && <p className="error-text">{errors.city}</p>}

            {/* STATE */}
            <label>State</label>
            <select
              value={stateValue}
              onChange={(e) => setStateValue(e.target.value)}
              className={errors.stateValue ? "error" : ""}
            >
              <option value="">Choose a state</option>
              <option value="CA">CA</option>
              <option value="TX">TX</option>
              <option value="NY">NY</option>
            </select>
            {errors.stateValue && (
              <p className="error-text">{errors.stateValue}</p>
            )}

            {/* ZIP CODE */}
            <label>Zip Code</label>
            <input
              type="number"
              placeholder="10001"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={errors.zipCode ? "error" : ""}
            />
            {errors.zipCode && <p className="error-text">{errors.zipCode}</p>}
          </fieldset>

          {/* DEPARTMENT */}
          <label>Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={errors.department ? "error" : ""}
          >
            <option value="">Choose a department</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
          {errors.department && (
            <p className="error-text">{errors.department}</p>
          )}
        </form>

        <Button onClick={handleSave}>Save</Button>
      </div>

      {/* MODAL */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h3>Employee Created!</h3>
      </Modal>
    </main>
  );
}

export default Home;