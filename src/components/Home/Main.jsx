import React, { useEffect } from "react";
import TopTotal from "./TopTotal";
import SaleStatistics from "./SaleStatistics";
import ProductsStatistics from "./ProductsStatistics";
import { useDispatch, useSelector } from "react-redux";
import { getListQnAs } from "../../redux/Slice/qna";
import { getListNewQuestion } from "../../redux/Slice/newQuestion";

const Main = () => {
  const dispatch = useDispatch();

  const qnas = useSelector((state) => state.qnas);
  const { data } = qnas;
  const { data: newQuestions } = useSelector((state) => state.newQuestions);

  useEffect(() => {
    dispatch(getListQnAs());
    dispatch(getListNewQuestion());
  }, [dispatch]);
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>

        <TopTotal listQnAs={data.QAs} newQuestions={newQuestions} />
        {/* <div className="row">
          <SaleStatistics />
          <ProductsStatistics />
        </div> */}

        <div className="card mb-4 shadow-sm"></div>
      </section>
    </>
  );
};

export default Main;
