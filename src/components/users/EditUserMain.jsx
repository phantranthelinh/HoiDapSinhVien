import React, { useEffect, useState } from 'react'
import Toast from '../LoadingError/Toast'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'

import Loading from '../LoadingError/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { editUser, updateUser } from '../../redux/Slice/user'
import { getListDepartments } from '../../redux/Slice/department'
import Message from './../LoadingError/Error'

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHouver: false,
  autoClose: 2000,
  theme: 'colored',
}
const EditUserMain = ({ userId }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  const [password, setPassword] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, user, error, success } = userLogin
  const { listDepartments, loading: loadingListDepartments } = useSelector(
    (state) => state.departments
  )
  useEffect(() => {
    dispatch(getListDepartments())
    if (success) {
      dispatch({ type: 'user/Reset' })
      toast.success('Cập nhật thành công!', ToastObjects)
    }
    if (!user.name || user._id !== userId) {
      dispatch(editUser(userId))
    } else {
      setName(user.name)
      setEmail(user.email)
      setPassword(user.password)
      setRole(user.role)
    }
  }, [dispatch, userId, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        password,
        role,
      })
    )
  }
  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: '1200px', height: '100vh' }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Trở về
            </Link>
            <h2 className="content-title">Cập nhật thông tin nhân viên</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Cập nhật
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {loading && <Loading />}
                  {error && <Message variant="alert-danger">{error}</Message>}
                  <>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        Tên
                      </label>
                      <input
                        type="text"
                        placeholder="Tên đơn vị"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        placeholder="Tên đơn vị"
                        className="form-control"
                        required
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        Mật khẩu
                      </label>
                      <input
                        type="password"
                        placeholder="Tên đơn vị"
                        className="form-control"
                        required
                        value={password}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {loadingListDepartments ? (
                      <Loading />
                    ) : (
                      <div className="mb-4">
                        <label htmlFor="name" className="form-label">
                          Thuộc đơn vị
                        </label>
                        <select
                          name="role"
                          onChange={(e) => setRole(e.target.value)}
                          className="form-control"
                          defaultValue={user.from?.name}>
                          <option className="form-control" value={user.from?._id} selected>
                            {user.from?.name}
                          </option>
                          {listDepartments.length > 0 &&
                            listDepartments.map((department) => {
                              return (
                                <option
                                  key={department._id}
                                  className="form-control"
                                  value={department.name}>
                                  {department.name}
                                </option>
                              )
                            })}
                        </select>
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default EditUserMain
