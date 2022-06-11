import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import MainNewQuestion from "../components/newquestions/MainNewQuestion";

const newQuestionScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainNewQuestion />
      </main>
    </>
  );
};

export default newQuestionScreen;
