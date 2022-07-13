import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sendNewQuesiton } from "../redux/Slice/qna";

export const Modal = (props) => {
  const { input } = props;
  const dispatch = useDispatch();
  const sendQuestion = () => {
    dispatch(sendNewQuesiton(input));
  };
  const questionClick = (e) => {
    sendQuestion();
    sendQuestionSucces();
  };
  const sendQuestionSucces = () => {
    toast.success("Gửi câu hỏi thành công");
  };
  return (
    <>
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
    </>
  );
};
