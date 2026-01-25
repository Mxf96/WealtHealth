import { useMemo, useState, useDeferredValue } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "../../styles/components/EmployeeTable/EmployeeTable.scss";
import Button from "../Button/Button";

function EmployeeTable({ data }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  // si data est undefined/null => on met un tableau vide
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const columns = useMemo(
    () => [
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "startDate", header: "Start Date" },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "dateOfBirth", header: "Date of Birth" },
      { accessorKey: "street", header: "Street" },
      { accessorKey: "city", header: "City" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "zipCode", header: "Zip Code" },
    ],
    [],
  );

  // Rend la saisie fluide même si le filtre est coûteux
  const deferredFilter = useDeferredValue(globalFilter);

  const filteredData = useMemo(() => {
    const q = deferredFilter.trim().toLowerCase();
    if (!q) return safeData; // ✅ si pas de recherche, on ne filtre pas du tout

    return safeData.filter((row) => {
      if (!row || typeof row !== "object") return false; // sécurité
      return Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(q),
      );
    });
  }, [safeData, deferredFilter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="employee-table">
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={globalFilter ?? ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value);
          table.setPageIndex(0);
        }}
      />

      <table>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="sortable"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {{
                    asc: " ▲",
                    desc: " ▼",
                  }[header.column.getIsSorted()] || ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const rendered = flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  );
                  return <td key={cell.id}>{rendered ?? cell.getValue()}</td>;
                })}
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

      {/* Pagination */}
      <div className="pagination">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>

        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default EmployeeTable;