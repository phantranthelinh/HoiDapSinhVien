import React, { useEffect, useState } from "react";
import lodash from "lodash";

import { useDispatch, useSelector } from "react-redux";
import {
  getListQnA,
  searchQnA,
  sendHappy,
  sendUnhappy,
} from "../../redux/Slice/qna";
import Loading from "./../LoadingError/Loading";
import { sendNewQuesiton } from "./../../redux/Slice/qna";
import { toast } from "react-toastify";
import Toast from "./../LoadingError/Toast";
import "react-toastify/dist/ReactToastify.css";
import { Title } from "./../Title";
import { useMemo } from "react";
import removeVietnameseTones from "./../utils";

export const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: "colored",
};

const Main = () => {
  const [input, setInput] = useState("");
  const [show, setShow] = useState(false);
  const handleUpdate = lodash.debounce((e) => {
    setInput(e.target.value);
  }, 500);

  const [isMobile, setisMobile] = useState(false);

  const { sendNewQuestionSuccess, listQnA, qnas, actionSuccess, loading } =
    useSelector((state) => state.qnas);

  const dispatch = useDispatch();
  let screenWidth = window.innerWidth;

  const clickHandler = (q) => {
    dispatch(searchQnA(q));
    setShow(true);
  };

  const sendQuestion = () => {
    dispatch(sendNewQuesiton(input));
  };

  const sendQuestionSucces = () => {
    toast.success("Gửi câu hỏi thành công");
  };

  const questionClick = () => {
    sendQuestion();
    sendQuestionSucces();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(searchQnA(input));
    setShow(true);
  };
  const happyHandler = (id) => {
    dispatch(sendHappy(id));
  };
  const UnhappyHandler = (id) => {
    dispatch(sendUnhappy(id));
  };

  useEffect(() => {
    if (screenWidth < 769) {
      setisMobile((isMobile) => (isMobile = true));
    } else {
      setisMobile((isMobile) => (isMobile = false));
    }

    if (sendNewQuestionSuccess) {
      toast.success("Gửi câu hỏi thành công", ToastObjects);
    }
    dispatch(getListQnA());
  }, [screenWidth, dispatch, actionSuccess, sendNewQuestionSuccess, qnas]);
  const qnasMemo = useMemo(() => {
    return listQnA.filter((q) => {
      return removeVietnameseTones(q.question).includes(
        removeVietnameseTones(input)
      );
    });
  }, [input, listQnA]);
  return (
    <>
      <div className="container">
        <Title />
        <div className="sub-main">
          <div className="main">
            <div className="text-show">
              <p className="line-1 anim-typewriter">
                Nhập vấn đề của bạn vào ô bên dưới
              </p>
            </div>
            <form onSubmit={submitHandler}>
              <div className="searchz">
                <div className="search">
                  <div className="search-input">
                    <input
                      className="input"
                      placeholder="Bạn cần giải đáp điều gì?"
                      type="text"
                      name="question"
                      autoComplete="off"
                      defaultValue={input}
                      onChange={handleUpdate}
                    />

                    <div className="search-check">
                      <div className="search-check__output">
                        {loading ? (
                          <Loading />
                        ) : (
                          input.trim() !== "" &&
                          qnasMemo?.length > 0 &&
                          qnasMemo.slice(0, 5).map((item, index) => {
                            return (
                              <li
                                className="search-check__content "
                                key={item._id}
                                onClick={() => clickHandler(item.question)}
                              >
                                {item.question}
                              </li>
                            );
                          })
                        )}
                        {qnasMemo?.length === 0 && input.trim() !== "" && (
                          <li className="li-content">
                            <div className="li-content__nope">
                              <span>Không tìm thấy câu hỏi</span>
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary btn-main"
                              data-toggle="modal"
                              data-target="#exampleModal"
                            >
                              Gửi
                            </button>{" "}
                            câu hỏi lại cho chúng tôi!
                          </li>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <button className="ask">Hỏi</button> */}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="container-child">
          <div id="accordion">
            {loading ? (
              <Loading />
            ) : (
              <>
                {show && (
                  <h3 className="relate-question">Các câu hỏi có liên quan</h3>
                )}
                {show &&
                  qnas?.length > 0 &&
                  qnas.map((qna, i) => {
                    return (
                      <div key={i} className="card">
                        <div className="card-header" id={`heading${i}`}>
                          <h5 className="mb-0">
                            <button
                              className="btn btn-link"
                              data-toggle="collapse"
                              data-target={`#collapse${i}`}
                              aria-expanded="true"
                              aria-controls={`#collapse${i}`}
                            >
                              {qna.question}
                            </button>
                          </h5>
                        </div>
                        <div
                          id={`collapse${i}`}
                          className={`collapse`}
                          aria-labelledby={`heading${i}`}
                          data-parent="#accordion"
                        >
                          <div className="card-body">{qna.answer}</div>
                          <div className="card-footer">
                            <div className="emoji-wrapper">
                              <div className="emoji">
                                <button
                                  className={""}
                                  onClick={() =>
                                    happyHandler(qna._id, qna.happies.length)
                                  }
                                >
                                  <img
                                    src="/images/emoji/happy.svg"
                                    alt="happ-icon"
                                  />
                                </button>
                                <span>{qna.happies.length}</span>
                              </div>
                              <div className="emoji">
                                <button
                                  className={""}
                                  onClick={() =>
                                    UnhappyHandler(
                                      qna._id,
                                      qna.unhappies.length
                                    )
                                  }
                                >
                                  <img
                                    src="/images/emoji/sad.svg"
                                    alt="unhappy-icon"
                                  />
                                </button>
                                <span>{qna.unhappies.length}</span>
                              </div>
                            </div>
                            <span>
                              {" "}
                              Đơn vị trả lời:{" "}
                              {qna.by?.name ? qna.by.name : "P.CTSV"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Thông báo!
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>
                Bạn có muốn gửi câu hỏi {input + ""} lại cho phòng CTSV không?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={questionClick}
              >
                Có
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Không
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toast />
    </>
  );
};

export default Main;
