import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { logOut } from '../redux/Slice/user'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
const Header = () => {
  const dispatch = useDispatch()

  const { listMessage } = useSelector((state) => state.messages)
  useEffect(() => {
    $('[data-trigger]').on('click', function (e) {
      e.preventDefault()
      e.stopPropagation()
      var offcanvas_id = $(this).attr('data-trigger')
      $(offcanvas_id).toggleClass('show')
    })

    $('.btn-aside-minimize').on('click', function () {
      if (window.innerWidth < 768) {
        $('body').removeClass('aside-mini')
        $('.navbar-aside').removeClass('show')
      } else {
        // minimize sidebar on desktop
        $('body').toggleClass('aside-mini')
      }
    })
  }, [])

  return (
    <header className="main-header navbar justify-content-end">
      {/* <div className="col-search">
        <form className="searchform">
          <div className="input-group">
            <input
              list="search_terms"
              type="text"
              className="form-control"
              placeholder="Tìm kiếm câu hỏi"
            />
            <button className="btn btn-light bg" type="button">
              <i className="far fa-search"></i>
            </button>
          </div>
          <datalist id="search_terms">
            <option value="Products" />
            <option value="New orders" />
            <option value="Apple iphone" />
            <option value="Ahmed Hassan" />
          </datalist>
        </form>
      </div> */}
      <div className="col-nav ">
        <button className="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside">
          <i className="md-28 fas fa-bars"></i>
        </button>
        <ul className="nav">
          {/* <li className="nav-item">
            <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
              <i className="fas fa-moon"></i>
            </Link>
          </li> */}

          <li className="dropdown nav-item" style={{ marginRight: 24 }}>
            <Link className=" nav-link btn-icon" data-bs-toggle="dropdown" to="#">
              <i className={`fas fa-bell ${listMessage?.length > 0 ? 'text-danger' : ''}`}>
                {' '}
                <span
                  className="badge bg-danger"
                  style={{ top: 2, position: 'absolute', zIndex: 2 }}>
                  {listMessage?.length > 0 && listMessage.length}
                </span>
              </i>
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link
                to="/messages"
                className="dropdown-item text-danger"
                style={{ cursor: 'pointer' }}>
                {listMessage?.length > 0 && <p>{`Có ${listMessage.length} tin nhắn mới`}</p>}
                {listMessage?.length === 0 && <p>Không có tin nhắn mới nào</p>}
              </Link>
            </div>
          </li>

          <li className="dropdown nav-item">
            <Link className="dropdown-toggle" data-bs-toggle="dropdown" to="#">
              <img className="img-xs rounded-circle" src="/images/logo.gif" alt="User" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <div
                className="dropdown-item text-danger"
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch(logOut())}>
                Đăng xuất
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
