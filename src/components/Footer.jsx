import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <img className="header-logo" src="images/logo.gif" />
          <div className="footer-container__content">
            <p className="p-footer">
              Trường Đại học Y Dược Cần Thơ (Can Tho University of Medicine and
              Pharmacy)
            </p>
            <ul>
              <li className="list">
                Số 179, đường Nguyễn Văn Cừ, P. An Khánh, Q. Ninh Kiều, TP. Cần
                Thơ.
              </li>
              <li className="list">
                Điện thoại: (84-0292) 3 739 730(Phòng Hành chánh tổng hợp).
              </li>
              <li className="list">
                Fax: (84-0292) 3 740221 ; Email: ctump@ctump.edu.vn
              </li>
              <li className="list">
                <a
                  href="https://www.youtube.com/truongdaihocyduocct"
                  target="_blank"
                >
                  Trang Youtube
                </a>
                ,
                <a
                  href="https://www.facebook.com/dhydct.ctump.edu.vn"
                  target="_blank"
                >
                  Trang Fanpage.
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-online">
          <p>
            Số người online: <span className="footer-number">27</span>
          </p>
          <p>
            Tổng số lượt truy cập: <span className="footer-number">20002</span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
