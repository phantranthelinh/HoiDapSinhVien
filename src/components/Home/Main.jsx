import React, { useEffect } from 'react'
import TopTotal from './TopTotal'
import SaleStatistics from './SaleStatistics'
import ProductsStatistics from './ProductsStatistics'
import { useDispatch, useSelector } from 'react-redux'
import { getListQnAs } from '../../redux/Slice/qna'
import { getListDepartments } from '../../redux/Slice/department'
import { getListMessage } from '../../redux/Slice/newMessage'

const Main = () => {
  const dispatch = useDispatch()

  const qnas = useSelector((state) => state.qnas)
  const { listMessage } = useSelector((state) => state.messages)
  const { data } = qnas

  useEffect(() => {
    dispatch(getListMessage())
    dispatch(getListQnAs())
    dispatch(getListDepartments())
  }, [dispatch])
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>

        <TopTotal listQnAs={data.QAs} listMessage={listMessage} />
        {/* <div className="row">
          <SaleStatistics />
          <ProductsStatistics />
        </div> */}

        <div className="card mb-4 shadow-sm"></div>
      </section>
    </>
  )
}

export default React.memo(Main)
