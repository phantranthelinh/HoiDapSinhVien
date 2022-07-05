import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Loading from '../LoadingError/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser } from '../../redux/Slice/user'
import { useEffect } from 'react'
import { getListUsers } from './../../redux/Slice/user'
import { toast } from 'react-toastify'
import Toast from './../LoadingError/Toast'

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}
const UserComponent = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { listUsers, loading, deleteSuccess } = useSelector((state) => state.userLogin)
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteUser(id))
      history.push('/users')
    }
  }
  useEffect(() => {
    if (deleteSuccess) {
      dispatch({ type: 'user/Reset' })
      toast.success('Xóa thành công!', ToastObjects)
    }
    dispatch(getListUsers())
  }, [dispatch, deleteSuccess])
  return (
    <>
      <Toast />
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Nhân viên</h2>
          <div>
            <Link to="add-user" className="btn btn-primary">
              <i className="material-icons md-plus"></i> Thêm mới
            </Link>
          </div>
        </div>

        <div className="card mb-4">
          {/* Card */}
          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
                {listUsers.length > 0 &&
                  listUsers.map((user) => {
                    return (
                      <div key={user._id} className="col">
                        <div className="card card-user shadow-sm">
                          <div className="card-header">
                            <img
                              className="img-md img-avatar"
                              src="images/logo.gif"
                              alt="User pic"
                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title mt-5">{user.name}</h5>
                            <div className="card-text text-muted">
                              <p className="m-0">Thuộc: {user.from?.name}</p>
                              <p>
                                <a href={`mailto:${user.email}`}>{user.email}</a>
                              </p>
                            </div>
                            <div className="row">
                              <Link
                                to={`/user/${user._id}/edit`}
                                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6">
                                <i className="fas fa-pen"></i>
                              </Link>
                              <div
                                onClick={() => deleteHandler(user._id)}
                                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6">
                                <i className="fas fa-trash-alt"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            )}

            {/* nav */}
          </div>
        </div>
      </section>
    </>
  )
}

export default UserComponent
