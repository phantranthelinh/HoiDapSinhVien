import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import AddQnAsFileMain from "../components/qnas/AddQnAsFileMain";

const AddQnAsFile = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddQnAsFileMain />
      </main>
    </>
  );
};

export default AddQnAsFile;
