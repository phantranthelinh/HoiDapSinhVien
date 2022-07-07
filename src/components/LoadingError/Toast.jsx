import React from "react";
import { ToastContainer } from "react-toastify";

const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
      />
      {/* Same as */}
    </div>
  );
};

export default Toast;
