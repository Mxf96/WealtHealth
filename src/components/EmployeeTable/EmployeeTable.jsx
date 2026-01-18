import "../../styles/components/EmployeeTable/EmployeeTable.scss";
import Button from "../Button/Button";

function EmployeeTable({ data }) {
  const rows =
    Array.isArray(data) && data.length > 0
      ? data
      : [
          {
            firstName: "John",
            lastName: "Doe",
            startDate: "10/01/2024",
            department: "Engineering",
            dateOfBirth: "15/06/1990",
            street: "1 Main Street",
            city: "New York",
            state: "NY",
            zipCode: "10001",
          },
          {
            firstName: "Jane",
            lastName: "Smith",
            startDate: "22/03/2023",
            department: "Marketing",
            dateOfBirth: "02/11/1994",
            street: "12 Sunset Blvd",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
          },
        ];

  return (
    <div className="employee-table">
      <input type="text" placeholder="Search..." className="search-input" />

      <table>
        <thead>
          <tr>
            <th className="sortable">First Name</th>
            <th className="sortable">Last Name</th>
            <th className="sortable">Start Date</th>
            <th className="sortable">Department</th>
            <th className="sortable">Date of Birth</th>
            <th className="sortable">Street</th>
            <th className="sortable">City</th>
            <th className="sortable">State</th>
            <th className="sortable">Zip Code</th>
          </tr>
        </thead>

        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={index}>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.startDate}</td>
                <td>{row.department}</td>
                <td>{row.dateOfBirth}</td>
                <td>{row.street}</td>
                <td>{row.city}</td>
                <td>{row.state}</td>
                <td>{row.zipCode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <Button disabled>Previous</Button>

        <span>Page 1 of 1</span>

        <Button disabled>Next</Button>
      </div>
    </div>
  );
}

export default EmployeeTable;