import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddDepartmentMain from "../components/departments/AddDepartmentMain";

const AddDepartment = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddDepartmentMain />
      </main>
    </>
  );
};

export default AddDepartment;
