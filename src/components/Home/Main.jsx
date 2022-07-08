import React, { useEffect, useState } from "react";
import lodash from "lodash";

import { MdSettingsVoice } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  getByKeyword,
  getSingleQnA,
  searchQnA,
  sendHappy,
  sendUnhappy,
} from "../../redux/Slice/qna";
import Loading from "./../LoadingError/Loading";
import { sendNewQuesiton } from "./../../redux/Slice/qna";
import { toast } from "react-toastify";
import Toast from "./../LoadingError/Toast";
import "react-toastify/dist/ReactToastify.css";
import SpeechToText from "./../SpeechToText/SpeechToText";

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
  }, 1000);

  const [isMobile, setisMobile] = useState(false);

  const {
    sendNewQuestionSuccess,
    qnas,
    actionSuccess,
    listQnAs,
    loadingQnAs,
    loading,
  } = useSelector((state) => state.qnas);
  const { QnA } = useSelector((state) => state.qnas);
  const { happies, unhappies } = QnA;

  const dispatch = useDispatch();
  let screenWidth = window.innerWidth;

  const clickHandler = (keywords) => {
    dispatch(getByKeyword(keywords));
    setShow(false);
  };

  const sendQuestion = () => {
    dispatch(sendNewQuesiton(input));
  };

  const sendQuestionSucces = () => {
    toast.success("Gửi câu hỏi thành công");
  };

  const questionClick = (e) => {
    sendQuestion();
    sendQuestionSucces();
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const happyHandler = (id) => {
    dispatch(sendHappy(id));
    dispatch(getSingleQnA(id));
  };

  const unhappyHandler = (id) => {
    dispatch(sendUnhappy(id));
    dispatch(getSingleQnA(id));
  };

  useEffect(() => {
    if (screenWidth < 769) {
      setisMobile((isMobile) => (isMobile = true));
    } else {
      setisMobile((isMobile) => (isMobile = false));
    }
    dispatch(searchQnA(input));

    if (sendNewQuestionSuccess) {
      toast.success("Gửi câu hỏi thành công", ToastObjects);
    }
  }, [screenWidth, dispatch, input, actionSuccess, sendNewQuestionSuccess]);

  return (
    <>
      <div className="container">
        <div className="title">
          <span className="text-heading">HỆ THỐNG TỰ ĐỘNG</span>
          <span className="text-heading">GIẢI ĐÁP THẮC MẮC SINH VIÊN</span>
          <span className="text-heading text-heading__sub">
            TRƯỜNG ĐẠI HỌC Y DƯỢC CẦN THƠ
          </span>
        </div>
        <div className="sub-main">
          <div className="main">
            <div className="text-show">
              <p className="line-1 anim-typewriter">
                Nhập thắc mắc của bạn vào ô bên dưới
              </p>
            </div>
            <form onSubmit={submitHandler}>
              <div className="searchz">
                <div className="search">
                  <div className="search-input">
                    <input
                      className="input"
                      placeholder="Bạn thắc mắc điều gì?"
                      type="text"
                      name="question"
                      defaultValue={input}
                      // onChange={(e) => setInput(e.target.value)}
                      onChange={handleUpdate}
                    />
                    <div className="search-voice">
                      {/* <MdSettingsVoice /> */}
                      {/* setInput={setInput}  */}
                      <SpeechToText />
                    </div>
                    <div className="search-check">
                      {/* {!loading && <p>Ý của bạn là...</p>} */}
                      <div className="search-check__output">
                        {loading ? (
                          <Loading />
                        ) : (
                          qnas?.length > 0 &&
                          qnas.map((item, index) => {
                            return (
                              <li
                                className="search-check__content "
                                key={item._id}
                                onClick={() => clickHandler(item.keywords)}
                              >
                                {item.question}
                              </li>
                            );
                          })
                        )}
                        {qnas?.length === 0 && input.trim() !== "" && (
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
            {loadingQnAs || loading ? (
              <Loading />
            ) : (
              <>
                {!show && actionSuccess && (
                  <h3 className="relate-question">Các câu hỏi có liên quan</h3>
                )}
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
                                  onClick={() => happyHandler(qna._id)}
                                >
                                  <img
                                    src="/images/emoji/happy.svg"
                                    alt="happ-icon"
                                  />
                                </button>
                                <span>
                                  {qna.happies &&
                                    qna.happies.length > 0 &&
                                    qna.happies.length}
                                </span>
                              </div>
                              <div className="emoji">
                                <button
                                  className={""}
                                  onClick={() => unhappyHandler(qna._id)}
                                >
                                  <img
                                    src="/images/emoji/sad.svg"
                                    alt="unhappy-icon"
                                  />
                                </button>
                                <span>
                                  {qna.unhappies &&
                                    qna.unhappies.length > 0 &&
                                    qna.unhappies.length}
                                </span>
                              </div>
                            </div>
                            <span> Đơn vị trả lời: {qna.by?.name}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                {listQnAs?.length > 0 &&
                  listQnAs.map((qna, i) => {
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
                                  onClick={() => happyHandler(qna._id)}
                                >
                                  <img
                                    src="/images/emoji/happy.svg"
                                    alt="happ-icon"
                                  />
                                </button>
                                <span>
                                  {qna.happies &&
                                    qna.happies.length > 0 &&
                                    qna.happies.length}
                                </span>
                              </div>
                              <div className="emoji">
                                <button
                                  className={""}
                                  onClick={() => unhappyHandler(qna._id)}
                                >
                                  <img
                                    src="/images/emoji/sad.svg"
                                    alt="unhappy-icon"
                                  />
                                </button>
                                <span>
                                  {qna.unhappies &&
                                    qna.unhappies.length > 0 &&
                                    qna.unhappies.length}
                                </span>
                              </div>
                            </div>
                            <span> Đơn vị trả lời: {qna.by?.name}</span>
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
                // onClick={sendQuestion}
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
