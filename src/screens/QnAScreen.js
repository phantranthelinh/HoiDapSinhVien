import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainQnAs from "../components/qnas/MainQnAs";

const QnAScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainQnAs />
      </main>
    </>
  );
};

export default QnAScreen;
