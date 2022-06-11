import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import Main from "../components/Home/Main";
import { getListNewQuestion } from "../redux/Slice/newQuestion";
import Sidebar from "./../components/sidebar";
import { getListDepartments } from "./../redux/Slice/department";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListNewQuestion());
    dispatch(getListDepartments());
  });

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Main />
      </main>
    </>
  );
};

export default HomeScreen;
