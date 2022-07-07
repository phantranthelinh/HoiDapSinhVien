import React from "react";

const About = () => {
  return (
    <>
      <div className="parent">
        <div className="container-about">
          <div className="container-content">
            <div className="container-title">
              <p className="container-title__p">
                <mask>TRƯỜNG ĐẠI HỌC Y DƯỢC CẦN THƠ</mask> VÀ CÁC ĐƠN VỊ TRỰC
                THUỘC
              </p>
            </div>
            <div className="container-infor">
              <h2 class="title-name">TRƯỜNG ĐẠI HỌC Y DƯỢC CẦN THƠ</h2>
              <ul>
                <li>
                  <span class="format">Địa chỉ: </span>
                  Số 179, đường Nguyễn Văn Cừ, P. An Khánh, Q. Ninh Kiều, TP.
                  Cần Thơ
                </li>
                <li>
                  <span class="format">Điện thoại: </span>
                  (84-0292) 3 739 730
                </li>
                <li>
                  <span class="format">Fax: </span>
                  (84-0292) 3 740221
                </li>
                <li>
                  <span class="format">Email: </span>
                  ctump@ctump.edu.vn
                </li>
                <li class="link">
                  <span class="format">Website: </span>
                  <a href="http://www.ctump.edu.vn/" target="_blank">
                    {" "}
                    www.ctump.edu.vn
                  </a>
                </li>
              </ul>
            </div>
            <div className="container-infor">
              <h2 class="title-name">BAN GIÁM HIỆU: </h2>
              <ul>
                <li class="infor-name">
                  Hiệu trưởng: PGS. TS. Nguyễn Trung Kiên
                </li>
                <li>Email: ntkien@ctump.edu.vn</li>
                <li class="infor-name">
                  Phó Hiệu trưởng: PGS.TS. Nguyễn Văn Lâm
                </li>
                <li>Email: nvlam@ctump.edu.vn </li>
                <li class="infor-name">
                  Phó Hiệu trưởng: PGS. TS. Trần Viết An
                </li>
                <li>Email: tvan@ctump.edu.vn</li>
                <li class="infor-name">
                  Phó Hiệu trưởng: TS. Nguyễn Thành Tấn
                </li>
                <li>Email: nttan@ctump.edu.vn</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
