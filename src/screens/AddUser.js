import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddUserMain from "../components/users/AddUserMain";

const AddQnA = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddUserMain />
      </main>
    </>
  );
};

export default AddQnA;
