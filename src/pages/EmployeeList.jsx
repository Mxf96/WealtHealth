import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import "../styles/pages/EmployeeList.scss";

const EmployeeTable = lazy(
  () => import("../components/EmployeeTable/EmployeeTable"),
);

function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);

  return (
    <main className="employee-list">
      <h2>Current Employees</h2>

      <Suspense fallback={<p>Loading table...</p>}>
        <EmployeeTable data={employees} />
      </Suspense>
    </main>
  );
}

export default EmployeeList;