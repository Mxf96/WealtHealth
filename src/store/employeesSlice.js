import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: JSON.parse(localStorage.getItem("employees")) || [],
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);

      // Sauvegardez dans le stockage local comme l'ancien HRnet
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;