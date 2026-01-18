import { Link } from "react-router-dom";
import "../styles/pages/Home.scss";
import Button from "../components/Button/Button";

function Home() {
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

        <form className="form">
          {/* FIRST NAME */}
          <label>First Name</label>
          <input type="text" placeholder="John" />

          {/* LAST NAME */}
          <label>Last Name</label>
          <input type="text" placeholder="Doe" />

          {/* DATE OF BIRTH */}
          <label>Date of Birth</label>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            className="datepicker-input"
          />

          {/* START DATE */}
          <label>Start Date</label>
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            className="datepicker-input"
          />

          {/* ADDRESS */}
          <fieldset className="address">
            <legend>Address</legend>

            {/* STREET */}
            <label>Street</label>
            <input type="text" placeholder="1 Main Street" />

            {/* CITY */}
            <label>City</label>
            <input type="text" placeholder="New York" />

            {/* STATE */}
            <label>State</label>
            <select defaultValue="">
              <option value="">Choose a state</option>
              <option value="CA">CA</option>
              <option value="TX">TX</option>
              <option value="NY">NY</option>
            </select>

            {/* ZIP CODE */}
            <label>Zip Code</label>
            <input type="number" placeholder="10001" />
          </fieldset>

          {/* DEPARTMENT */}
          <label>Department</label>
          <select defaultValue="">
            <option value="">Choose a department</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Legal</option>
          </select>
        </form>

        <Button>Save</Button>
      </div>
    </main>
  );
}

export default Home;