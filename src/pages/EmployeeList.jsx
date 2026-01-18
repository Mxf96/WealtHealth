import "../styles/pages/EmployeeList.scss";
import EmployeeTable from "../components/EmployeeTable/EmployeeTable";

function EmployeeList() {
  return (
    <main className="employee-list">
      <h2>Current Employees</h2>

      <EmployeeTable />
    </main>
  );
}

export default EmployeeList;