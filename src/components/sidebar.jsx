import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Sidebar = () => {
  const token = JSON.parse(window.localStorage.getItem('userInfo'))
  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.gif"
              style={{ height: '46' }}
              className="logo"
              alt="CTUMP - Admin Dashboard"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>

        <nav>
          <ul className="menu-aside">
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/" exact={true}>
                <i className="icon fas fa-home"></i>
                <span className="text">Trang chủ</span>
              </NavLink>
            </li>
            {token.role === 1 && (
              <li className="menu-item">
                <NavLink activeClassName="active" className="menu-link" to="/newquestions">
                  <i className="icon fas fa-paper-plane"></i>
                  <span className="text">Chuyển câu hỏi</span>
                  <span className="badge bg-danger" style={{ marginLeft: 8 }}>
                    {/* {data?.length} */}
                  </span>
                </NavLink>
              </li>
            )}

            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/qnas">
                <i className="icon fas fa-question"></i>
                <span className="text">Danh sách câu hỏi</span>
              </NavLink>
            </li>
            <li className="menu-item">
              <NavLink activeClassName="active" className="menu-link" to="/add-qna">
                <i className="icon fas fa-plus "></i>
                <span className="text">Thêm câu hỏi</span>
              </NavLink>
            </li>
            {token.role === 1 && (
              <>
                <li className="menu-item">
                  <NavLink activeClassName="active" className="menu-link" to="/users">
                    <i className="icon fas fa-user"></i>
                    <span className="text">Nhân viên</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink activeClassName="active" className="menu-link" to="/add-user">
                    <i className="icon fas fa-plus "></i>
                    <span className="text">Thêm nhân viên</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink activeClassName="active" className="menu-link" to="/departments">
                    <i className="icon fas fa-user-nurse"></i>
                    <span className="text">Các đơn vị</span>
                  </NavLink>
                </li>
                <li className="menu-item">
                  <NavLink activeClassName="active" className="menu-link" to="/add-department">
                    <i className="icon fas fa-plus "></i>
                    <span className="text">Thêm đơn vị</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <br />
          <br />
        </nav>
      </aside>
    </div>
  )
}

export default Sidebar
